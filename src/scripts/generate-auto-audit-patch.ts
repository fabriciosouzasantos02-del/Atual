import * as fs from 'fs';
import * as path from 'path';

// Master dictionary of phrases for autoAuditPatch
import { autoAuditPatch } from '../lib/autoAuditPatch';

const keys = Object.keys(autoAuditPatch.en || {});
console.log(`Translating ${keys.length} keys...`);

// High accuracy translations for the 1266 keys
const translations: Record<'en' | 'es' | 'de' | 'fr', Record<string, string>> = {
  en: {},
  es: {},
  de: {},
  fr: {}
};

// Common dictionary for astrological, tarot, biorhythm, UI and prompt words
const dict: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "Original": { en: "Original", es: "Original", de: "Original", fr: "Original" },
  "Visionário": { en: "Visionary", es: "Visionario", de: "Visionär", fr: "Visionnaire" },
  "Idealista": { en: "Idealist", es: "Idealista", de: "Idealist", fr: "Idéaliste" },
  "Diagrama do firmamento no nascimento": { en: "Diagram of the firmament at birth", es: "Diagrama del firmamento al nacer", de: "Diagramm des Himmelsgewölbes bei der Geburt", fr: "Diagramme du firmament à la naissance" },
  "1. Distribuição dos Elementos": { en: "1. Distribution of Elements", es: "1. Distribución de los Elementos", de: "1. Verteilung der Elemente", fr: "1. Répartition des Éléments" },
  "Fogo (Entusiasmo & Energia)": { en: "Fire (Enthusiasm & Energy)", es: "Fuego (Entusiasmo y Energía)", de: "Feuer (Enthusiasmus & Energie)", fr: "Feu (Enthousiasme & Énergie)" },
  "Terra (Praticidade & Conquistas)": { en: "Earth (Practicality & Achievements)", es: "Tierra (Practicidad y Logros)", de: "Erde (Praxisnähe & Erfolge)", fr: "Terre (Pragmatisme & Réalisations)" },
  "Ar (Mente, Lógica & Comunicação)": { en: "Air (Mind, Logic & Communication)", es: "Aire (Mente, Lógica y Comunicación)", de: "Luft (Geist, Logik & Kommunikation)", fr: "Air (Esprit, Logique & Communication)" },
  "Água (Sensibilidade & Intuição)": { en: "Water (Sensitivity & Intuition)", es: "Agua (Sensibilidad e Intuición)", de: "Wasser (Sensibilität & Intuition)", fr: "Eau (Sensibilité & Intuition)" },
  "2. Qualidades Astrológicas": { en: "2. Astrological Qualities", es: "2. Cualidades Astrológicas", de: "2. Astrologische Qualitäten", fr: "2. Qualités Astrologiques" },
  "Cardinal": { en: "Cardinal", es: "Cardinal", de: "Kardinal", fr: "Cardinal" },
  "Iniciativa & Ação": { en: "Initiative & Action", es: "Iniciativa y Acción", de: "Initiative & Handlung", fr: "Initiative & Action" },
  "Fixo": { en: "Fixed", es: "Fijo", de: "Fix", fr: "Fixe" },
  "Estabilidade & Foco": { en: "Stability & Focus", es: "Estabilidad y Enfoque", de: "Stabilität & Fokus", fr: "Stabilité & Concentration" },
  "Mutável": { en: "Mutable", es: "Mutable", de: "Veränderlich", fr: "Mutable" },
  "Adaptabilidade": { en: "Adaptability", es: "Adaptabilidad", de: "Anpassungsfähigkeit", fr: "Adaptabilité" },
  "3. Polaridade Energética": { en: "3. Energy Polarity", es: "3. Polaridad Energética", de: "3. Energiepolarität", fr: "3. Polarité Énergétique" },
  "Ativo / Yang": { en: "Active / Yang", es: "Activo / Yang", de: "Aktiv / Yang", fr: "Actif / Yang" },
  "Reativo / Yin": { en: "Reactive / Yin", es: "Reactivo / Yin", de: "Reaktiv / Yin", fr: "Réactif / Yin" },
  "Potencial de Coexistência:": { en: "Coexistence Potential:", es: "Potencial de Coexistencia:", de: "Koexistenz-Potenzial:", fr: "Potentiel de Coexistence :" },
  "Socialmente consciente": { en: "Socially conscious", es: "Socialmente consciente", de: "Sozial bewusst", fr: "Socialement conscient" },
  "Inventivo": { en: "Inventive", es: "Inventivo", de: "Erfinderisch", fr: "Inventif" },
  "Esperançoso": { en: "Hopeful", es: "Esperanzado", de: "Hoffnungsvoll", fr: "Plein d'espoir" },
  "Amigável": { en: "Friendly", es: "Amigable", de: "Freundlich", fr: "Amical" },
  "Curioso": { en: "Curious", es: "Curioso", de: "Neugierig", fr: "Curieux" },
  "Temperamental": { en: "Temperamental", es: "Temperamental", de: "Temperamentvoll", fr: "Tempéramental" },
  "Disperso": { en: "Scattered", es: "Disperso", de: "Zerstreut", fr: "Dispersé" },
  "Imprevisível": { en: "Unpredictable", es: "Impredecible", de: "Unberechenbar", fr: "Imprévisible" },
  "Teimoso": { en: "Stubborn", es: "Obstinado", de: "Stur", fr: "Têtu" },
  "Independente": { en: "Independent", es: "Independiente", de: "Unabhängig", fr: "Indépendant" },
  "Inquieto": { en: "Restless", es: "Inquieto", de: "Rastlos", fr: "Inquiet" },
  "A Balança Astrológica": { en: "The Astrological Scale", es: "La Balanza Astrológica", de: "Die Astrologische Waage", fr: "La Balance Astrologique" },
  "DNA Astral & Pesos de Personalidade": { en: "Astral DNA & Personality Weights", es: "ADN Astral y Pesos de Personalidad", de: "Astrale DNA & Persönlichkeitsgewichte", fr: "ADN Astral & Poids de Personnalité" },
  "Signos": { en: "Signs", es: "Signos", de: "Sternzeichen", fr: "Signes" },
  "Casas": { en: "Houses", es: "Casas", de: "Häuser", fr: "Maisons" },
  "Planetas": { en: "Planets", es: "Planetas", de: "Planeten", fr: "Planètes" },
  "Força": { en: "Strength", es: "Fuerza", de: "Stärke", fr: "Force" },
  "Harmonia": { en: "Harmony", es: "Armonía", de: "Harmonie", fr: "Harmonie" },
  "Comparar Mapas": { en: "Compare Charts", es: "Comparar Cartas", de: "Horoskope vergleichen", fr: "Comparer les Thèmes" },
  "🔮 Mapa Principal Ativo": { en: "🔮 Active Main Chart", es: "🔮 Carta Principal Activa", de: "🔮 Aktives Haupthoroskop", fr: "🔮 Thème Principal Actif" },
  "Nascimento:": { en: "Birth:", es: "Nacimiento:", de: "Geburt:", fr: "Naissance :" },
  "às": { en: "at", es: "a las", de: "um", fr: "à" },
  "em": { en: "in", es: "en", de: "in", fr: "en" },
  "Não informado": { en: "Not informed", es: "No informado", de: "Nicht angegeben", fr: "Non renseigné" },
  "Preencha as informações abaixo com os dados da pessoa que você deseja comparar com seu mapa principal.": {
    en: "Fill in the information below with the details of the person you want to compare with your main chart.",
    es: "Complete la información a continuación con los datos de la persona que desea comparar con su carta principal.",
    de: "Geben Sie unten die Daten der Person ein, die Sie mit Ihrem Haupthoroskop vergleichen möchten.",
    fr: "Remplissez les informations ci-dessous avec les données de la personne que vous souhaitez comparer avec votre thème principal."
  },
  "Dados da outra pessoa": { en: "Other person details", es: "Datos de la otra persona", de: "Angaben der anderen Person", fr: "Informations sur l'autre personne" },
  "NOME DA PESSOA": { en: "PERSON NAME", es: "NOMBRE DE LA PERSONA", de: "NAME DER PERSON", fr: "NOM DE LA PERSONNE" },
  "Nome completo": { en: "Full name", es: "Nombre completo", de: "Vollständiger Name", fr: "Nom complet" },
  "DATA DE NASCIMENTO": { en: "DATE OF BIRTH", es: "FECHA DE NACIMIENTO", de: "GEBURTSDATUM", fr: "DATE DE NAISSANCE" },
  "HORA DE NASCIMENTO": { en: "TIME OF BIRTH", es: "HORA DE NACIMIENTO", de: "GEBURTSZEIT", fr: "HEURE DE NAISSANCE" },
  "CIDADE E PAÍS DE NASCIMENTO": { en: "CITY AND COUNTRY OF BIRTH", es: "CIUDAD Y PAÍS DE NACIMIENTO", de: "GEBURTSSTADT UND -LAND", fr: "VILLE ET PAYS DE NAISSANCE" },
  "Cidade e país de nascimento": { en: "City and country of birth", es: "Ciudad y país de nacimiento", de: "Geburtsstadt und -land", fr: "Ville et pays de naissance" },
  "Efetuar Cruzamento de Mapas": { en: "Perform Chart Cross-Analysis", es: "Efectuar Cruzamiento de Cartas", de: "Horoskop-Abgleich durchführen", fr: "Effectuer le Croisement des Thèmes" },
  "Efetuando Alinhamento...": { en: "Performing Alignment...", es: "Efectuando Alineación...", de: "Ausrichtung wird durchgeführt...", fr: "Alignement en cours..." }
};

console.log('Generating autoAuditPatch...');
