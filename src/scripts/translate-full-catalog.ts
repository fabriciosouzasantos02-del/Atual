import * as fs from 'fs';
import * as path from 'path';

// Let's create an exhaustive translation mapping for the remaining untranslated keys
// All domain terms: Astrological positions, Tarot cards, Biorhythm states, Settings, Profile, Onboarding, Cupido, Missions, Synastry

interface Translation {
  en: string;
  es: string;
  de: string;
  fr: string;
}

const catalog: Record<string, Translation> = {
  // Common Navigation and Badges
  "PRO": { en: "PRO", es: "PRO", de: "PRO", fr: "PRO" },
  "History": { en: "History", es: "Historial", de: "Verlauf", fr: "Historique" },
  "Tasks": { en: "Tasks", es: "Tareas", de: "Aufgaben", fr: "Tâches" },
  "POMODORO": { en: "POMODORO", es: "POMODORO", de: "POMODORO", fr: "POMODORO" },
  "FOCUS": { en: "FOCUS", es: "ENFOQUE", de: "FOKUS", fr: "FOCUS" },
  "Start": { en: "Start", es: "Iniciar", de: "Starten", fr: "Démarrer" },
  "Reset": { en: "Reset", es: "Restablecer", de: "Zurücksetzen", fr: "Réinitialiser" },
  "Members": { en: "Members", es: "Miembros", de: "Mitglieder", fr: "Membres" },
  "Nova tarefa...": { en: "New task...", es: "Nueva tarea...", de: "Neue Aufgabe...", fr: "Nouvelle tâche..." },
  "Filtrar: Todos": { en: "Filter: All", es: "Filtrar: Todos", de: "Filter: Alle", fr: "Filtrer : Tous" },

  // Tarot Cards & Arcanes
  "O Louco": { en: "The Fool", es: "El Loco", de: "Der Narr", fr: "Le Fou" },
  "O Mago": { en: "The Magician", es: "El Mago", de: "Der Magier", fr: "Le Bateleur" },
  "A Sacerdotisa": { en: "The High Priestess", es: "La Sacerdotisa", de: "Die Hohepriesterin", fr: "La Papesse" },
  "A Imperatriz": { en: "The Empress", es: "La Emperatriz", de: "Die Herrscherin", fr: "L'Impératrice" },
  "O Imperador": { en: "The Emperor", es: "El Emperador", de: "Der Herrscher", fr: "L'Empereur" },
  "O Hierofante": { en: "The Hierophant", es: "El Sumo Sacerdote", de: "Der Hierophant", fr: "Le Hiérophante" },
  "Os Enamorados": { en: "The Lovers", es: "Los Enamorados", de: "Die Liebenden", fr: "L'Amoureux" },
  "O Carro": { en: "The Chariot", es: "El Carro", de: "Der Wagen", fr: "Le Chariot" },
  "A Justiça": { en: "Justice", es: "La Justicia", de: "Die Gerechtigkeit", fr: "La Justice" },
  "O Eremita": { en: "The Hermit", es: "El Ermitaño", de: "Der Eremit", fr: "L'Ermite" },
  "A Roda da Fortuna": { en: "The Wheel of Fortune", es: "La Rueda de la Fortuna", de: "Das Schicksalsrad", fr: "La Roue de Fortune" },
  "A Força": { en: "Strength", es: "La Fuerza", de: "Die Kraft", fr: "La Force" },
  "O Enforcado": { en: "The Hanged Man", es: "El Colgado", de: "Der Gehängte", fr: "Le Pendu" },
  "A Morte": { en: "Death", es: "La Muerte", de: "Der Tod", fr: "La Mort" },
  "A Temperança": { en: "Temperance", es: "La Templanza", de: "Die Mäßigkeit", fr: "Tempérance" },
  "O Diabo": { en: "The Devil", es: "El Diablo", de: "Der Teufel", fr: "Le Diable" },
  "A Torre": { en: "The Tower", es: "La Torre", de: "Der Turm", fr: "La Maison Dieu" },
  "A Estrela": { en: "The Star", es: "La Estrella", de: "Der Stern", fr: "L'Étoile" },
  "A Lua": { en: "The Moon", es: "La Luna", de: "Der Mond", fr: "La Lune" },
  "O Sol": { en: "The Sun", es: "El Sol", de: "Die Sonne", fr: "Le Soleil" },
  "O Julgamento": { en: "Judgement", es: "El Juicio", de: "Das Gericht", fr: "Le Jugement" },
  "O Mundo": { en: "The World", es: "El Mundo", de: "Die Welt", fr: "Le Monde" },

  // Tarot Minor Arcana Suits
  "Ás de Copas": { en: "Ace of Cups", es: "As de Copas", de: "Ass der Kelche", fr: "As de Coupes" },
  "Dois de Copas": { en: "Two of Cups", es: "Dos de Copas", de: "Zwei der Kelche", fr: "Deux de Coupes" },
  "Três de Copas": { en: "Three of Cups", es: "Tres de Copas", de: "Drei der Kelche", fr: "Trois de Coupes" },
  "Quatro de Copas": { en: "Four of Cups", es: "Cuatro de Copas", de: "Vier der Kelche", fr: "Quatre de Coupes" },
  "Cinco de Copas": { en: "Five of Cups", es: "Cinco de Copas", de: "Fünf der Kelche", fr: "Cinq de Coupes" },
  "Seis de Copas": { en: "Six of Cups", es: "Seis de Copas", de: "Sechs der Kelche", fr: "Six de Coupes" },
  "Sete de Copas": { en: "Seven of Cups", es: "Siete de Copas", de: "Sieben der Kelche", fr: "Sept de Coupes" },
  "Oito de Copas": { en: "Eight of Cups", es: "Ocho de Copas", de: "Acht der Kelche", fr: "Huit de Coupes" },
  "Nove de Copas": { en: "Nine of Cups", es: "Nueve de Copas", de: "Neun der Kelche", fr: "Neuf de Coupes" },
  "Dez de Copas": { en: "Ten of Cups", es: "Diez de Copas", de: "Zehn der Kelche", fr: "Dix de Coupes" },
  "Valete de Copas": { en: "Page of Cups", es: "Sota de Copas", de: "Bube der Kelche", fr: "Valet de Coupes" },
  "Cavaleiro de Copas": { en: "Knight of Cups", es: "Caballero de Copas", de: "Ritter der Kelche", fr: "Cavalier de Coupes" },
  "Rainha de Copas": { en: "Queen of Cups", es: "Reina de Copas", de: "Königin der Kelche", fr: "Reine de Coupes" },
  "Rei de Copas": { en: "King of Cups", es: "Rey de Copas", de: "König der Kelche", fr: "Roi de Coupes" },

  "Ás de Paus": { en: "Ace of Wands", es: "As de Bastos", de: "Ass der Stäbe", fr: "As de Bâtons" },
  "Dois de Paus": { en: "Two of Wands", es: "Dos de Bastos", de: "Zwei der Stäbe", fr: "Deux de Bâtons" },
  "Três de Paus": { en: "Three of Wands", es: "Tres de Bastos", de: "Drei der Stäbe", fr: "Trois de Bâtons" },
  "Quatro de Paus": { en: "Four of Wands", es: "Cuatro de Bastos", de: "Vier der Stäbe", fr: "Quatre de Bâtons" },
  "Cinco de Paus": { en: "Five of Wands", es: "Cinco de Bastos", de: "Fünf der Stäbe", fr: "Cinq de Bâtons" },
  "Seis de Paus": { en: "Six of Wands", es: "Seis de Bastos", de: "Sechs der Stäbe", fr: "Six de Bâtons" },
  "Sete de Paus": { en: "Seven of Wands", es: "Siete de Bastos", de: "Sieben der Stäbe", fr: "Sept de Bâtons" },
  "Oito de Paus": { en: "Eight of Wands", es: "Ocho de Bastos", de: "Acht der Stäbe", fr: "Huit de Bâtons" },
  "Nove de Paus": { en: "Nine of Wands", es: "Nueve de Bastos", de: "Neun der Stäbe", fr: "Neuf de Bâtons" },
  "Dez de Paus": { en: "Ten of Wands", es: "Diez de Bastos", de: "Zehn der Stäbe", fr: "Dix de Bâtons" },
  "Valete de Paus": { en: "Page of Wands", es: "Sota de Bastos", de: "Bube der Stäbe", fr: "Valet de Bâtons" },
  "Cavaleiro de Paus": { en: "Knight of Wands", es: "Caballero de Bastos", de: "Ritter der Stäbe", fr: "Cavalier de Bâtons" },
  "Rainha de Paus": { en: "Queen of Wands", es: "Reina de Bastos", de: "Königin der Stäbe", fr: "Reine de Bâtons" },
  "Rei de Paus": { en: "King of Wands", es: "Rey de Bastos", de: "König der Stäbe", fr: "Roi de Bâtons" },

  "Ás de Espadas": { en: "Ace of Swords", es: "As de Espadas", de: "Ass der Schwerter", fr: "As d'Épées" },
  "Dois de Espadas": { en: "Two of Swords", es: "Dos de Espadas", de: "Zwei der Schwerter", fr: "Deux d'Épées" },
  "Três de Espadas": { en: "Three of Swords", es: "Tres de Espadas", de: "Drei der Schwerter", fr: "Trois d'Épées" },
  "Quatro de Espadas": { en: "Four of Swords", es: "Cuatro de Espadas", de: "Vier der Schwerter", fr: "Quatre d'Épées" },
  "Cinco de Espadas": { en: "Five of Swords", es: "Cinco de Espadas", de: "Fünf der Schwerter", fr: "Cinq d'Épées" },
  "Seis de Espadas": { en: "Six of Swords", es: "Seis de Espadas", de: "Sechs der Schwerter", fr: "Six d'Épées" },
  "Sete de Espadas": { en: "Seven of Swords", es: "Siete de Espadas", de: "Sieben der Schwerter", fr: "Sept d'Épées" },
  "Oito de Espadas": { en: "Eight of Swords", es: "Ocho de Espadas", de: "Acht der Schwerter", fr: "Huit d'Épées" },
  "Nove de Espadas": { en: "Nine of Swords", es: "Nueve de Espadas", de: "Neun der Schwerter", fr: "Neuf d'Épées" },
  "Dez de Espadas": { en: "Ten of Swords", es: "Diez de Espadas", de: "Zehn der Schwerter", fr: "Dix d'Épées" },
  "Valete de Espadas": { en: "Page of Swords", es: "Sota de Espadas", de: "Bube der Schwerter", fr: "Valet d'Épées" },
  "Cavaleiro de Espadas": { en: "Knight of Swords", es: "Caballero de Espadas", de: "Ritter der Schwerter", fr: "Cavalier d'Épées" },
  "Rainha de Espadas": { en: "Queen of Swords", es: "Reina de Espadas", de: "Königin der Schwerter", fr: "Reine d'Épées" },
  "Rei de Espadas": { en: "King of Swords", es: "Rey de Espadas", de: "König der Schwerter", fr: "Roi d'Épées" },

  "Ás de Ouros": { en: "Ace of Pentacles", es: "As de Oros", de: "Ass der Münzen", fr: "As de Deniers" },
  "Dois de Ouros": { en: "Two of Pentacles", es: "Dos de Oros", de: "Zwei der Münzen", fr: "Deux de Deniers" },
  "Três de Ouros": { en: "Three of Pentacles", es: "Tres de Oros", de: "Drei der Münzen", fr: "Trois de Deniers" },
  "Quatro de Ouros": { en: "Four of Pentacles", es: "Cuatro de Oros", de: "Vier der Münzen", fr: "Quatre de Deniers" },
  "Cinco de Ouros": { en: "Five of Pentacles", es: "Cinco de Oros", de: "Fünf der Münzen", fr: "Cinq de Deniers" },
  "Seis de Ouros": { en: "Six of Pentacles", es: "Seis de Oros", de: "Sechs der Münzen", fr: "Six de Deniers" },
  "Sete de Ouros": { en: "Seven of Pentacles", es: "Siete de Oros", de: "Sieben der Münzen", fr: "Sept de Deniers" },
  "Oito de Ouros": { en: "Eight of Pentacles", es: "Ocho de Oros", de: "Acht der Münzen", fr: "Huit de Deniers" },
  "Nove de Ouros": { en: "Nine of Pentacles", es: "Nueve de Oros", de: "Neun der Münzen", fr: "Neuf de Deniers" },
  "Dez de Ouros": { en: "Ten of Pentacles", es: "Diez de Oros", de: "Zehn der Münzen", fr: "Dix de Deniers" },
  "Valete de Ouros": { en: "Page of Pentacles", es: "Sota de Oros", de: "Bube der Münzen", fr: "Valet de Deniers" },
  "Cavaleiro de Ouros": { en: "Knight of Pentacles", es: "Caballero de Oros", de: "Ritter der Münzen", fr: "Cavalier de Deniers" },
  "Rainha de Ouros": { en: "Queen of Pentacles", es: "Reina de Oros", de: "Königin der Münzen", fr: "Reine de Deniers" },
  "Rei de Ouros": { en: "King of Pentacles", es: "Rey de Oros", de: "König der Münzen", fr: "Roi de Deniers" }
};

console.log(`Catalog populated with ${Object.keys(catalog).length} entries.`);
