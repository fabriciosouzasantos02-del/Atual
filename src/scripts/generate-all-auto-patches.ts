import * as fs from 'fs';
import * as path from 'path';

// Master translation dictionary mapping each of the 1266 keys in autoAuditPatch
// to proper English, Spanish, German, and French.

import { autoAuditPatch } from '../lib/autoAuditPatch';
import { tarotTranslations } from '../i18n/tarot';
import { commonTranslations } from '../i18n/common';
import { profileTranslations } from '../i18n/profile';
import { astrologyTranslations } from '../i18n/astrology';

const allKeys = Object.keys(autoAuditPatch.en);
console.log(`Building full translations for ${allKeys.length} keys...`);

// Let's create an output dictionary
const translatedPatch: Record<'en' | 'es' | 'de' | 'fr', Record<string, string>> = {
  en: {},
  es: {},
  de: {},
  fr: {}
};

// Check if a translation is already in tarot, common, profile, astrology
for (const lang of ['en', 'es', 'de', 'fr'] as const) {
  const sources = [
    tarotTranslations[lang] || {},
    commonTranslations[lang] || {},
    profileTranslations[lang] || {},
    astrologyTranslations[lang] || {}
  ];
  
  for (const key of allKeys) {
    for (const src of sources) {
      if (src[key] && src[key] !== key && src[key] !== autoAuditPatch.en[key]) {
        translatedPatch[lang][key] = src[key];
        break;
      }
    }
  }
  console.log(`Lang ${lang}: resolved ${Object.keys(translatedPatch[lang]).length} from existing modules.`);
}
