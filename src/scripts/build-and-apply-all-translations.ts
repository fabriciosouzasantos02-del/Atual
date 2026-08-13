import * as fs from 'fs';
import * as path from 'path';

// Master comprehensive translation builder for all untranslated keys
import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

// Let's create an exhaustive translation mapping
const ptKeys = Object.keys(mergedTranslations.pt);
console.log(`Total PT base keys: ${ptKeys.length}`);

// We will construct complete en, es, de, fr dictionaries
const outputPatch: Record<'en' | 'es' | 'de' | 'fr', Record<string, string>> = {
  en: {},
  es: {},
  de: {},
  fr: {}
};

// Seed existing good translations from autoAuditPatch and mergedTranslations
for (const lang of ['en', 'es', 'de', 'fr'] as const) {
  const mergedLang = mergedTranslations[lang] || {};
  const autoLang = autoAuditPatch[lang] || {};
  
  for (const k of ptKeys) {
    if (mergedLang[k] && mergedLang[k] !== k && mergedLang[k] !== mergedTranslations.pt[k]) {
      outputPatch[lang][k] = mergedLang[k];
    } else if (autoLang[k] && autoLang[k] !== k && autoLang[k] !== mergedTranslations.pt[k]) {
      outputPatch[lang][k] = autoLang[k];
    }
  }
}

console.log("Seeded known good translations:");
console.log(`en: ${Object.keys(outputPatch.en).length}`);
console.log(`es: ${Object.keys(outputPatch.es).length}`);
console.log(`de: ${Object.keys(outputPatch.de).length}`);
console.log(`fr: ${Object.keys(outputPatch.fr).length}`);
