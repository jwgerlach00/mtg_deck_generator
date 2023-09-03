"use strict";

const { getRandomCommander, buildRandomDeck } = require("./scryFallApiCalls.js");
const { CommanderDeck } = require("./CommanderDeck.js");

async function main() {
  let commander = await getRandomCommander("WU", true);
  let deck = await buildRandomDeck(commander.getColorQuery(), "commander", 5);
  let commanderDeck = new CommanderDeck(commander);

  for (let i of deck.cards) {
    commanderDeck.addCard(i);
  }

  console.log(commanderDeck.usdPrice());
}

main();