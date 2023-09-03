import { Card } from "./Card";

class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  usdPrice(): number {
    return this.cards.reduce((acc, card) => acc + card.usdPrice, 0);
  }
}

export { Deck };
