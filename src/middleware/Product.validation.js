const { createProduct } = require("../controller/product");

const validationProduct = async (input) => {
  const { name, price, stock, location } = input;

  if (name.length === 0) {
    return console.log("name cannot be empty");
  }

  if (price.length <= 0) {
    return console.log("price cannot be empty");
  } else if (typeof Number(price) !== "number" || isNaN(Number(price))) {
    return console.log("price must be a number");
  }

  if (stock.length <= 0) {
    return console.log("stock minimum number 1");
  } else if (typeof Number(stock) !== "number" || isNaN(Number(stock))) {
    return console.log("stock must be a number");
  }

  if (location.length <= 0) {
    return console.log("location cannot be empty");
  }
  await createProduct(input);
};
module.exports = validationProduct;
