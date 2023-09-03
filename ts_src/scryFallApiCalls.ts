import axios, { AxiosResponse } from "axios";
import { Deck } from "./Deck";
import { Card } from "./Card";

function getRandomCommander(color: string, exactColorMatch: boolean): Promise<Card> {
  // https://scryfall.com/random?q=f%3Acommander+ci%3Abrg+-t%3Abasic PARTNER
  const query = `https://api.scryfall.com/cards/random?q=is%3Acommander+c%3${exactColorMatch ? "D" : "A"}${color}`;
  return axios.get(query).then(res => new Card(res.data));
}

async function getRandomCard(color: string, format: string): Promise<Card> {
  let query: string;
  let res: AxiosResponse;

  do {
    query = `https://api.scryfall.com/cards/random?q=c%3${"C"}${color}`;
    res = await axios.get(query);
  } while (
    res.data.legalities[format] !== "legal" &&
    res.data.prices.usd === null &&
    res.data.image_uris === undefined
  );

  return new Card(res.data);
}

async function buildRandomDeck(color: string, format: string, size: number): Promise<Deck> {
  let deck = new Deck();

  for (let i = 0; i < size; i++) {
    deck.addCard(await getRandomCard(color, format));
  }

  return deck;
}

export {
  getRandomCommander,
  buildRandomDeck
};
