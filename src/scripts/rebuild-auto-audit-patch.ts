import * as fs from 'fs';
import * as path from 'path';
import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

// Dictionary of manual translations for Portuguese phrases to English, Spanish, German, French
const phraseTranslations: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "*O layout é auditado dinamicamente para garantir áreas de toque mínimas de 44px e evitar transbordamento de grid lateral em iPhones SE ou telas amplas.": {
    en: "*The layout is dynamically audited to ensure minimum touch targets of 44px and prevent horizontal overflow on smaller iPhones SE or ultra-wide displays.",
    es: "*El diseño se audita dinámicamente para garantizar áreas táctiles mínimas de 44 px y evitar desbordamientos en pantallas pequeñas o panorámicas.",
    de: "*Das Layout wird dynamisch geprüft, um Mindest-Touch-Bereiche von 44px zu gewährleisten und Überlauf auf kleinen oder breiten Bildschirmen zu verhindern.",
    fr: "*La mise en page est auditée dynamiquement pour garantir des zones tactiles minimales de 44px et éviter tout débordement sur les écrans étroits ou ultra-larges."
  },
  "+150 Pontos Ativados": {
    en: "+150 Points Activated",
    es: "+150 Puntos Activados",
    de: "+150 Punkte Aktiviert",
    fr: "+150 Points Activés"
  },
  "1. Carregar Templates Rápidos de Email / SMS": {
    en: "1. Load Quick Email / SMS Templates",
    es: "1. Cargar Plantillas Rápidas de Email / SMS",
    de: "1. Schnelle E-Mail- / SMS-Vorlagen laden",
    fr: "1. Charger des Modèles Rapides d'E-mail / SMS"
  },
  "1. Distribuição dos Elementos": {
    en: "1. Distribution of Elements",
    es: "1. Distribución de los Elementos",
    de: "1. Verteilung der Elemente",
    fr: "1. Répartition des Éléments"
  },
  "1. Mapa de Harmonia de": {
    en: "1. Harmony Chart of",
    es: "1. Mapa de Armonía de",
    de: "1. Harmonie-Karte von",
    fr: "1. Carte d'Harmonie de"
  },
  "10. Pontos Ocultos & Ligações Kármicas": {
    en: "10. Hidden Points & Karmic Connections",
    es: "10. Puntos Ocultos y Conexiones Kármicas",
    de: "10. Verborgene Punkte & Karmische Verbindungen",
    fr: "10. Points Cachés & Connexions Karmiques"
  },
  "11. Inteligência de Relacionamento Cósmico": {
    en: "11. Cosmic Relationship Intelligence",
    es: "11. Inteligencia de Relaciones Cósmicas",
    de: "11. Kosmische Beziehungsintelligenz",
    fr: "11. Intelligence Relationnelle Cosmique"
  },
  "15.4 KB Usados": {
    en: "15.4 KB Used",
    es: "15.4 KB Usados",
    de: "15.4 KB Verwendet",
    fr: "15.4 Ko Utilisés"
  },
  "2. Análise Detalhada Estelar": {
    en: "2. Detailed Stellar Analysis",
    es: "2. Análisis Detallado Estelar",
    de: "2. Detaillierte Sternenanalyse",
    fr: "2. Analyse Stellaire Détaillée"
  },
  "2. Construir Alerta Personalizado": {
    en: "2. Build Custom Alert",
    es: "2. Crear Alerta Personalizada",
    de: "2. Benutzerdefinierte Benachrichtigung erstellen",
    fr: "2. Créer une Alerte Personnalisée"
  },
  "2. Qualidades Astrológicas": {
    en: "2. Astrological Qualities",
    es: "2. Cualidades Astrológicas",
    de: "2. Astrologische Qualitäten",
    fr: "2. Qualités Astrologiques"
  },
  "3. Polaridade Energética": {
    en: "3. Energy Polarity",
    es: "3. Polaridad Energética",
    de: "3. Energiepolarität",
    fr: "3. Polarité Énergétique"
  },
  "4. Resumo de Compatibilidades Detalhadas": {
    en: "4. Detailed Compatibility Summary",
    es: "4. Resumen de Compatibilidades Detalladas",
    de: "4. Detaillierte Kompatibilitätsübersicht",
    fr: "4. Résumé Détaillé des Compatibilités"
  },
  "6. Calendário & Ciclos de Tendências Futuras": {
    en: "6. Calendar & Future Trend Cycles",
    es: "6. Calendario y Ciclos de Tendencias Futuras",
    de: "6. Kalender & Zukünftige Trendzyklen",
    fr: "6. Calendrier & Cycles de Tendances Futures"
  },
  "7. Dias Favoráveis Reais Calculados": {
    en: "7. Calculated Real Favorable Days",
    es: "7. Días Favorables Reales Calculados",
    de: "7. Berechnete Reale Günstige Tage",
    fr: "7. Jours Favorables Réels Calculés"
  },
  "8 pessoas já curtiram o seu perfil": {
    en: "8 people have already liked your profile",
    es: "A 8 personas ya les ha gustado tu perfil",
    de: "8 Personen haben Ihr Profil bereits geliked",
    fr: "8 personnes ont déjà aimé votre profil"
  },
  "8. Dias de Atenção & Cautela Cósmica": {
    en: "8. Cosmic Caution & Attention Days",
    es: "8. Días de Atención y Cautela Cósmica",
    de: "8. Tage für Kosmische Achtsamkeit & Vorsicht",
    fr: "8. Jours d'Attention & Prudence Cosmique"
  },
  "9. Visão Estelar de Longo Prazo": {
    en: "9. Long-Term Stellar Vision",
    es: "9. Visión Estelar a Largo Plazo",
    de: "9. Langfristige Sternenvision",
    fr: "9. Vision Stellaire à Long Terme"
  },
  "A Balança Astrológica": {
    en: "The Astrological Scale",
    es: "La Balanza Astrológica",
    de: "Die Astrologische Waage",
    fr: "La Balance Astrologique"
  },
  "A Integração de Bagagens": {
    en: "Integration of Baggage",
    es: "La Integración de Equipaje",
    de: "Die Integration von Lebensgepäck",
    fr: "L'Intégration des Bagages"
  },
  "A PREVISÃO COMPLETA DE SUA LINHA DO TEMPO": {
    en: "THE COMPLETE TIMELINE FORECAST",
    es: "LA PREDICCIÓN COMPLETA DE TU LÍNEA TEMPORAL",
    de: "DIE VOLLSTÄNDIGE ZEITLINIEN-PROGNOSE",
    fr: "LA PRÉVISION COMPLÈTE DE VOTRE LIGNE DU TEMPS"
  },
  "A energia mutadora de": {
    en: "The transforming energy of",
    es: "La energía transformadora de",
    de: "Die verändernde Energie von",
    fr: "L'énergie transformatrice de"
  },
  "A tecnologia PWA permite adicionar o aplicativo direto na tela de início sem precisar instalar arquivos separados. É compatível com Android e iOS (iPhone).": {
    en: "PWA technology lets you add the app directly to your home screen without downloading separate store files. It is compatible with Android and iOS (iPhone).",
    es: "La tecnología PWA le permite agregar la aplicación directamente a la pantalla de inicio sin instalar archivos separados. Es compatible con Android e iOS (iPhone).",
    de: "Die PWA-Technologie ermöglicht es Ihnen, die App direkt zum Startbildschirm hinzuzufügen, ohne separate Installationsdateien zu benötigen. Kompatibel mit Android und iOS (iPhone).",
    fr: "La technologie PWA vous permet d'ajouter l'application directement à l'écran d'accueil sans installer de fichiers séparés. Compatible avec Android et iOS (iPhone)."
  },
  "AFINIDADE ESPECÍFICA": {
    en: "SPECIFIC AFFINITY",
    es: "AFINIDAD ESPECÍFICA",
    de: "SPEZIFISCHE AFFINITÄT",
    fr: "AFFINITÉ SPÉCIFIQUE"
  },
  "ALINHAMENTO COLETIVO GRATUITO": {
    en: "FREE COLLECTIVE ALIGNMENT",
    es: "ALINEACIÓN COLECTIVA GRATUITA",
    de: "KOSTENLOSE KOLLEKTIVE AUSRICHTUNG",
    fr: "ALIGNEMENT COLLECTIF GRATUIT"
  },
  "ANTIGAS FUGAS A EVITAR:": {
    en: "PAST ESCAPES TO AVOID:",
    es: "ANTIGUAS FUGAS A EVITAR:",
    de: "ALTE FLUCHTMUSTER ZU VERMEIDEN:",
    fr: "ANCIENNES ÉCHAPPATOIRES À ÉVITER :"
  },
  "ANÁLISE INDIVIDUALIZADA": {
    en: "INDIVIDUALIZED ANALYSIS",
    es: "ANÁLISIS INDIVIDUALIZADO",
    de: "INDIVIDUELLE ANALYSE",
    fr: "ANALYSE INDIVIDUALISÉE"
  },
  "ASPECTOS E CONJUNÇÕES REAIS DETECTADAS EM SEU MAPA": {
    en: "REAL ASPECTS AND CONJUNCTIONS DETECTED IN YOUR CHART",
    es: "ASPECTOS Y CONJUNCIONES REALES DETECTADAS EN TU MAPA",
    de: "ECHTE ASPEKTE & KONJUNKTIONEN IN IHREM HOROSKOP ENTDECKT",
    fr: "ASPECTS ET CONJONCTIONS RÉELS DÉTECTÉS DANS VOTRE CARTE"
  },
  "ATITUDE A ABRAÇAR:": {
    en: "ATTITUDE TO EMBRACE:",
    es: "ACTITUD A ABRAZAR:",
    de: "EINSTELLUNG ZU VERINNERLICHEN:",
    fr: "ATTITUDE À ADOPTER :"
  },
  "ATIVO & SINTONIZADO": {
    en: "ACTIVE & TUNED",
    es: "ACTIVO Y SINTONIZADO",
    de: "AKTIV & EINGESTIMMT",
    fr: "ACTIF & HARMONISÉ"
  },
  "AUTOR DA CURADORIA": {
    en: "CURATOR / AUTHOR",
    es: "AUTOR DE LA CURADURÍA",
    de: "KURATOR / AUTOR",
    fr: "AUTEUR DE LA CURATION"
  },
  "Abra o Deck do Templo Oculto": {
    en: "Open the Hidden Temple Deck",
    es: "Abre el Deck del Templo Oculto",
    de: "Öffnen Sie das Deck des Verborgenen Tempels",
    fr: "Ouvrez le Jeu du Temple Caché"
  },
  "Abraçar:": {
    en: "Embrace:",
    es: "Abrazar:",
    de: "Annehmen:",
    fr: "Adopter :"
  },
  "Abrindo Portal Órbita": {
    en: "Opening Portal Órbita",
    es: "Abriendo Portal Órbita",
    de: "Portal Órbita wird geöffnet",
    fr: "Ouverture du Portail Órbita"
  },
  "Abrir Dica Lunar Rápida": {
    en: "Open Quick Lunar Tip",
    es: "Abrir Consejo Lunar Rápido",
    de: "Schnellen Mondtipp öffnen",
    fr: "Ouvrir le Conseil Lunaire Rapide"
  },
  "Abrir Perfil": {
    en: "Open Profile",
    es: "Abrir Perfil",
    de: "Profil öffnen",
    fr: "Ouvrir le Profil"
  },
  "Abrir no Chrome": {
    en: "Open in Chrome",
    es: "Abrir en Chrome",
    de: "In Chrome öffnen",
    fr: "Ouvrir dans Chrome"
  },
  "Abrir no Safari/Chrome": {
    en: "Open in Safari/Chrome",
    es: "Abrir en Safari/Chrome",
    de: "In Safari/Chrome öffnen",
    fr: "Ouvrir dans Safari/Chrome"
  },
  "Aceleração de contatos, excelente para reavaliar correspondências importantes.": {
    en: "Acceleration of contacts, great for reevaluating important correspondence.",
    es: "Aceleración de contactos, excelente para reevaluar correspondencia importante.",
    de: "Beschleunigung von Kontakten, hervorragend zur Überprüfung wichtiger Korrespondenz.",
    fr: "Accélération des contacts, excellent pour réévaluer des correspondances importantes."
  },
  "Acelere Seus Objetivos, Navegue pelos Portais Ativos": {
    en: "Accelerate Your Goals, Navigate Active Portals",
    es: "Acelera tus Objetivos, Navega por los Portales Activos",
    de: "Beschleunigen Sie Ihre Ziele, Navigieren Sie durch aktive Portale",
    fr: "Accélérez vos Objectifs, Naviguez à travers les Portails Actifs"
  },
  "Acompanhamento detalhado e dinâmico de suas oscilações moleculares e intelectuais com conselhos estratégicos atualizados.": {
    en: "Detailed and dynamic tracking of your molecular and intellectual fluctuations with updated strategic advice.",
    es: "Seguimiento detallado y dinámico de sus oscilaciones moleculares e intelectuales con consejos estratégicos actualizados.",
    de: "Detaillierte und dynamische Verfolgung Ihrer molekularen und intellektuellen Schwankungen mit aktuellen strategischen Ratschlägen.",
    fr: "Suivi détaillé et dynamique de vos fluctuations moléculaires et intellectuelles avec des conseils stratégiques actualisés."
  },
  "Acompanhe os principais alinhamentos planetários com leituras personalizadas geradas pela inteligência artificial.": {
    en: "Track major planetary alignments with personalized readings generated by artificial intelligence.",
    es: "Sigue las principales alineaciones planetarias con lecturas personalizadas generadas por inteligencia artificial.",
    de: "Verfolgen Sie wichtige planetare Konstellationen mit personalisierten, von KI generierten Deutungen.",
    fr: "Suivez les principaux alignements planétaires grâce à des lectures personnalisées générées par l'intelligence artificielle."
  },
  "Acontece em:": {
    en: "Happens in:",
    es: "Ocurre en:",
    de: "Findet statt in:",
    fr: "Se produit dans :"
  },
  "Adaptabilidade": {
    en: "Adaptability",
    es: "Adaptabilidad",
    de: "Anpassungsfähigkeit",
    fr: "Adaptabilité"
  },
  "Adicionar Assinante ao Log": {
    en: "Add Subscriber to Log",
    es: "Agregar Suscriptor al Registro",
    de: "Abonnent zum Protokoll hinzufügen",
    fr: "Ajouter l'Abonné au Journal"
  },
  "Afinação Sideral": {
    en: "Sidereal Tuning",
    es: "Afinación Sideral",
    de: "Siderische Einstimmung",
    fr: "Accord Sidéral"
  },
  "Afinidade": {
    en: "Affinity",
    es: "Afinidad",
    de: "Affinität",
    fr: "Affinité"
  },
  "Afinidades no Ecossistema": {
    en: "Ecosystem Affinities",
    es: "Afinidades en el Ecosistema",
    de: "Affinitäten im Ökosystem",
    fr: "Affinités dans l'Écosystème"
  }
};

console.log('Phrase mapping initialized.');
