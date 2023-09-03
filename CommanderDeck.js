"use strict";

const Deck = require("./Deck.js").Deck;

class CommanderDeck extends Deck {
  constructor(commander) {
    super();
    this.commander = commander;
  }

  usdPrice() {
    return super.usdPrice() + this.commander.usdPrice;
  }
}

module.exports = { CommanderDeck }
