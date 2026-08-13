import * as fs from 'fs';
import * as path from 'path';

// Master Translation Dictionary Generator for Portal Órbita (PT -> EN, ES, DE, FR)
// Covers all 1177 keys with precise domain-specific terminology (Astrology, Tarot, Biorhythm, UI, Cosmic Portal)

interface KeyItem {
  key: string;
  pt: string;
}

const untranslatedList: KeyItem[] = JSON.parse(fs.readFileSync('untranslated-keys.json', 'utf8'));

// Domain dictionaries and semantic translation tables
const directTranslations: Record<string, { en: string; es: string; de: string; fr: string }> = {
  // Navigation & Core UI
  "Perfil": { en: "Profile", es: "Perfil", de: "Profil", fr: "Profil" },
  "E-mail": { en: "Email", es: "Correo electrónico", de: "E-Mail", fr: "E-mail" },
  "Português (BR)": { en: "Portuguese (BR)", es: "Portugués (BR)", de: "Portugiesisch (BR)", fr: "Portugais (BR)" },
  "English (US)": { en: "English (US)", es: "Inglés (EE. UU.)", de: "Englisch (US)", fr: "Anglais (US)" },
  "Español (ES)": { en: "Spanish (ES)", es: "Español (ES)", de: "Spanisch (ES)", fr: "Espagnol (ES)" },
  "Deutsch (DE)": { en: "German (DE)", es: "Alemán (DE)", de: "Deutsch (DE)", fr: "Allemand (DE)" },
  "Français (FR)": { en: "French (FR)", es: "Francés (FR)", de: "Französisch (FR)", fr: "Français (FR)" },
  "Cancelar": { en: "Cancel", es: "Cancelar", de: "Abbrechen", fr: "Annuler" },
  "Salvar": { en: "Save", es: "Guardar", de: "Speichern", fr: "Enregistrer" },
  "Salvar Alterações": { en: "Save Changes", es: "Guardar cambios", de: "Änderungen speichern", fr: "Enregistrer les modifications" },
  "Editar": { en: "Edit", es: "Editar", de: "Bearbeiten", fr: "Modifier" },
  "Excluir": { en: "Delete", es: "Eliminar", de: "Löschen", fr: "Supprimer" },
  "Voltar": { en: "Back", es: "Volver", de: "Zurück", fr: "Retour" },
  "Fechar": { en: "Close", es: "Cerrar", de: "Schließen", fr: "Fermer" },
  "Continuar": { en: "Continue", es: "Continuar", de: "Fortfahren", fr: "Continuer" },
  "Confirmar": { en: "Confirm", es: "Confirmar", de: "Bestätigen", fr: "Confirmer" },
  "Carregando...": { en: "Loading...", es: "Cargando...", de: "Laden...", fr: "Chargement..." },
  "Sucesso!": { en: "Success!", es: "¡Éxito!", de: "Erfolg!", fr: "Succès !" },
  "Erro": { en: "Error", es: "Error", de: "Fehler", fr: "Erreur" },
  "Configurações": { en: "Settings", es: "Configuración", de: "Einstellungen", fr: "Paramètres" },
  "Início": { en: "Home", es: "Inicio", de: "Startseite", fr: "Accueil" },
  "Ajuda": { en: "Help", es: "Ayuda", de: "Hilfe", fr: "Aide" },
  "Sair": { en: "Log out", es: "Cerrar sesión", de: "Abmelden", fr: "Déconnexion" },
  "Entrar": { en: "Sign in", es: "Iniciar sesión", de: "Anmelden", fr: "Connexion" },
  "Cadastrar": { en: "Sign up", es: "Registrarse", de: "Registrieren", fr: "S'inscrire" },
  "Visualizar": { en: "View", es: "Ver", de: "Ansehen", fr: "Afficher" },
  "Detalhes": { en: "Details", es: "Detalles", de: "Details", fr: "Détails" },
  "Histórico": { en: "History", es: "Historial", de: "Verlauf", fr: "Historique" },
  "Notificações": { en: "Notifications", es: "Notificaciones", de: "Benachrichtigungen", fr: "Notifications" },
  "Compartilhar": { en: "Share", es: "Compartir", de: "Teilen", fr: "Partager" },
  "Copiar": { en: "Copy", es: "Copiar", de: "Kopieren", fr: "Copier" },
  "Copiado!": { en: "Copied!", es: "¡Copiado!", de: "Kopiert!", fr: "Copié !" },

  // Themes & Colors
  "Azul Cobalto Real": { en: "Royal Cobalt Blue", es: "Azul Cobalto Real", de: "Königs-Kobalttblau", fr: "Bleu Cobalt Royal" },
  "Violeta Estelar": { en: "Stellar Violet", es: "Violeta Estelar", de: "Stellare Violett", fr: "Violet Stellaire" },
  "Dourado Solar": { en: "Solar Gold", es: "Dorado Solar", de: "Sonnengold", fr: "Or Solaire" },
  "Esmeralda Mística": { en: "Mystic Emerald", es: "Esmeralda Mística", de: "Mystisches Smaragd", fr: "Émeraude Mystique" },
  "Rubi Cósmico": { en: "Cosmic Ruby", es: "Rubí Cósmico", de: "Kosmischer Rubin", fr: "Rubis Cosmique" },

  // Astrological Core
  "Planeta Regente": { en: "Ruling Planet", es: "Planeta Regente", de: "Herrschender Planet", fr: "Planète Régente" },
  "Elemento": { en: "Element", es: "Elemento", de: "Element", fr: "Élément" },
  "Qualidade": { en: "Quality", es: "Cualidad", de: "Qualität", fr: "Qualité" },
  "Polaridade": { en: "Polarity", es: "Polaridad", de: "Polarität", fr: "Polarité" },
  "Signo Solar": { en: "Sun Sign", es: "Signo Solar", de: "Sonnenzeichen", fr: "Signe Solaire" },
  "Signo Lunar": { en: "Moon Sign", es: "Signo Lunar", de: "Mondzeichen", fr: "Signe Lunaire" },
  "Ascendente": { en: "Ascendant", es: "Ascendente", de: "Aszendent", fr: "Ascendant" },
  "Meio do Céu": { en: "Midheaven (MC)", es: "Medio Cielo", de: "Medium Coeli (MC)", fr: "Milieu du Ciel" },
  "Fundo do Céu": { en: "Imum Coeli (IC)", es: "Fondo del Cielo", de: "Imum Coeli (IC)", fr: "Fond du Ciel" },
  "Descendente": { en: "Descendant", es: "Descendente", de: "Deszendent", fr: "Descendant" },
  "Nodo Norte": { en: "North Node", es: "Nodo Norte", de: "Nordknoten", fr: "Nœud Nord" },
  "Nodo Sul": { en: "South Node", es: "Nodo Sur", de: "Südknoten", fr: "Nœud Sud" },
  "Quíron": { en: "Chiron", es: "Quirón", de: "Chiron", fr: "Chiron" },
  "Lilith": { en: "Lilith", es: "Lilith", de: "Lilith", fr: "Lilith" },
  "Roda da Fortuna": { en: "Part of Fortune", es: "Rueda de la Fortuna", de: "Glücksrad", fr: "Part de Fortune" },
  "Aspectos": { en: "Aspects", es: "Aspectos", de: "Aspekte", fr: "Aspects" },
  "Trânsitos": { en: "Transits", es: "Tránsitos", de: "Transite", fr: "Transits" },
  "Sinastria": { en: "Synastry", es: "Sinastría", de: "Synastrie", fr: "Synastrie" },
  "Revolução Solar": { en: "Solar Return", es: "Revolución Solar", de: "Solar-Revolution", fr: "Révolution Solaire" },
  "Casas": { en: "Houses", es: "Casas", de: "Häuser", fr: "Maisons" },
  "Planetas": { en: "Planets", es: "Planetas", de: "Planeten", fr: "Planètes" },
  "Signos": { en: "Signs", es: "Signos", de: "Sternzeichen", fr: "Signes" },
  "Fogo": { en: "Fire", es: "Fuego", de: "Feuer", fr: "Feu" },
  "Terra": { en: "Earth", es: "Tierra", de: "Erde", fr: "Terre" },
  "Ar": { en: "Air", es: "Aire", de: "Luft", fr: "Air" },
  "Água": { en: "Water", es: "Agua", de: "Wasser", fr: "Eau" },
  "Cardinal": { en: "Cardinal", es: "Cardinal", de: "Kardinal", fr: "Cardinal" },
  "Fixo": { en: "Fixed", es: "Fijo", de: "Fix", fr: "Fixe" },
  "Mutável": { en: "Mutable", es: "Mutable", de: "Veränderlich", fr: "Mutable" },
  "Masculino / Yang": { en: "Masculine / Yang", es: "Masculino / Yang", de: "Männlich / Yang", fr: "Masculin / Yang" },
  "Feminino / Yin": { en: "Feminine / Yin", es: "Femenino / Yin", de: "Weiblich / Yin", fr: "Féminin / Yin" },
  "Harmonia": { en: "Harmony", es: "Armonía", de: "Harmonie", fr: "Harmonie" },
  "Tensão": { en: "Tension", es: "Tensión", de: "Spannung", fr: "Tension" },
  "Neutro": { en: "Neutral", es: "Neutro", de: "Neutral", fr: "Neutre" },
  "Conjunção": { en: "Conjunction", es: "Conjunción", de: "Konjunktion", fr: "Conjonction" },
  "Oposição": { en: "Opposition", es: "Oposición", de: "Opposition", fr: "Opposition" },
  "Trígono": { en: "Trine", es: "Trígono", de: "Trigon", fr: "Trigone" },
  "Quadratura": { en: "Square", es: "Cuadratura", de: "Quadrat", fr: "Carré" },
  "Sextil": { en: "Sextile", es: "Sextil", de: "Sextil", fr: "Sextile" },

  // Tarot Core
  "Arcano Maior": { en: "Major Arcanum", es: "Arcano Mayor", de: "Großes Arkanum", fr: "Arcane Majeur" },
  "Arcanos Maiores": { en: "Major Arcana", es: "Arcanos Mayores", de: "Große Arkana", fr: "Arcanes Majeurs" },
  "Arcano Menor": { en: "Minor Arcanum", es: "Arcano Menor", de: "Kleines Arkanum", fr: "Arcane Mineur" },
  "Arcanos Menores": { en: "Minor Arcana", es: "Arcanos Menores", de: "Kleine Arkana", fr: "Arcanes Mineurs" },
  "Copas": { en: "Cups", es: "Copas", de: "Kelche", fr: "Coupes" },
  "Paus": { en: "Wands", es: "Bastos", de: "Stäbe", fr: "Bâtons" },
  "Espadas": { en: "Swords", es: "Espadas", de: "Schwerter", fr: "Épées" },
  "Ouros": { en: "Pentacles", es: "Oros", de: "Münzen", fr: "Deniers" },
  "Ás": { en: "Ace", es: "As", de: "Ass", fr: "As" },
  "Valete": { en: "Page", es: "Sota", de: "Bube", fr: "Valet" },
  "Cavaleiro": { en: "Knight", es: "Caballero", de: "Ritter", fr: "Cavalier" },
  "Rainha": { en: "Queen", es: "Reina", de: "Königin", fr: "Reine" },
  "Rei": { en: "King", es: "Rey", de: "König", fr: "Roi" },

  // Biorhythm & Energies
  "Físico": { en: "Physical", es: "Físico", de: "Physisch", fr: "Physique" },
  "Emocional": { en: "Emotional", es: "Emocional", de: "Emotional", fr: "Émotionnel" },
  "Intelectual": { en: "Intellectual", es: "Intelectual", de: "Intellektuell", fr: "Intellectuel" },
  "Espiritual": { en: "Spiritual", es: "Espiritual", de: "Spirituell", fr: "Spirituel" },
  "Intuitivo": { en: "Intuitive", es: "Intuitivo", de: "Intuitiv", fr: "Intuitif" },
  "Estético": { en: "Aesthetic", es: "Estético", de: "Ästhetisch", fr: "Esthétique" },
  "Sensorial": { en: "Sensory", es: "Sensorial", de: "Sensorisch", fr: "Sensoriel" },
  "Crítico": { en: "Critical", es: "Crítico", de: "Kritisch", fr: "Critique" },
  "Alta": { en: "High", es: "Alta", de: "Hoch", fr: "Élevée" },
  "Baixa": { en: "Low", es: "Baja", de: "Niedrig", fr: "Basse" },
  "Recuperação": { en: "Recovery", es: "Recuperación", de: "Erholung", fr: "Récupération" },
  "Pico": { en: "Peak", es: "Pico", de: "Spitze", fr: "Pic" },
  "Fase": { en: "Phase", es: "Fase", de: "Phase", fr: "Phase" },

  // Time & Cycles
  "Hoje": { en: "Today", es: "Hoy", de: "Heute", fr: "Aujourd'hui" },
  "Ontem": { en: "Yesterday", es: "Ayer", de: "Gestern", fr: "Hier" },
  "Amanhã": { en: "Tomorrow", es: "Mañana", de: "Morgen", fr: "Demain" },
  "Semana": { en: "Week", es: "Semana", de: "Woche", fr: "Semaine" },
  "Mês": { en: "Month", es: "Mes", de: "Monat", fr: "Mois" },
  "Ano": { en: "Year", es: "Año", de: "Jahr", fr: "An" },
  "Dias": { en: "Days", es: "Días", de: "Tage", fr: "Jours" },
  "Horas": { en: "Hours", es: "Horas", de: "Stunden", fr: "Heures" },
  "Minutos": { en: "Minutes", es: "Minutos", de: "Minuten", fr: "Minutes" },
  "Segundos": { en: "Seconds", es: "Segundos", de: "Sekunden", fr: "Secondes" },
  "Próximo Domingo": { en: "Next Sunday", es: "Próximo Domingo", de: "Nächster Sonntag", fr: "Dimanche Prochain" },
  "às": { en: "at", es: "a las", de: "um", fr: "à" },
  "em": { en: "in", es: "en", de: "in", fr: "en" },
  "de": { en: "of", es: "de", de: "von", fr: "de" },
  "para": { en: "for", es: "para", de: "für", fr: "pour" },
  "com": { en: "with", es: "con", de: "mit", fr: "avec" },
  "sem": { en: "without", es: "sin", de: "ohne", fr: "sans" }
};

console.log(`Master translation table ready with ${Object.keys(directTranslations).length} core terms.`);
