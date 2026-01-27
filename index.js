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

async function main() {
  const players = ["J1", "J2", "J3", "J4", "J5"];
  let activeIndex = Math.floor(Math.random() * players.length);

  const maxRounds = Math.min(13, cards.length);

  console.log("=== Just One (mode texte) ===");
  console.log(`Joueur actif initial (au hasard): ${players[activeIndex]}`);

  for (let round = 1; round <= maxRounds; round++) {
    const activePlayer = players[activeIndex];
    const cardWords = cards[round - 1];

    console.log("\n--------------------------------");
    console.log(`Tour ${round}/${maxRounds} | Joueur actif: ${activePlayer}`);

    // Phase 1 (pratique terminal): les autres voient la carte, actif détourne le regard
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

    // joueur actif suivant
    activeIndex = (activeIndex + 1) % players.length;
  }

  console.log("\nFin du test(le jeu démarre et se termine)");
  rl.close();
}

main().catch((err) => {
  console.error("Erreur:", err);
  rl.close();
});

