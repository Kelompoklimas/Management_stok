const { createProduct } = require("../controller/product");
const { createResProductMongo } = require("../service_mongo/product");

const validationProduct = async (input) => {
  const { name, price, stock, location } = input;

  if (name.length === 0) {
    await createResProductMongo("Bad Request", input, "name cannot be empty");
    return console.log("name cannot be empty");
  }

  if (price.length <= 0) {
    await createResProductMongo("Bad Request", input, "price cannot be empty");
    return console.log("price cannot be empty");
  } else if (typeof Number(price) !== "number" || isNaN(Number(price))) {
    await createResProductMongo("Bad Request", input, "price must be a number");
    return console.log("price must be a number");
  }

  if (stock.length <= 0) {
    await createResProductMongo("Bad Request", input, "stock minimum number 1");
    return console.log("stock minimum number 1");
  } else if (typeof Number(stock) !== "number" || isNaN(Number(stock))) {
    await createResProductMongo("Bad Request", input, "stock must be a number");
    return console.log("stock must be a number");
  }

  if (location.length <= 0) {
    await createResProductMongo(
      "Bad Request",
      input,
      "location cannot be empty"
    );
    return console.log("location cannot be empty");
  }
  await createProduct(input);
};
module.exports = validationProduct;
