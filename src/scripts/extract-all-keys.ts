import * as fs from 'fs';
import * as path from 'path';

import { autoAuditPatch } from '../lib/autoAuditPatch';
import { commonTranslations } from '../i18n/common';
import { profileTranslations } from '../i18n/profile';
import { astrologyTranslations } from '../i18n/astrology';
import { tarotTranslations } from '../i18n/tarot';
import { dreamsTranslations } from '../i18n/dreams';
import { missionsTranslations } from '../i18n/missions';
import { settingsTranslations } from '../i18n/settings';
import { notificationsTranslations } from '../i18n/notifications';
import { compatibilityTranslations } from '../i18n/compatibility';
import { chartsTranslations } from '../i18n/charts';
import { onboardingTranslations } from '../i18n/onboarding';
import { numerologyTranslations } from '../i18n/numerology';
import { orbiaTranslations } from '../i18n/orbia';
import { serverTranslations } from '../i18n/server';
import { landingTranslations } from '../i18n/landing';
import { customFeaturesTranslations } from '../i18n/customFeatures';
import { dynamicContentTranslations } from '../i18n/dynamicContent';
import { cupidoTranslations } from '../i18n/cupido';
import { uiTranslations } from '../i18n/ui';
import { localLangDict } from '../lib/locales';
import { uiTranslationsMultilang } from '../components/numerologyTranslations';

const modules = [
  commonTranslations,
  profileTranslations,
  astrologyTranslations,
  tarotTranslations,
  dreamsTranslations,
  missionsTranslations,
  settingsTranslations,
  notificationsTranslations,
  compatibilityTranslations,
  chartsTranslations,
  onboardingTranslations,
  numerologyTranslations,
  orbiaTranslations,
  serverTranslations,
  landingTranslations,
  customFeaturesTranslations,
  dynamicContentTranslations,
  cupidoTranslations,
  uiTranslations,
  localLangDict as any,
  uiTranslationsMultilang as any
];

const merged: Record<string, Record<string, string>> = { pt: {}, en: {}, es: {}, de: {}, fr: {} };
for (const lang of ["pt", "en", "es", "de", "fr"]) {
  for (const m of modules) {
    if (m && m[lang]) Object.assign(merged[lang], m[lang]);
  }
}

// Collect all unique keys in autoAuditPatch + base modules
const allUniqueKeys = Array.from(new Set([
  ...Object.keys(autoAuditPatch.en || {}),
  ...Object.keys(merged.pt)
]));

console.log(`Found ${allUniqueKeys.length} total unique keys across the application.`);

fs.writeFileSync('all-app-keys.json', JSON.stringify(allUniqueKeys, null, 2));
