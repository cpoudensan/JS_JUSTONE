const cards = require("./words");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) =>
    rl.question(question, (ans) => resolve(ans.trim()))
  );
}

function clearScreen() {
  console.clear();
}

function removeDuplicateClues(clues) {
  const counts = {};

  for (const c of clues) {
    const key = c.clue.toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
  }

  return clues.filter(
    (c) => counts[c.clue.toLowerCase()] === 1
  );
}

async function main() {
  const players = ["J1", "J2", "J3", "J4", "J5"];
  const scores = {
  J1: 0,
  J2: 0,
  J3: 0,
  J4: 0,
  J5: 0,
};
  let activeIndex = Math.floor(Math.random() * players.length);

  const maxRounds = (13, cards.length);

  console.log("=== Just One (mode texte) ===");
  console.log(`Joueur actif initial (au hasard): ${players[activeIndex]}`);

  for (let round = 1; round <= maxRounds; round++) {
    const activePlayer = players[activeIndex];
    const cardWords = cards[round - 1];

    console.log("\n--------------------------------");
    console.log(`Tour ${round}/${maxRounds} | Joueur actif: ${activePlayer}`);

    // les autres voient la carte, joueur actif détourne le regard
    console.log("\nLes autres joueurs: regardez la carte à l'écran.");
    console.log(`${activePlayer}: détourne-toi / ferme les yeux.`);
    await ask("Appuie sur Entrée pour afficher la carte...");
    console.log("Carte:", cardWords.map((w, i) => `${i + 1}:${w}`).join(" | "));
    await ask("Appuie sur Entrée quand tu as écrit tous les mots sur une feuille");
    clearScreen();
    console.log(`${activePlayer} peut revenir.`);

    let chosenIndex;

  while (true) {
    const answer = await ask(`${activePlayer}, choisis un chiffre entre 1 et 5 : `);
    const number = Number(answer);

    if (Number.isInteger(number) && number >= 1 && number <= 5) {
      chosenIndex = number;
      break;
    }

    console.log("Choix invalide. Entre un nombre de 1 à 5.");
  } 
      const mysteryWord = cardWords[chosenIndex - 1];

    console.log("\nPhase 2: chaque autre joueur écrit un indice.");

    const clues = [];

    for (const p of players) {
      if (p === activePlayer) continue;

      let clue;
      while (true) {
        clue = await ask(`Indice de ${p} : `);

        if (!clue) {
          console.log("=> Indice vide interdit.");
          continue;
        }

        // interdit d'écrire exactement le mot mystère
        if (clue.toLowerCase() === mysteryWord.toLowerCase()) {
          console.log("=> Indice non valide: tu ne peux pas écrire le mot mystère.");
          continue;
        }

        break;
      }

      clues.push({ player: p, clue });
    }

    const remainingClues = removeDuplicateClues(clues);

    console.log("\nPhase 3: annulation des indices identiques");

    if (remainingClues.length === 0) {
      console.log("Tous les indices ont été annulés 😬");
    } else {
      console.log("Indices restants :");
      for (const c of remainingClues) {
        console.log(`- ${c.player}: ${c.clue}`);
    }
  }
  if (remainingClues.length > 0) {
  const guess = await ask(`\n${activePlayer}, ta réponse (1 mot) : `);

  if (guess.toLowerCase() === mysteryWord.toLowerCase()) {
    console.log("Bonne réponse !");
    scores[activePlayer]++;
  } else {
    console.log(`Mauvaise réponse. Le mot était : ${mysteryWord}`);
  }
} else {
  console.log("Tour perdu.");
}
    // joueur actif suivant
    activeIndex = (activeIndex + 1) % players.length;
  }
console.log("\nScores finaux :");
for (const p of players) {
  console.log(`${p} : ${scores[p]} point(s)`);
}
  console.log("\nFin du test");
  rl.close();
}

main().catch((err) => {
  console.error("Erreur:", err);
  rl.close();
});

