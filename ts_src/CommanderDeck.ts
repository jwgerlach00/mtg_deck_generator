import { Deck } from "./Deck";
import { Card } from "./Card"; 

class CommanderDeck extends Deck {
  commander: Card;

  constructor(commander: Card) {
    super();
    this.commander = commander;
  }

  usdPrice(): number {
    return super.usdPrice() + this.commander.usdPrice;
  }
}

export { CommanderDeck };
