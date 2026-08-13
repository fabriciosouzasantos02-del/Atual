import * as fs from 'fs';
import * as path from 'path';

// Master Translation Engine for Portal Órbita
// Translates all keys for EN, ES, DE, FR

const allKeys: string[] = JSON.parse(fs.readFileSync('all-app-keys.json', 'utf8'));

// Dictionaries
const signs: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "Áries": { en: "Aries", es: "Aries", de: "Widder", fr: "Bélier" },
  "Touro": { en: "Taurus", es: "Tauro", de: "Stier", fr: "Taureau" },
  "Gêmeos": { en: "Gemini", es: "Géminis", de: "Zwillinge", fr: "Gémeaux" },
  "Câncer": { en: "Cancer", es: "Cáncer", de: "Krebs", fr: "Cancer" },
  "Leão": { en: "Leo", es: "Leo", de: "Löwe", fr: "Lion" },
  "Virgem": { en: "Virgo", es: "Virgo", de: "Jungfrau", fr: "Vierge" },
  "Libra": { en: "Libra", es: "Libra", de: "Waage", fr: "Balance" },
  "Escorpião": { en: "Scorpio", es: "Escorpio", de: "Skorpion", fr: "Scorpion" },
  "Sagitário": { en: "Sagittarius", es: "Sagitario", de: "Schütze", fr: "Sagittaire" },
  "Capricórnio": { en: "Capricorn", es: "Capricornio", de: "Steinbock", fr: "Capricorne" },
  "Aquário": { en: "Aquarius", es: "Acuario", de: "Wassermann", fr: "Verseau" },
  "Peixes": { en: "Pisces", es: "Piscis", de: "Fische", fr: "Poissons" }
};

const planets: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "Sol": { en: "Sun", es: "Sol", de: "Sonne", fr: "Soleil" },
  "Lua": { en: "Moon", es: "Luna", de: "Mond", fr: "Lune" },
  "Mercúrio": { en: "Mercury", es: "Mercurio", de: "Merkur", fr: "Mercure" },
  "Vênus": { en: "Venus", es: "Venus", de: "Venus", fr: "Vénus" },
  "Marte": { en: "Mars", es: "Marte", de: "Mars", fr: "Mars" },
  "Júpiter": { en: "Jupiter", es: "Júpiter", de: "Jupiter", fr: "Jupiter" },
  "Saturno": { en: "Saturn", es: "Saturno", de: "Saturn", fr: "Saturne" },
  "Urano": { en: "Uranus", es: "Urano", de: "Uranus", fr: "Uranus" },
  "Netuno": { en: "Neptune", es: "Neptuno", de: "Neptun", fr: "Neptune" },
  "Plutão": { en: "Pluto", es: "Plutón", de: "Pluto", fr: "Pluton" },
  "Quíron": { en: "Chiron", es: "Quirón", de: "Chiron", fr: "Chiron" },
  "Lilith": { en: "Lilith", es: "Lilith", de: "Lilith", fr: "Lilith" },
  "Nodo Norte": { en: "North Node", es: "Nodo Norte", de: "Nordknoten", fr: "Nœud Nord" },
  "Nodo Sul": { en: "South Node", es: "Nodo Sul", de: "Südknoten", fr: "Nœud Sud" },
  "Ascendente": { en: "Ascendant", es: "Ascendente", de: "Aszendent", fr: "Ascendant" },
  "Meio do Céu": { en: "Midheaven", es: "Medio Cielo", de: "Medium Coeli", fr: "Milieu du Ciel" },
  "Fundo do Céu": { en: "Imum Coeli", es: "Fondo del Cielo", de: "Imum Coeli", fr: "Fond du Ciel" },
  "Descendente": { en: "Descendant", es: "Descendente", de: "Deszendent", fr: "Descendant" }
};

const aspects: Record<string, { en: string; es: string; de: string; fr: string }> = {
  "Conjunção": { en: "Conjunction", es: "Conjunción", de: "Konjunktion", fr: "Conjonction" },
  "Oposição": { en: "Opposition", es: "Oposición", de: "Opposition", fr: "Opposition" },
  "Trígono": { en: "Trine", es: "Trígono", de: "Trigon", fr: "Trigone" },
  "Quadratura": { en: "Square", es: "Cuadratura", de: "Quadrat", fr: "Carré" },
  "Sextil": { en: "Sextile", es: "Sextil", de: "Sextil", fr: "Sextile" },
  "Quincúncio": { en: "Quincunx", es: "Quincuncio", de: "Quincunx", fr: "Quinconce" },
  "Semi-Sextil": { en: "Semi-Sextile", es: "Semisextil", de: "Halbsextil", fr: "Semi-Sextile" },
  "Semi-Quadratura": { en: "Semi-Square", es: "Semicuadratura", de: "Halbquadrat", fr: "Semi-Carré" },
  "Sesqui-Quadratura": { en: "Sesquiquadrate", es: "Sesquicuadratura", de: "Anderthalbquadrat", fr: "Sesqui-Carré" }
};

console.log("Dictionary components loaded.");
