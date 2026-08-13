import * as fs from 'fs';
import * as path from 'path';

import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

// Let's load the fix keys
const fixKeys = JSON.parse(fs.readFileSync('fix-keys.json', 'utf8'));
const allKeysToFix = Array.from(new Set([...fixKeys.un, ...fixKeys.inv]));

console.log(`Processing ${allKeysToFix.length} additional keys to translate...`);

// High-quality translations for all UI keys and toasts
const extraDict: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "Google": { en: "Google", es: "Google", de: "Google", fr: "Google" },
  "Lápis-Lazúli:": { en: "Lapis Lazuli:", es: "Lapislázuli:", de: "Lapislazuli:", fr: "Lapis-lazuli :" },
  "Consagração": { en: "Consecration", es: "Consagración", de: "Weihe", fr: "Consécration" },
  "Misticismo": { en: "Mysticism", es: "Misticismo", de: "Mystik", fr: "Mysticisme" },
  "DETECTADO": { en: "DETECTED", es: "DETECTADO", de: "ERKANNT", fr: "DÉTECTÉ" },
  "RECOMENDADO": { en: "RECOMMENDED", es: "RECOMENDADO", de: "EMPFOHLEN", fr: "RECOMMANDÉ" },
  "Tarô": { en: "Tarot", es: "Tarot", de: "Tarot", fr: "Tarot" },
  "Bioritmo": { en: "Biorhythm", es: "Biorritmo", de: "Biorhythmus", fr: "Biorythme" },
  "Estatísticas": { en: "Statistics", es: "Estadísticas", de: "Statistiken", fr: "Statistiques" },
  "Usuários": { en: "Users", es: "Usuarios", de: "Benutzer", fr: "Utilisateurs" },
  "Planos": { en: "Plans", es: "Planes", de: "Pläne", fr: "Formules" },
  "Conteúdo": { en: "Content", es: "Contenido", de: "Inhalt", fr: "Contenu" },
  "Consultas": { en: "Consultations", es: "Consultas", de: "Konsultationen", fr: "Consultations" },
  "Status:": { en: "Status:", es: "Estado:", de: "Status:", fr: "Statut :" },
  "Suspenso": { en: "Suspended", es: "Suspendido", de: "Ausgesetzt", fr: "Suspendu" },
  "Relatório": { en: "Report", es: "Informe", de: "Bericht", fr: "Rapport" },
  "Sistema": { en: "System", es: "Sistema", de: "System", fr: "Système" },
  "Placeholder...": { en: "Placeholder...", es: "Marcador de posición...", de: "Platzhalter...", fr: "Espace réservé..." },
  "Rx": { en: "Rx (Retrograde)", es: "Rx (Retrógrado)", de: "Rx (Rückläufig)", fr: "Rx (Rétrograde)" },
  "Aspectos": { en: "Aspects", es: "Aspectos", de: "Aspekte", fr: "Aspects" },
  "Distância": { en: "Distance", es: "Distancia", de: "Distanz", fr: "Distance" },
  "orbe": { en: "orb", es: "orbe", de: "Orbis", fr: "orbe" },
  "CIDADE": { en: "CITY", es: "CIUDAD", de: "STADT", fr: "VILLE" },
  "De": { en: "From", es: "De", de: "Von", fr: "De" },
  "CASA": { en: "HOUSE", es: "CASA", de: "HAUS", fr: "MAISON" },
  "Orbe:": { en: "Orb:", es: "Orbe:", de: "Orbis:", fr: "Orbe :" },
  "anos": { en: "years", es: "años", de: "Jahre", fr: "ans" },
  "Match": { en: "Match", es: "Match", de: "Treffer", fr: "Match" },
  "Afinidade": { en: "Affinity", es: "Afinidad", de: "Affinität", fr: "Affinité" },
  "Pessoas": { en: "People", es: "Personas", de: "Personen", fr: "Personnes" },
  "Ocultar": { en: "Hide", es: "Ocultar", de: "Ausblenden", fr: "Masquer" },
  "Mostrar": { en: "Show", es: "Mostrar", de: "Anzeigen", fr: "Afficher" },
  "Sol:": { en: "Sun:", es: "Sol:", de: "Sonne:", fr: "Soleil :" },
  "Qualquer": { en: "Any", es: "Cualquiera", de: "Beliebig", fr: "N'importe quel" },
  "Ascendente:": { en: "Ascendant:", es: "Ascendente:", de: "Aszendent:", fr: "Ascendant :" },
  "Lua:": { en: "Moon:", es: "Luna:", de: "Mond:", fr: "Lune :" },
  "Marte:": { en: "Mars:", es: "Marte:", de: "Mars:", fr: "Mars :" },
  "Vênus:": { en: "Venus:", es: "Venus:", de: "Venus:", fr: "Vénus :" },
  "Mercúrio:": { en: "Mercury:", es: "Mercurio:", de: "Merkur:", fr: "Mercure :" },
  "Júpiter:": { en: "Jupiter:", es: "Júpiter:", de: "Jupiter:", fr: "Jupiter :" },
  "Saturno:": { en: "Saturn:", es: "Saturno:", de: "Saturn:", fr: "Saturne :" },
  "Asc": { en: "Asc", es: "Asc", de: "Asz", fr: "Asc" },
  "SINASTRIA": { en: "SYNASTRY", es: "SINASTRÍA", de: "SYNASTRIE", fr: "SYNASTRIE" },
  "Pontos": { en: "Points", es: "Puntos", de: "Punkte", fr: "Points" },
  "Geral": { en: "General", es: "General", de: "Allgemein", fr: "Général" },
  "Cooperação": { en: "Cooperation", es: "Cooperación", de: "Kooperation", fr: "Coopération" },
  "Elemento:": { en: "Element:", es: "Elemento:", de: "Element:", fr: "Élément :" },
  "fill_all_fields": { en: "Please fill in all fields.", es: "Por favor complete todos los campos.", de: "Bitte füllen Sie alle Felder aus.", fr: "Veuillez remplir tous les champs." },
  "dailyHoroscope": { en: "Daily Horoscope", es: "Horóscopo Diario", de: "Tageshoroskop", fr: "Horoscope Quotidien" },
  "weeklyHoroscope": { en: "Weekly Horoscope", es: "Horóscopo Semanal", de: "Wochenhoroskop", fr: "Horoscope Hebdomadaire" },
  "insightOfTheDay": { en: "Insight of the Day", es: "Perspicacia del Día", de: "Einblick des Tages", fr: "Aperçu du Jour" },
  "lunarPhase": { en: "Lunar Phase", es: "Fase Lunar", de: "Mondphase", fr: "Phase Lunaire" },
  "peaceful": { en: "Peaceful", es: "Pacífico", de: "Friedlich", fr: "Paisible" },
  "neutral": { en: "Neutral", es: "Neutral", de: "Neutral", fr: "Neutre" },
  "lucid": { en: "Lucid", es: "Lúcido", de: "Klar", fr: "Lucide" },
  "intense": { en: "Intense", es: "Intenso", de: "Intensiv", fr: "Intense" },
  "nightmare": { en: "Nightmare", es: "Pesadilla", de: "Albtraum", fr: "Cauchemar" },
  "dreamsTitle": { en: "Dream Journal", es: "Diario de Sueños", de: "Traumtagebuch", fr: "Journal des Rêves" },
  "dreamsDesc": { en: "Record and decipher the subconscious messages in your dreams.", es: "Registra y descifra los mensajes del subconsciente en tus sueños.", de: "Zeichnen Sie die unbewussten Botschaften in Ihren Träumen auf.", fr: "Enregistrez et déchiffrez les messages subconscients de vos rêves." },
  "dreamTitleLabel": { en: "Dream Title", es: "Título del Sueño", de: "Traumtitel", fr: "Titre du Rêve" },
  "dreamContentLabel": { en: "Dream Narrative", es: "Relato del Sueño", de: "Traumerzählung", fr: "Récit du Rêve" },
  "dreamMood": { en: "Dream Mood", es: "Estado de Ánimo del Sueño", de: "Traumstimmung", fr: "Humeur du Rêve" },
  "saveDream": { en: "Save Dream", es: "Guardar Sueño", de: "Traum speichern", fr: "Enregistrer le Rêve" },
  "dreamJournal": { en: "Dream Journal", es: "Diario de Sueños", de: "Traumtagebuch", fr: "Journal des Rêves" },
  "analyzeDreamAI": { en: "Analyze Dream with AI", es: "Analizar Sueño con IA", de: "Traum mit KI analysieren", fr: "Analyser le Rêve avec l'IA" },
  "iluminada": { en: "illuminated", es: "iluminada", de: "beleuchtet", fr: "illuminée" },
  "SINTONIZADO": { en: "TUNED", es: "SINTONIZADO", de: "EINGESTIMMT", fr: "ACCORDÉ" },
  "Introdução": { en: "Introduction", es: "Introducción", de: "Einführung", fr: "Introduction" },
  "Insights": { en: "Insights", es: "Perspicacias", de: "Einblicke", fr: "Aperçus" },
  "Conjunções": { en: "Conjunctions", es: "Conjunciones", de: "Konjunktionen", fr: "Conjonctions" },
  "Reflexões": { en: "Reflections", es: "Reflexiones", de: "Reflexionen", fr: "Réflexions" },
  "Olá,": { en: "Hello,", es: "Hola,", de: "Hallo,", fr: "Bonjour," },
  "na": { en: "in", es: "en", de: "in", fr: "dans" },
  "Símbolo:": { en: "Symbol:", es: "Símbolo:", de: "Symbol:", fr: "Symbole :" },
  "Benefício:": { en: "Benefit:", es: "Beneficio:", de: "Vorteil:", fr: "Bénéfice :" },
  "Oposição:": { en: "Opposition:", es: "Oposición:", de: "Opposition:", fr: "Opposition :" },
  "Integrar:": { en: "Integrate:", es: "Integrar:", de: "Integrieren:", fr: "Intégrer :" },
  "Evitar:": { en: "Avoid:", es: "Evitar:", de: "Vermeiden:", fr: "Éviter :" },
  "Abraçar:": { en: "Embrace:", es: "Abrazar:", de: "Umarme:", fr: "Embrasser :" },

  // Toast / System notifications
  "Enviar Sinal Cósmico de Sintonia": { en: "Send Cosmic Tuning Signal", es: "Enviar Señal Cósmica de Sintonía", de: "Kosmisches Einstimmsignal senden", fr: "Envoyer un Signal Cosmique d'Accordage" },
  "Período de Teste Concluído": { en: "Trial Period Ended", es: "Período de Prueba Finalizado", de: "Testphase Beendet", fr: "Période d'Essai Terminée" },
  "Este dispositivo já utilizou o período gratuito. Ative uma assinatura para continuar.": { en: "This device has already used the free trial. Activate a subscription to continue.", es: "Este dispositivo ya utilizó el período gratuito. Activa una suscripción para continuar.", de: "Dieses Gerät hat den kostenlosen Testzeitraum bereits genutzt. Aktivieren Sie ein Abonnement, um fortzufahren.", fr: "Cet appareil a déjà utilisé la période d'essai gratuite. Activez un abonnement pour continuer." },
  "Conexão cósmica restaurada.": { en: "Cosmic connection restored.", es: "Conexión cósmica restaurada.", de: "Kosmische Verbindung wiederhergestellt.", fr: "Connexion cosmique restaurée." },
  "Aviso de Período de Teste": { en: "Trial Period Notice", es: "Aviso de Período de Prueba", de: "Hinweis zur Testphase", fr: "Avis de Période d'Essai" },
  "Este dispositivo já utilizou o período gratuito anteriormente.": { en: "This device has previously used the free trial.", es: "Este dispositivo ya ha utilizado el período gratuito anteriormente.", de: "Dieses Gerät hat die kostenlose Testphase zuvor bereits genutzt.", fr: "Cet appareil a déjà utilisé la période d'essai gratuite auparavant." },
  "Sua Conta Google foi conectada e seu mapa astral foi criado com sucesso!": { en: "Your Google Account has been connected and your birth chart created successfully!", es: "¡Tu cuenta de Google ha sido conectada y tu carta astral creada con éxito!", de: "Ihr Google-Konto wurde verbunden und Ihr Geburtshoroskop erfolgreich erstellt!", fr: "Votre compte Google a été connecté et votre thème astral créé avec succès !" },
  "Erro de Autenticação": { en: "Authentication Error", es: "Error de Autenticación", de: "Authentifizierungsfehler", fr: "Erreur d'Authentification" },
  "Não foi possível conectar com o Google.": { en: "Could not connect with Google.", es: "No se pudo conectar con Google.", de: "Verbindung mit Google konnte nicht hergestellt werden.", fr: "Impossible de se connecter avec Google." },
  "Conexão via Facebook ativa.": { en: "Facebook connection active.", es: "Conexión vía Facebook activa.", de: "Facebook-Verbindung aktiv.", fr: "Connexion Facebook active." },
  "Conexão estabelecida via Facebook!": { en: "Connection established via Facebook!", es: "¡Conexión establecida a través de Facebook!", de: "Verbindung über Facebook hergestellt!", fr: "Connexion établie via Facebook !" },
  "Não foi possível fazer login com Facebook.": { en: "Could not log in with Facebook.", es: "No se pudo iniciar sesión con Facebook.", de: "Anmeldung über Facebook fehlgeschlagen.", fr: "Impossible de se connecter avec Facebook." },
  "Erro de Solicitação": { en: "Request Error", es: "Error de Solicitud", de: "Anfragefehler", fr: "Erreur de Demande" },
  "Por favor, digite seu e-mail.": { en: "Please enter your email address.", es: "Por favor, introduce tu correo electrónico.", de: "Bitte geben Sie Ihre E-Mail-Adresse ein.", fr: "Veuillez saisir votre adresse e-mail." },
  "Instruções de recuperação de senha enviadas para seu e-mail.": { en: "Password recovery instructions sent to your email.", es: "Instrucciones de recuperación de contraseña enviadas a tu correo.", de: "Anweisungen zur Passwortwiederherstellung wurden an Ihre E-Mail gesendet.", fr: "Instructions de récupération de mot de passe envoyées à votre e-mail." },
  "ativado temporariamente no seu navegador!": { en: "temporarily activated in your browser!", es: "¡activado temporalmente en tu navegador!", de: "vorübergehend in Ihrem Browser aktiviert!", fr: "temporairement activé dans votre navigateur !" },
  "Última Atualização": { en: "Last Updated", es: "Última Actualización", de: "Zuletzt Aktualisiert", fr: "Dernière Mise à Jour" },
  "Procure por amigos ou pessoas com o perfil astrológico desejado.": { en: "Search for friends or people with your desired astrological profile.", es: "Busca amigos o personas con el perfil astrológico deseado.", de: "Suchen Sie nach Freunden oder Personen mit dem gewünschten astrologischen Profil.", fr: "Recherchez des amis ou des personnes ayant le profil astrologique souhaité." },
  "Este quadro mostra a condição que cada signo, planeta e casa possui em seu mapa astral, sendo parte integrante das informações que você leu acima. Você já se perguntou por quê algumas pessoas atribuem pesos diferentes para os diversos aspectos de sua personalidade ou desprendem mais ou menos energia em uma determinada área da vida? Isso acontece pois como você acompanhou até aqui, há diversas forças em jogo. Todo mapa astral é uma mistura variada de energias que criam uma configuração única, como uma espécie de DNA astral.": {
    en: "This table shows the condition that each sign, planet, and house holds in your birth chart, forming an integral part of the insights above. Have you ever wondered why people assign different weights to various aspects of their personality or release more or less energy in a certain area of life? This occurs because multiple celestial forces are at play. Every birth chart is an intricate blend of energies creating a unique configuration, akin to an astral DNA.",
    es: "Este cuadro muestra la condición que cada signo, planeta y casa posee en tu carta astral, siendo parte integrante de la información leída arriba. ¿Te has preguntado por qué algunas personas atribuyen diferentes pesos a diversos aspectos de su personalidad o desprenden más o menos energía en cierta área de la vida? Esto ocurre porque hay diversas fuerzas en juego. Toda carta astral es una mezcla variada de energías que crean una configuración única, como una especie de ADN astral.",
    de: "Diese Tabelle zeigt den Zustand, den jedes Zeichen, jeder Planet und jedes Haus in Ihrem Geburtshoroskop einnimmt. Haben Sie sich jemals gefragt, warum manche Menschen verschiedenen Facetten ihrer Persönlichkeit unterschiedliches Gewicht beimessen oder mehr oder weniger Energie in einen bestimmten Lebensbereich investieren? Dies geschieht, weil zahlreiche Kräfte im Spiel sind. Jedes Horoskop ist eine einzigartige Mischung aus Energien, ähnlich einer astralen DNA.",
    fr: "Ce tableau montre la condition que chaque signe, planète et maison possède dans votre thème astral, faisant partie intégrante des informations ci-dessus. Vous êtes-vous déjà demandé pourquoi certaines personnes accordent des poids différents aux divers aspects de leur personnalité ou dépensent plus ou moins d'énergie dans un domaine particulier ? Cela s'explique par les nombreuses forces en jeu. Tout thème astral est un mélange varié d'énergies créant une configuration unique, sorte d'ADN astral."
  },
  "Sintonizar Mapa Astral": { en: "Tune Birth Chart", es: "Sintonizar Carta Astral", de: "Geburtshoroskop einstimmen", fr: "Accorder le Thème Astral" },
  "rituals.love.steps.1.title": { en: "Set Pure Intentions", es: "Establecer Intenciones Puras", de: "Reine Absichten setzen", fr: "Définir des Intentions Pures" }
};

// Apply all extra translations
for (const lang of ['en', 'es', 'de', 'fr'] as const) {
  for (const [key, tr] of Object.entries(extraDict)) {
    autoAuditPatch[lang][key] = tr[lang];
    if (mergedTranslations.pt && !mergedTranslations.pt[key]) {
      mergedTranslations.pt[key] = key;
    }
  }
}

// Write the master autoAuditPatch
const fileContent = `// Auto-generated 100% complete translation patch
export const autoAuditPatch: Record<'en' | 'es' | 'de' | 'fr', Record<string, string>> = ${JSON.stringify(autoAuditPatch, null, 2)};
`;

fs.writeFileSync(path.resolve('src/lib/autoAuditPatch.ts'), fileContent, 'utf8');
console.log('Saved master autoAuditPatch.ts');
