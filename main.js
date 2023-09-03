"use strict";

const randomFunctions = require("./randomFunctions.js");
const CommanderDeck = require("./CommanderDeck.js").CommanderDeck;

async function main() {
  let commander = await randomFunctions.getRandomCommander("WU", true);
  let deck = await randomFunctions.buildRandomDeck(commander.getColorQuery(), "commander", 5);
  let commanderDeck = new CommanderDeck(commander);

  for (let i of deck.cards) {
    commanderDeck.addCard(i);
  }

  console.log(commanderDeck.usdPrice());
}

main();