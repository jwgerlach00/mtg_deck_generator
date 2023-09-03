"use strict";

const axios = require("axios");

class Card {
  constructor(data) {
    this.name = data.name;
    this.color_identity = data.color_identity;
    this.image_uri = data.image_uris.large;
    this.usd_price = Number(data.prices.usd);
  }

  getColorQuery() {
    return this.color_identity.join(""); // format "WUBGR" that can be used for queries
  }
}

function getRandomCommander(color, exactColorMatch) {
  // https://scryfall.com/random?q=f%3Acommander+ci%3Abrg+-t%3Abasic PARTNER
  const query = `https://api.scryfall.com/cards/random?q=is%3Acommander+c%3${exactColorMatch ? "D" : "A"}${color}`;
  return axios.get(query).then(res => new Card(res.data));
}

async function getRandomCard(color, format) {
  let query;
  let res;

  do {
    query = `https://api.scryfall.com/cards/random?q=c%3${"C"}${color}`;
    res = await axios.get(query);
  } while (res.data.legalities[format] !== "legal" && res.data.prices.usd === null);

  return new Card(res.data);
}

async function buildRandomDeck(color, format, size) {
  let deck = new Deck();

  for (let i = 0; i < size; i++) {
    deck.addCard(await getRandomCard(color, format));
  }

  return deck;
}

class Deck {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  usdPrice() {
    return this.cards.reduce((acc, card) => acc + card.usd_price, 0);
  }
}

class CommanderDeck extends Deck {
  constructor(commander) {
    super();
    this.commander = commander;
  }

  usdPrice() {
    return super.usdPrice() + this.commander.usd_price;
  }
}

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