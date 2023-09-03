"use strict";

class Card {
  constructor(data) {
    this.name = data.name;
    this.colorIdentity = data.color_identity;
    this.imageUri = data.image_uris.large;
    this.usdPrice = Number(data.prices.usd);
  }

  getColorQuery() {
    return this.colorIdentity.join(""); // format "WUBGR" that can be used for queries
  }
}

module.exports = { Card };
