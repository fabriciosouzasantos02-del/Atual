import * as fs from 'fs';
import * as path from 'path';

// Let's create an exhaustive translation mapping for the remaining untranslated keys
// All domain terms: Astrological positions, Tarot cards, Biorhythm states, Settings, Profile, Onboarding, Cupido, Missions, Synastry
import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

const ptKeys = Object.keys(mergedTranslations.pt);
console.log(`Building full translations for ${ptKeys.length} total PT keys...`);

// Let's build full translated dictionaries for en, es, de, fr
const fullPatch: Record<'en' | 'es' | 'de' | 'fr', Record<string, string>> = {
  en: {},
  es: {},
  de: {},
  fr: {}
};

// Seed existing good translations from mergedTranslations and autoAuditPatch
for (const lang of ['en', 'es', 'de', 'fr'] as const) {
  const merged = mergedTranslations[lang] || {};
  const auto = autoAuditPatch[lang] || {};

  for (const k of ptKeys) {
    if (merged[k] && merged[k] !== k && merged[k] !== mergedTranslations.pt[k]) {
      fullPatch[lang][k] = merged[k];
    } else if (auto[k] && auto[k] !== k && auto[k] !== mergedTranslations.pt[k]) {
      fullPatch[lang][k] = auto[k];
    }
  }
}

console.log("Existing translations before expansion:");
console.log("en:", Object.keys(fullPatch.en).length);
console.log("es:", Object.keys(fullPatch.es).length);
console.log("de:", Object.keys(fullPatch.de).length);
console.log("fr:", Object.keys(fullPatch.fr).length);
