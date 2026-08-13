import { Language } from './types';
import { commonTranslations } from './common';
import { profileTranslations } from './profile';
import { astrologyTranslations } from './astrology';
import { tarotTranslations } from './tarot';
import { dreamsTranslations } from './dreams';
import { missionsTranslations } from './missions';
import { settingsTranslations } from './settings';
import { notificationsTranslations } from './notifications';
import { compatibilityTranslations } from './compatibility';
import { chartsTranslations } from './charts';
import { onboardingTranslations } from './onboarding';
import { numerologyTranslations } from './numerology';
import { orbiaTranslations } from './orbia';
import { serverTranslations } from './server';
import { landingTranslations } from './landing';
import { customFeaturesTranslations } from './customFeatures';
import { dynamicContentTranslations } from './dynamicContent';
import { cupidoTranslations } from './cupido';
import { uiTranslations } from './ui';
import { localLangDict } from '../lib/locales';
import { uiTranslationsMultilang } from '../components/numerologyTranslations';

// Collection of all registered translation modules
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
  localLangDict as unknown as Record<Language, Record<string, string>>,
  uiTranslationsMultilang as Record<Language, Record<string, string>>
];

// Automatically merged single official source of truth
export const mergedTranslations: Record<Language, Record<string, string>> = {
  pt: {},
  en: {},
  es: {},
  de: {},
  fr: {}
};

// Merge all module objects cleanly at runtime
const languages: Language[] = ['pt', 'en', 'es', 'de', 'fr'];
for (const lang of languages) {
  for (const mod of modules) {
    if (mod && mod[lang]) {
      Object.assign(mergedTranslations[lang], mod[lang]);
    }
  }
}

import { applyTranslationPatches } from '../lib/translationPatch';
try {
  applyTranslationPatches(mergedTranslations);
} catch (e) {
  console.warn('Note: applyTranslationPatches deferred or already merged.');
}

import i18next from 'i18next';

export function getDeviceLanguage(): Language {
  // Respecting strict single authority rule: fallback is 'pt'
  return 'pt';
}

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'pt';

  // Check if user explicitly chose a language in application settings
  const explicitSaved = localStorage.getItem('orbi_user_explicit_lang') || 
                        localStorage.getItem('orbi_preferred_language') ||
                        localStorage.getItem('idioma_preferido_orbi') ||
                        localStorage.getItem('i18nextLng');
  if (explicitSaved) {
    const clean = explicitSaved.trim().toLowerCase().split('-')[0];
    if (['pt', 'en', 'es', 'de', 'fr'].includes(clean)) {
      return clean as Language;
    }
  }

  // Deterministic default language authority is Portuguese
  return 'pt';
}

export function changeLanguage(novoIdioma: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('orbi_user_explicit_lang', novoIdioma);
    localStorage.setItem('orbi_preferred_language', novoIdioma);
    localStorage.setItem('idioma_preferido_orbi', novoIdioma);
    localStorage.setItem('i18nextLng', novoIdioma);
    
    // Prevent browser auto-translation interference
    document.documentElement.lang = novoIdioma;
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    
    try {
      // Dispatch global change event for UI re-rendering
      window.dispatchEvent(new Event('orbi_language_changed'));
    } catch (e) {
      console.error('Error dispatching language change event:', e);
    }
  }
  i18next.changeLanguage(novoIdioma);
}

// Verification function to ensure a key exists across all languages (enforces translation completeness)
export function verifyTranslationKeys(): string[] {
  const ptKeys = Object.keys(mergedTranslations.pt);
  const errors: string[] = [];
  
  for (const key of ptKeys) {
    for (const lang of languages) {
      if (!mergedTranslations[lang][key]) {
        errors.push(`Missing translation key: "${key}" in language "${lang}"`);
      }
    }
  }
  return errors;
}
