class InventoryItem {
  constructor(item, reqBody) {
    this.itemID = reqBody.itemID;
    this.stockxID = item.stockxID;
    this.purchasePrice = reqBody.purchasePrice;
    this.tax = reqBody.tax;
    this.shipping = reqBody.shippingCost;
    this.purchasePlace = reqBody.purchasePlace;
    this.date = reqBody.purchaseDate;
    this.orderNum = reqBody.orderNumber;
  }

  

}

module.exports = InventoryItem;