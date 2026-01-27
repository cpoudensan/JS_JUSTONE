const cards = require("./words");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));
}

async function main() {
  const players = ["J1", "J2", "J3", "J4", "J5"];
  let activeIndex = 0;

  console.log("Just One");
  console.log("Joueurs:", players.join(", "));

  const maxRounds = Math.min(13, cards.length);

  for (let round = 1; round <= maxRounds; round++) {
    const activePlayer = players[activeIndex];
    const cardWords = cards[round - 1];
    console.log("Carte:", cardWords.map((w, i) => `${i + 1}:${w}`).join(" | "));

    console.log("\n--------------------------------");
    console.log(`Tour ${round}/${maxRounds} | Joueur actif: ${activePlayer}`);

    await ask("Appuie sur Entrée pour passer au tour suivant...");

    // joueur actif suivant (à gauche)
    activeIndex = (activeIndex + 1) % players.length;
  }

  console.log("\nFin du test (le jeu démarre et se termine)");
  rl.close();
}

main().catch((err) => {
  console.error("Erreur:", err);
  rl.close();
});
