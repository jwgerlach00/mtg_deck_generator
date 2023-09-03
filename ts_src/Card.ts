class Card {
  name: string;
  colorIdentity: string[];
  imageUri: string;
  usdPrice: number;

  constructor(data: {
    name: string;
    color_identity: string[];
    image_uris: { large: string };
    prices: { usd: string };
  }) {
    this.name = data.name;
    this.colorIdentity = data.color_identity;
    this.imageUri = data.image_uris.large;
    this.usdPrice = Number(data.prices.usd);
  }

  getColorQuery(): string {
    return this.colorIdentity.join(""); // format "WUBGR" that can be used for queries
  }
}

export { Card };
