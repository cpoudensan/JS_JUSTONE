const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));
}

async function main() {
  console.log("Just One - mode texte (Node.js)");
  const name = await ask("Ton nom ? ");
  console.log("Salut", name);
  rl.close();
}

main();
