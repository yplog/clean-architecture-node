module.exports.Product = class Product {
  constructor({ id, name = null, description = null, images = [], price = null }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
  }


}