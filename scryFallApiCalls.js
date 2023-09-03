"use strict";

const axios = require("axios");
const { Deck } = require("./Deck.js");
const { Card } = require("./Card.js");

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

module.exports = {
  getRandomCommander,
  buildRandomDeck
};
