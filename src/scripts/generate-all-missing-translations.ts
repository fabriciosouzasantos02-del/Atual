import * as fs from 'fs';
import * as path from 'path';

// Master translation script for all 1008 keys to EN, ES, DE, FR
const missingKeys: string[] = JSON.parse(fs.readFileSync('keys-to-translate.json', 'utf8'));

console.log(`Starting automated translation generation for ${missingKeys.length} keys...`);

// Let's create an exhaustive translation dictionary for all keys
const masterDict: Record<string, { en: string; es: string; de: string; fr: string }> = {};

// Helper to add or build translations
function add(pt: string, en: string, es: string, de: string, fr: string) {
  masterDict[pt] = { en, es, de, fr };
}

// 1. Core Actions & UI
add("Abrir Dica Lunar Rápida", "Open Quick Lunar Tip", "Abrir Consejo Lunar Rápido", "Schnellen Mondtipp öffnen", "Ouvrir le Conseil Lunaire Rapide");
add("Sussurro Lunar Diário", "Daily Lunar Whisper", "Susurro Lunar Diario", "Tägliches Mondflüstern", "Chuchotement Lunaire Quotidien");
add("Minimizar dica", "Minimize tip", "Minimizar consejo", "Tipp minimieren", "Minimiser le conseil");
add("Foco Conectado", "Focus Connected", "Enfoque Conectado", "Fokus Verbunden", "Focus Connecté");
add("Sintonizar Freqüência", "Tune Frequency", "Sintonizar Frecuencia", "Frequenz einstimmen", "Régler la Fréquence");
add("+150 Pontos Ativados", "+150 Points Activated", "+150 Puntos Activados", "+150 Punkte Aktiviert", "+150 Points Activés");
add("Venerar Lua (+150 pts)", "Honor Moon (+150 pts)", "Venerar Luna (+150 pts)", "Mond ehren (+150 Pkt)", "Vénérer la Lune (+150 pts)");
add("Monitor em Tempo Real", "Real-Time Monitor", "Monitor en Tiempo Real", "Echtzeit-Monitor", "Moniteur en Temps Réel");
add("Seus Trânsitos Horários e Energias do Dia", "Your Hourly Transits and Daily Energies", "Tus Tránsitos Horarios y Energías del Día", "Ihre stündlichen Transite und Tagesenergien", "Vos Transits Horaires et Énergies du Jour");
add("Análise de como os planetas flutuam sobre sua composição natal de nascimento.", "Analysis of how planets transit over your natal birth composition.", "Análisis de cómo los planetas transitan sobre tu composición natal de nacimiento.", "Analyse, wie Planeten über Ihre Geburtskonstellation wandern.", "Analyse de la façon dont les planètes transitent sur votre composition natale.");
add("Sincronizado: Hoje", "Synchronized: Today", "Sincronizado: Hoy", "Synchronisiert: Heute", "Synchronisé : Aujourd'hui");
add("Planetas Transitando no Céu", "Planets Transiting in the Sky", "Planetas Transitando en el Cielo", "Am Himmel wandernde Planeten", "Planètes en Transit dans le Ciel");
add("Pontuações Celestes Planas", "Flat Celestial Scores", "Puntuaciones Celestes Planas", "Flache Himmelswerte", "Scores Célestes Plats");
add("Criatividade e Alinhamento", "Creativity and Alignment", "Creatividad y Alineación", "Kreativität und Ausrichtung", "Créativité et Alignement");
add("Diálogo e Escrita", "Dialogue and Writing", "Diálogo y Escritura", "Dialog und Schreiben", "Dialogue et Écriture");
add("Vontade Física e Esporte", "Physical Drive and Sport", "Impulso Físico y Deporte", "Körperlicher Antrieb und Sport", "Élan Physique et Sport");
add("Dica do Oráculo:", "Oracle Tip:", "Consejo del Oráculo:", "Orakel-Tipp:", "Conseil de l'Oracle :");
add("Hoje o fluxo solar favorece a revisão estrutural. Ótimo período para finalizar escritos e praticar interiorizações sem pressões externas deletérias.", "Today solar flow favors structural review. Great time to finalize writings and engage in inner reflection without harmful external pressure.", "Hoy el flujo solar favorece la revisión estructural. Gran momento para finalizar escritos y practicar la introspección sin presiones externas perjudiciales.", "Heute begünstigt der Sonnenfluss die strukturelle Überprüfung. Tolle Zeit, um Texte fertigzustellen und innere Einkehr ohne schädlichen äußeren Druck zu praktizieren.", "Aujourd'hui, le flux solaire favorise la révision structurelle. Moment idéal pour finaliser des écrits et pratiquer l'introspection sans pressions externes nocives.");
add("Nenhum dado estelar calculado para esta categoria.", "No stellar data calculated for this category.", "No hay datos estelares calculados para esta categoría.", "Keine Sternendaten für diese Kategorie berechnet.", "Aucune donnée stellaire calculée pour cette catégorie.");
add("*O layout é auditado dinamicamente para garantir áreas de toque mínimas de 44px e evitar transbordamento de grid lateral em iPhones SE ou telas amplas.", "*The layout is dynamically audited to ensure minimum touch targets of 44px and avoid side grid overflow on iPhone SE or wide screens.", "*El diseño se audita dinámicamente para garantizar áreas táctiles mínimas de 44 px y evitar desbordamientos laterales en iPhone SE o pantallas anchas.", "*Das Layout wird dynamisch geprüft, um Mindest-Touch-Bereiche von 44px zu gewährleisten und seitliches Überlaufen auf iPhone SE oder breiten Bildschirmen zu verhindern.", "*La mise en page est auditée dynamiquement pour garantir des zones tactiles minimales de 44px et éviter tout débordement latéral sur iPhone SE ou écrans larges.");
add("1. Carregar Templates Rápidos de Email / SMS", "1. Load Quick Email / SMS Templates", "1. Cargar Plantillas Rápidas de Email / SMS", "1. Schnelle E-Mail- / SMS-Vorlagen laden", "1. Charger les Modèles Rapides d'E-mail / SMS");
add("1. Mapa de Harmonia de", "1. Harmony Chart of", "1. Mapa de Armonía de", "1. Harmoniekarte von", "1. Carte d'Harmonie de");
add("10. Pontos Ocultos & Ligações Kármicas", "10. Hidden Points & Karmic Connections", "10. Puntos Ocultos y Conexiones Kármicas", "10. Verborgene Punkte & Karmische Verbindungen", "10. Points Cachés & Connexions Karmiques");
add("11. Inteligência de Relacionamento Cósmico", "11. Cosmic Relationship Intelligence", "11. Inteligencia de Relaciones Cósmicas", "11. Kosmische Beziehungsintelligenz", "11. Intelligence Relationnelle Cosmique");
add("15.4 KB Usados", "15.4 KB Used", "15.4 KB Usados", "15.4 KB Verwendet", "15.4 Ko Utilisés");
add("2. Análise Detalhada Estelar", "2. Detailed Stellar Analysis", "2. Análisis Detallado Estelar", "2. Detaillierte Sternenanalyse", "2. Analyse Stellaire Détaillée");
add("2. Construir Alerta Personalizado", "2. Build Custom Alert", "2. Construir Alerta Personalizada", "2. Benutzerdefinierte Benachrichtigung erstellen", "2. Créer une Alerte Personnalisée");
add("4. Resumo de Compatibilidades Detalhadas", "4. Detailed Compatibility Summary", "4. Resumen de Compatibilidades Detalladas", "4. Detaillierte Kompatibilitätsübersicht", "4. Résumé Détaillé des Compatibilités");
add("6. Calendário & Ciclos de Tendências Futuras", "6. Calendar & Future Trend Cycles", "6. Calendario y Ciclos de Tendencias Futuras", "6. Kalender & Zukünftige Trendzyklen", "6. Calendrier & Cycles de Tendances Futures");
add("7. Dias Favoráveis Reais Calculados", "7. Calculated Real Favorable Days", "7. Días Favorables Reales Calculados", "7. Berechnete Reale Günstige Tage", "7. Jours Favorables Réels Calculés");
add("8 pessoas já curtiram o seu perfil", "8 people already liked your profile", "A 8 personas ya les gustó tu perfil", "8 Personen haben Ihr Profil bereits geliked", "8 personnes ont déjà aimé votre profil");
add("8. Dias de Atenção & Cautela Cósmica", "8. Cosmic Caution & Attention Days", "8. Días de Atención y Cautela Cósmica", "8. Tage für Kosmische Achtsamkeit & Vorsicht", "8. Jours d'Attention & Prudence Cosmique");
add("9. Visão Estelar de Longo Prazo", "9. Long-Term Stellar Vision", "9. Visión Estelar a Largo Plazo", "9. Langfristige Sternenvision", "9. Vision Stellaire à Long Terme");

console.log(`Pre-seeded ${Object.keys(masterDict).length} master translations.`);
