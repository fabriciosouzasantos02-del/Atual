import * as fs from 'fs';
import * as path from 'path';

// Master comprehensive translation script for Portal Órbita
// Translates all 1266 keys in autoAuditPatch + 2744 keys in mergedTranslations

import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

const allAutoKeys = Object.keys(autoAuditPatch.en || {});
const allMergedPtKeys = Object.keys(mergedTranslations.pt || {});
const uniqueKeys = Array.from(new Set([...allAutoKeys, ...allMergedPtKeys]));

console.log(`Master translation processing ${uniqueKeys.length} keys...`);

// Let's create an exhaustive translation mapping for all domain terminology
const translationDb: Record<string, { en: string; es: string; de: string; fr: string }> = {};

// Register known translations from all i18n modules
const languages = ['en', 'es', 'de', 'fr'] as const;
for (const lang of languages) {
  const dict = mergedTranslations[lang] || {};
  for (const [k, v] of Object.entries(dict)) {
    if (v && v !== k && v !== mergedTranslations.pt[k] && v.length > 2) {
      if (!translationDb[k]) {
        translationDb[k] = { en: '', es: '', de: '', fr: '' };
      }
      translationDb[k][lang] = v;
    }
  }
}

console.log(`Pre-seeded ${Object.keys(translationDb).length} existing valid translations.`);
