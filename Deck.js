"use strict";

class Deck {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  usdPrice() {
    return this.cards.reduce((acc, card) => acc + card.usdPrice, 0);
  }
}

module.exports = { Deck }
