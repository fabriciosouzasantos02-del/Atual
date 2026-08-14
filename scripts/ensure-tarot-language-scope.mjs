import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve(process.cwd(), 'src/TarotSystem.tsx');
const source = fs.readFileSync(file, 'utf8');

const marker = "  const { t: i18nT } = useTranslation();\n";
const replacement = `  const { t: i18nT, i18n } = useTranslation();\n  // Single normalized language authority for Tarot: same active i18n language used by the application.\n  const rawTarotLang = lang || i18n.language || 'pt';\n  const normalizedTarotLang = rawTarotLang.toLowerCase().split('-')[0].split('_')[0];\n  const activeLang: Language = ['pt', 'en', 'es', 'de', 'fr'].includes(normalizedTarotLang)\n    ? normalizedTarotLang as Language\n    : 'pt';\n`;

let output = source;
if (!output.includes("const activeLang: Language =")) {
  if (!output.includes(marker)) {
    throw new Error('[Tarot i18n guard] Expected useTranslation marker was not found. Aborting without changes.');
  }
  output = output.replace(marker, replacement);
}

const inner = "    const activeLang = (lang || 'pt').toLowerCase().split('-')[0];\n";
if (output.includes(inner)) output = output.replace(inner, '');

output = output.replace(
  "headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ count, lang }),",
  "headers: { 'Content-Type': 'application/json', 'x-app-lang': activeLang },\n        body: JSON.stringify({ count, lang: activeLang }),"
);
output = output.replace(
  "headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({\n          type: activeMode,",
  "headers: { 'Content-Type': 'application/json', 'x-app-lang': activeLang },\n        body: JSON.stringify({\n          type: activeMode,"
);
output = output.replace("          lang\n        }),", "          lang: activeLang\n        }),");

output = output.replace(
  "      } else {\n        throw new Error();\n      }",
  "      } else {\n        let detail = '';\n        try {\n          const errorData = await res.json();\n          detail = errorData?.error || errorData?.message || '';\n        } catch {\n          // Keep the UI fallback path for non-JSON error responses.\n        }\n        throw new Error(`Tarot interpretation request failed (${res.status})${detail ? `: ${detail}` : ''}`);\n      }"
);

if (!output.includes("const activeLang: Language =")) {
  throw new Error('[Tarot i18n guard] Final source still has no component-scoped activeLang.');
}
if (output.includes(inner)) {
  throw new Error('[Tarot i18n guard] Inner shadowing activeLang remains.');
}
if (!output.includes("'x-app-lang': activeLang")) {
  throw new Error('[Tarot i18n guard] Tarot API language propagation was not installed.');
}

if (output !== source) {
  fs.writeFileSync(file, output, 'utf8');
  console.log('[Tarot i18n guard] Applied verified Tarot language-scope/API propagation fix.');
} else {
  console.log('[Tarot i18n guard] Tarot language fix already present; no changes required.');
}
