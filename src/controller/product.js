const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const Product = Prisma.product;
const User = Prisma.user;
const Categories = Prisma.category;

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

    return console.log("Success create product");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProduct };
