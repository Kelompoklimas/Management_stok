const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const Product = Prisma.product;
const User = Prisma.user;
const Categories = Prisma.category;

const checkFindProduct = async (input) => {
  const find = await Product.findUnique({
    where: {
      id: input,
      status: true,
    },
    select: {
      name: true,
      price: true,
      stock: true,
      location: true,
      barcode: true,
      category: {
        select: {
          productId: true,
          tagsId: true,
        },
      },
    },
  });
  if (!find) {
    return console.log(`id product ${input} not found`);
  } else {
    return { status: "Success", data: find };
  }
};
const createProduct = async (input) => {
  const { name, price, stock, location, barcode, user, categories } = input;
  try {
    const findUser = await User.findFirst({
      where: {
        username: user,
      },
    });
    const createProduct = await Product.create({
      data: {
        barcode: barcode,
        name: name,
        price: price,
        stock: Number(stock),
        location: location,
        userId: findUser.id,
      },
    });
    if (categories.length > 0) {
      await Promise.all(
        categories.map(async (i) => {
          await Categories.create({
            data: {
              productId: createProduct.id,
              tagsId: i,
            },
          });
        })
      );
    }

    return console.log("Success create product");
  } catch (error) {
    console.log("please login first");
  }
};

const updateProduct = async (input) => {
  try {
    let { id, name, price, stock, location, barcode, categories } = input.input;
    if (name.length === 0) {
      name = input.data.name;
    }
    if (price.length === 0) {
      price = input.data.price;
    } else if (typeof Number(price) !== "number" || isNaN(Number(price))) {
      return console.log("price must be a number");
    }
    if (stock.length <= 0) {
      stock = input.data.stock;
    } else if (stock[0] === "-") {
      stock = input.data.stock - parseInt(stock.replace("-", ""));
    } else if (stock[0] === "+") {
      stock = input.data.stock + parseInt(stock.replace("+", ""));
    } else {
      return console.log("input stock invalid");
    }

    if (location.length <= 0) {
      location = input.data.location;
    }
    if (barcode.length <= 0) {
      barcode = input.data.barcode;
    }
    if (categories.length <= 0) {
      categories = input.data.category;
    }
    const updateProduct = await Product.update({
      where: {
        id: id,
        status: true,
      },
      data: {
        barcode: barcode,
        name: name,
        price: price,
        stock: Number(stock),
        location: location,
      },
    });
    if (categories.length > 0) {
      await Categories.deleteMany({
        where: {
          productId: id,
        },
      });
      await Promise.all(
        categories.map(async (i) => {
          await Categories.create({
            data: {
              productId: id,
              tagsId: i,
            },
          });
        })
      );
    }

    return console.log("Success Update Product");
  } catch (error) {
    return console.log("Product id Not Found");
  }
};

const deleteProduct = async (input) => {
  try {
    await Product.update({
      where: {
        id: input,
        status: true,
      },
      data: {
        status: false,
      },
    });
    return console.log("Success Delete Product");
  } catch (error) {
    return console.log(error);
  }
};

const searchProduct = async (input) => {
  try {
    const products = await Product.findMany({
      where: {
        name: {
          contains: input,
        },
      },
      select: {
        name: true,
        price: true,
        stock: true,
        location: true,
        barcode: true,
      },
    });
    if (products.length > 0) {
      return console.table(products);
    } else {
      return console.log("Product Not Found");
    }
  } catch (error) {
    return console.log(error);
  }
};

async function listProduct() {
  const products = await Prisma.product.findMany();
  return console.log (products);
}

module.exports = {
  checkFindProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  listProduct,
};
