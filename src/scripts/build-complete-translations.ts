import * as fs from 'fs';
import * as path from 'path';

// Load keys from autoAuditPatch and untranslated list
import { autoAuditPatch } from '../lib/autoAuditPatch';
import { mergedTranslations } from '../i18n';

console.log('Building comprehensive 5-language translations...');

// We have 1266 keys in autoAuditPatch + any other keys in mergedTranslations.pt
const allKeys = Array.from(new Set([
  ...Object.keys(autoAuditPatch.en || {}),
  ...Object.keys(mergedTranslations.pt || {})
]));

console.log(`Processing ${allKeys.length} total keys for en, es, de, fr...`);
