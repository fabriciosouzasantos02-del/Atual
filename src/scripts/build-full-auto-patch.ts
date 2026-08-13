import * as fs from 'fs';
import * as path from 'path';

// Let's create an exhaustive translation mapping for the 1266 keys
import { autoAuditPatch } from '../lib/autoAuditPatch';
import { tarotTranslations } from '../i18n/tarot';
import { commonTranslations } from '../i18n/common';
import { profileTranslations } from '../i18n/profile';
import { astrologyTranslations } from '../i18n/astrology';

const keys = Object.keys(autoAuditPatch.en);

// Helper function to translate any key to EN, ES, DE, FR
function translateKey(k: string): { en: string; es: string; de: string; fr: string } {
  // Common terms and sentence translation logic
  let en = k;
  let es = k;
  let de = k;
  let fr = k;

  // Let's implement comprehensive domain translators
  const map: Record<string, { en: string; es: string; de: string; fr: string }> = {
    "1. Distribuição dos Elementos": { en: "1. Distribution of Elements", es: "1. Distribución de los Elementos", de: "1. Verteilung der Elemente", fr: "1. Répartition des Éléments" },
    "2. Qualidades Astrológicas": { en: "2. Astrological Qualities", es: "2. Cualidades Astrológicas", de: "2. Astrologische Qualitäten", fr: "2. Qualités Astrologiques" },
    "3. Polaridade Energética": { en: "3. Energy Polarity", es: "3. Polaridad Energética", de: "3. Energiepolarität", fr: "3. Polarité Énergétique" },
    "4. Resumo de Compatibilidades Detalhadas": { en: "4. Detailed Compatibility Summary", es: "4. Resumen de Compatibilidades Detalladas", de: "4. Detaillierte Kompatibilitätsübersicht", fr: "4. Résumé Détaillé des Compatibilités" },
    "6. Calendário & Ciclos de Tendências Futuras": { en: "6. Calendar & Future Trend Cycles", es: "6. Calendario y Ciclos de Tendencias Futuras", de: "6. Kalender & Zukünftige Trendzyklen", fr: "6. Calendrier & Cycles de Tendances Futures" },
    "7. Dias Favoráveis Reais Calculados": { en: "7. Calculated Real Favorable Days", es: "7. Días Favorables Reales Calculados", de: "7. Berechnete Reale Günstige Tage", fr: "7. Jours Favorables Réels Calculés" },
    "8. Dias de Atenção & Cautela Cósmica": { en: "8. Cosmic Caution & Attention Days", es: "8. Días de Atención y Cautela Cósmica", de: "8. Tage für Kosmische Achtsamkeit & Vorsicht", fr: "8. Jours d'Attention & Prudence Cosmique" },
    "9. Visão Estelar de Longo Prazo": { en: "9. Long-Term Stellar Vision", es: "9. Visión Estelar a Largo Plazo", de: "9. Langfristige Sternenvision", fr: "9. Vision Stellaire à Long Terme" },
    "10. Pontos Ocultos & Ligações Kármicas": { en: "10. Hidden Points & Karmic Connections", es: "10. Puntos Ocultos y Conexiones Kármicas", de: "10. Verborgene Punkte & Karmische Verbindungen", fr: "10. Points Cachés & Connexions Karmiques" },
    "11. Inteligência de Relacionamento Cósmico": { en: "11. Cosmic Relationship Intelligence", es: "11. Inteligencia de Relaciones Cósmicas", de: "11. Kosmische Beziehungsintelligenz", fr: "11. Intelligence Relationnelle Cosmique" },
    "A Balança Astrológica": { en: "The Astrological Scale", es: "La Balanza Astrológica", de: "Die Astrologische Waage", fr: "La Balance Astrologique" },
    "A Integração de Bagagens": { en: "Integration of Baggage", es: "La Integración de Equipaje", de: "Die Integration von Lebensgepäck", fr: "L'Intégration des Bagages" },
    "A PREVISÃO COMPLETA DE SUA LINHA DO TEMPO": { en: "THE COMPLETE TIMELINE FORECAST", es: "LA PREDICCIÓN COMPLETA DE TU LÍNEA TEMPORAL", de: "DIE VOLLSTÄNDIGE ZEITLINIEN-PROGNOSE", fr: "LA PRÉVISION COMPLÈTE DE VOTRE LIGNE DU TEMPS" },
    "A energia mutadora de": { en: "The transforming energy of", es: "La energía transformadora de", de: "Die verändernde Energie von", fr: "L'énergie transformatrice de" },
    "AFINIDADE ESPECÍFICA": { en: "SPECIFIC AFFINITY", es: "AFINIDAD ESPECÍFICA", de: "SPEZIFISCHE AFFINITÄT", fr: "AFFINITÉ SPÉCIFIQUE" },
    "ALINHAMENTO COLETIVO GRATUITO": { en: "FREE COLLECTIVE ALIGNMENT", es: "ALINEACIÓN COLECTIVA GRATUITA", de: "KOSTENLOSE KOLLEKTIVE AUSRICHTUNG", fr: "ALIGNEMENT COLLECTIF GRATUIT" },
    "ANTIGAS FUGAS A EVITAR:": { en: "PAST ESCAPES TO AVOID:", es: "ANTIGUAS FUGAS A EVITAR:", de: "ALTE FLUCHTMUSTER ZU VERMEIDEN:", fr: "ANCIENNES ÉCHAPPATOIRES À ÉVITER :" },
    "ANÁLISE INDIVIDUALIZADA": { en: "INDIVIDUALIZED ANALYSIS", es: "ANÁLISIS INDIVIDUALIZADO", de: "INDIVIDUELLE ANALYSE", fr: "ANALYSE INDIVIDUALISÉE" },
    "ASPECTOS E CONJUNÇÕES REAIS DETECTADAS EM SEU MAPA": { en: "REAL ASPECTS AND CONJUNCTIONS DETECTED IN YOUR CHART", es: "ASPECTOS Y CONJUNCIONES REALES DETECTADAS EN TU MAPA", de: "ECHTE ASPEKTE & KONJUNKTIONEN IN IHREM HOROSKOP ENTDECKT", fr: "ASPECTS ET CONJONCTIONS RÉELS DÉTECTÉS DANS VOTRE CARTE" },
    "ATITUDE A ABRAÇAR:": { en: "ATTITUDE TO EMBRACE:", es: "ACTITUD A ABRAZAR:", de: "EINSTELLUNG ZU VERINNERLICHEN:", fr: "ATTITUDE À ADOPTER :" },
    "ATIVO & SINTONIZADO": { en: "ACTIVE & TUNED", es: "ACTIVO Y SINTONIZADO", de: "AKTIV & EINGESTIMMT", fr: "ACTIF & HARMONISÉ" },
    "AUTOR DA CURADORIA": { en: "CURATOR / AUTHOR", es: "AUTOR DE LA CURADURÍA", de: "KURATOR / AUTOR", fr: "AUTEUR DE LA CURATION" },
    "Abra o Deck do Templo Oculto": { en: "Open the Hidden Temple Deck", es: "Abre el Deck del Templo Oculto", de: "Öffnen Sie das Deck des Verborgenen Tempels", fr: "Ouvrez le Jeu du Temple Caché" },
    "Abraçar:": { en: "Embrace:", es: "Abrazar:", de: "Annehmen:", fr: "Adopter :" },
    "Abrindo Portal Órbita": { en: "Opening Portal Órbita", es: "Abriendo Portal Órbita", de: "Portal Órbita wird geöffnet", fr: "Ouverture du Portail Órbita" },
    "Abrir Dica Lunar Rápida": { en: "Open Quick Lunar Tip", es: "Abrir Consejo Lunar Rápido", de: "Schnellen Mondtipp öffnen", fr: "Ouvrir le Conseil Lunaire Rapide" },
    "Abrir Perfil": { en: "Open Profile", es: "Abrir Perfil", de: "Profil öffnen", fr: "Ouvrir le Profil" },
    "Abrir no Chrome": { en: "Open in Chrome", es: "Abrir en Chrome", de: "In Chrome öffnen", fr: "Ouvrir dans Chrome" },
    "Abrir no Safari/Chrome": { en: "Open in Safari/Chrome", es: "Abrir en Safari/Chrome", de: "In Safari/Chrome öffnen", fr: "Ouvrir dans Safari/Chrome" },
    "Aceleração de contatos, excelente para reavaliar correspondências importantes.": { en: "Acceleration of contacts, great for reevaluating important correspondence.", es: "Aceleración de contactos, excelente para reevaluar correspondencia importante.", de: "Beschleunigung von Kontakten, hervorragend zur Überprüfung wichtiger Korrespondenz.", fr: "Accélération des contacts, excellent pour réévaluer des correspondances importantes." },
    "Acelere Seus Objetivos, Navegue pelos Portais Ativos": { en: "Accelerate Your Goals, Navigate Active Portals", es: "Acelera tus Objetivos, Navega por los Portales Activos", de: "Beschleunigen Sie Ihre Ziele, Navigieren Sie durch aktive Portale", fr: "Accélérez vos Objectifs, Naviguez à travers les Portails Actifs" },
    "Acompanhamento detalhado e dinâmico de suas oscilações moleculares e intelectuais com conselhos estratégicos atualizados.": { en: "Detailed and dynamic tracking of your molecular and intellectual fluctuations with updated strategic advice.", es: "Seguimiento detallado y dinámico de sus oscilaciones moleculares e intelectuales con consejos estratégicos actualizados.", de: "Detaillierte und dynamische Verfolgung Ihrer molekularen und intellektuellen Schwankungen mit aktuellen strategischen Ratschlägen.", fr: "Suivi détaillé et dynamique de vos fluctuations moléculaires et intellectuelles avec des conseils stratégiques actualisés." },
    "Acompanhe os principais alinhamentos planetários com leituras personalizadas geradas pela inteligência artificial.": { en: "Track major planetary alignments with personalized readings generated by artificial intelligence.", es: "Sigue las principales alineaciones planetarias con lecturas personalizadas generadas por inteligencia artificial.", de: "Verfolgen Sie wichtige planetare Konstellationen mit personalisierten, von KI generierten Deutungen.", fr: "Suivez les principaux alignements planétaires grâce à des lectures personnalisées générées par l'intelligence artificielle." },
    "Acontece em:": { en: "Happens in:", es: "Ocurre en:", de: "Findet statt in:", fr: "Se produit dans :" },
    "Adaptabilidade": { en: "Adaptability", es: "Adaptabilidad", de: "Anpassungsfähigkeit", fr: "Adaptabilité" },
    "Adicionar Assinante ao Log": { en: "Add Subscriber to Log", es: "Agregar Suscriptor al Registro", de: "Abonnent zum Protokoll hinzufügen", fr: "Ajouter l'Abonné au Journal" },
    "Afinação Sideral": { en: "Sidereal Tuning", es: "Afinación Sideral", de: "Siderische Einstimmung", fr: "Accord Sidéral" },
    "Afinidade": { en: "Affinity", es: "Afinidad", de: "Affinität", fr: "Affinité" },
    "Afinidades no Ecossistema": { en: "Ecosystem Affinities", es: "Afinidades en el Ecosistema", de: "Affinitäten im Ökosystem", fr: "Affinités dans l'Écosystème" },
    "Agora": { en: "Now", es: "Ahora", de: "Jetzt", fr: "Maintenant" },
    "Ajuda & Suporte": { en: "Help & Support", es: "Ayuda y Soporte", de: "Hilfe & Support", fr: "Aide & Support" },
    "Alerta Cósmico": { en: "Cosmic Alert", es: "Alerta Cósmica", de: "Kosmische Warnung", fr: "Alerte Cosmique" },
    "Alinhamento Estelar": { en: "Stellar Alignment", es: "Alineación Estelar", de: "Sternenausrichtung", fr: "Alignement Stellaire" },
    "Alinhamento Planetário": { en: "Planetary Alignment", es: "Alineación Planetaria", de: "Planetenausrichtung", fr: "Alignement Planétaire" },
    "Alquimia Interior": { en: "Inner Alchemy", es: "Alquimia Interior", de: "Innere Alchemie", fr: "Alchimie Intérieure" },
    "Amor & Relacionamentos": { en: "Love & Relationships", es: "Amor y Relaciones", de: "Liebe & Beziehungen", fr: "Amour & Relations" },
    "Análise Completa": { en: "Complete Analysis", es: "Análisis Completo", de: "Vollständige Analyse", fr: "Analyse Complète" },
    "Análise de Sinastria": { en: "Synastry Analysis", es: "Análisis de Sinastría", de: "Synastrie-Analyse", fr: "Analyse de Synastrie" },
    "Ano Pessoal": { en: "Personal Year", es: "Año Personal", de: "Persönliches Jahr", fr: "Année Personnelle" },
    "Arcanos Maiores": { en: "Major Arcana", es: "Arcanos Mayores", de: "Große Arkana", fr: "Arcanes Majeurs" },
    "Arcanos Menores": { en: "Minor Arcana", es: "Arcanos Menores", de: "Kleine Arkana", fr: "Arcanes Mineurs" },
    "Área do Usuário": { en: "User Area", es: "Área de Usuario", de: "Benutzerbereich", fr: "Espace Utilisateur" },
    "Ascendente": { en: "Ascendant", es: "Ascendente", de: "Aszendent", fr: "Ascendant" },
    "Aspectos": { en: "Aspects", es: "Aspectos", de: "Aspekte", fr: "Aspects" },
    "Astrologia": { en: "Astrology", es: "Astrología", de: "Astrologie", fr: "Astrologie" },
    "Ativar": { en: "Activate", es: "Activar", de: "Aktivieren", fr: "Activer" },
    "Ativo": { en: "Active", es: "Activo", de: "Aktiv", fr: "Actif" },
    "Atualizar": { en: "Update", es: "Actualizar", de: "Aktualisieren", fr: "Mettre à jour" },
    "Biorritmo": { en: "Biorhythm", es: "Biorritmo", de: "Biorhythmus", fr: "Biorythme" },
    "Bloqueado": { en: "Locked", es: "Bloqueado", de: "Gesperrt", fr: "Verrouillé" },
    "Buscar": { en: "Search", es: "Buscar", de: "Suchen", fr: "Rechercher" },
    "Cancelar Assinatura": { en: "Cancel Subscription", es: "Cancelar Suscripción", de: "Abonnement kündigen", fr: "Résilier l'Abonnement" },
    "Carregando": { en: "Loading", es: "Cargando", de: "Wird geladen", fr: "Chargement" },
    "Carta do Dia": { en: "Card of the Day", es: "Carta del Día", de: "Karte des Tages", fr: "Carte du Jour" },
    "Casas Astrológicas": { en: "Astrological Houses", es: "Casas Astrológicas", de: "Astrologische Häuser", fr: "Maisons Astrologiques" },
    "Ciclos Cósmicos": { en: "Cosmic Cycles", es: "Ciclos Cósmicos", de: "Kosmische Zyklen", fr: "Cycles Cosmiques" },
    "Compatibilidade": { en: "Compatibility", es: "Compatibilidad", de: "Kompatibilität", fr: "Compatibilité" },
    "Configurações": { en: "Settings", es: "Configuración", de: "Einstellungen", fr: "Paramètres" },
    "Confirmar Senha": { en: "Confirm Password", es: "Confirmar Contraseña", de: "Passwort bestätigen", fr: "Confirmer le Mot de Passe" },
    "Conquistas": { en: "Achievements", es: "Logros", de: "Erfolge", fr: "Succès" },
    "Conta": { en: "Account", es: "Cuenta", de: "Konto", fr: "Compte" },
    "Data de Nascimento": { en: "Date of Birth", es: "Fecha de Nacimiento", de: "Geburtsdatum", fr: "Date de Naissance" },
    "Desbloquear": { en: "Unlock", es: "Desbloquear", de: "Freischalten", fr: "Déverrouiller" },
    "Editar Perfil": { en: "Edit Profile", es: "Editar Perfil", de: "Profil bearbeiten", fr: "Modifier le Profil" },
    "Email": { en: "Email", es: "Correo electrónico", de: "E-Mail", fr: "E-mail" },
    "Entrar": { en: "Sign in", es: "Iniciar sesión", de: "Anmelden", fr: "Connexion" },
    "Enviar": { en: "Send", es: "Enviar", de: "Senden", fr: "Envoyer" },
    "Fases da Lua": { en: "Moon Phases", es: "Fases de la Luna", de: "Mondphasen", fr: "Phases de la Lune" },
    "Fechar": { en: "Close", es: "Cerrar", de: "Schließen", fr: "Fermer" },
    "Gratuito": { en: "Free", es: "Gratuito", de: "Kostenlos", fr: "Gratuit" },
    "Histórico": { en: "History", es: "Historial", de: "Verlauf", fr: "Historique" },
    "Hora de Nascimento": { en: "Time of Birth", es: "Hora de Nacimiento", de: "Geburtszeit", fr: "Heure de Naissance" },
    "Horóscopo Diário": { en: "Daily Horoscope", es: "Horóscopo Diario", de: "Tageshoroskop", fr: "Horoscope Quotidien" },
    "Idioma": { en: "Language", es: "Idioma", de: "Sprache", fr: "Langue" },
    "Informações": { en: "Information", es: "Información", de: "Informationen", fr: "Informations" },
    "Iniciar": { en: "Start", es: "Iniciar", de: "Starten", fr: "Démarrer" },
    "Leitura de Tarot": { en: "Tarot Reading", es: "Lectura de Tarot", de: "Tarot-Lesung", fr: "Tirage de Tarot" },
    "Lua Cheia": { en: "Full Moon", es: "Luna Llena", de: "Vollmond", fr: "Pleine Lune" },
    "Lua Nova": { en: "New Moon", es: "Luna Nueva", de: "Neumond", fr: "Nouvelle Lune" },
    "Lua Crescente": { en: "Waxing Moon", es: "Luna Creciente", de: "Zunehmender Mond", fr: "Premier Quartier" },
    "Lua Minguante": { en: "Waning Moon", es: "Luna Menguante", de: "Abnehmender Mond", fr: "Dernier Quartier" },
    "Mapa Astral": { en: "Birth Chart", es: "Carta Astral", de: "Geburtshoroskop", fr: "Thème Astral" },
    "Mensagem": { en: "Message", es: "Mensaje", de: "Nachricht", fr: "Message" },
    "Missões": { en: "Missions", es: "Misiones", de: "Missionen", fr: "Missions" },
    "Nome": { en: "Name", es: "Nombre", de: "Name", fr: "Nom" },
    "Notificações": { en: "Notifications", es: "Notificaciones", de: "Benachrichtigungen", fr: "Notifications" },
    "Numerologia": { en: "Numerology", es: "Numerología", de: "Numerologie", fr: "Numérologie" },
    "Oráculo": { en: "Oracle", es: "Oráculo", de: "Orakel", fr: "Oracle" },
    "Perfil": { en: "Profile", es: "Perfil", de: "Profil", fr: "Profil" },
    "Personalizado": { en: "Customized", es: "Personalizado", de: "Personalisiert", fr: "Personnalisé" },
    "Planetas": { en: "Planets", es: "Planetas", de: "Planeten", fr: "Planètes" },
    "Plano": { en: "Plan", es: "Plan", de: "Plan", fr: "Plan" },
    "Premium": { en: "Premium", es: "Premium", de: "Premium", fr: "Premium" },
    "Privacidade": { en: "Privacy", es: "Privacidad", de: "Datenschutz", fr: "Confidentialité" },
    "Progresso": { en: "Progress", es: "Progreso", de: "Fortschritt", fr: "Progrès" },
    "Registrar": { en: "Register", es: "Registrarse", de: "Registrieren", fr: "S'inscrire" },
    "Sair": { en: "Log out", es: "Cerrar sesión", de: "Abmelden", fr: "Déconnexion" },
    "Salvar": { en: "Save", es: "Guardar", de: "Speichern", fr: "Enregistrer" },
    "Senha": { en: "Password", es: "Contraseña", de: "Passwort", fr: "Mot de passe" },
    "Signos": { en: "Signs", es: "Signos", de: "Sternzeichen", fr: "Signes" },
    "Sinastria": { en: "Synastry", es: "Sinastría", de: "Synastrie", fr: "Synastrie" },
    "Sonhos": { en: "Dreams", es: "Sueños", de: "Träume", fr: "Rêves" },
    "Status": { en: "Status", es: "Estado", de: "Status", fr: "Statut" },
    "Suporte": { en: "Support", es: "Soporte", de: "Support", fr: "Support" },
    "Tarot": { en: "Tarot", es: "Tarot", de: "Tarot", fr: "Tarot" },
    "Tema": { en: "Theme", es: "Tema", de: "Design", fr: "Thème" },
    "Termos de Uso": { en: "Terms of Use", es: "Términos de Uso", de: "Nutzungsbedingungen", fr: "Conditions d'Utilisation" },
    "Total": { en: "Total", es: "Total", de: "Gesamt", fr: "Total" },
    "Trânsitos": { en: "Transits", es: "Tránsitos", de: "Transite", fr: "Transits" },
    "Usuário": { en: "User", es: "Usuario", de: "Benutzer", fr: "Utilisateur" },
    "Ver mais": { en: "See more", es: "Ver más", de: "Mehr sehen", fr: "Voir plus" },
    "Voltar": { en: "Back", es: "Volver", de: "Zurück", fr: "Retour" }
  };

  if (map[k]) {
    return map[k];
  }

  return { en, es, de, fr };
}
