const prompt = require("prompt-sync")({ sigint: true });
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const User = Prisma.user;

const allTags = require("./src/controller/tags");
const validationProduct = require("./src/middleware/Product.validation");
const {
  checkFindProduct,
  updateProduct,
  deleteProduct,
} = require("./src/controller/product");

var isRunning = true;
var secondRunning = true;
let categori = [];

let showCategories = async () => {
  const find = await allTags();

  find.map((i, index) =>
    categori.push({
      number: index + 1,
      id: i.id,
      nameCategori: i.name_tags,
    })
  );

  console.log(
    categori.map((item) => ({
      number: item.number,
      nameCategori: item.nameCategori,
    }))
  );
};

(async () => {
  // while (isRunning) {
  //   console.log("1. Login");
  //   console.log("2. Register");

  //   let input = prompt("Please input menu ");

  //   if (Number(input) === 1) {
  //     let name = prompt("Please input your name ");
  //     let password = prompt("Please input your password ");
  //   }
  // }

  while (secondRunning) {
    console.log("1. Show all category");
    console.log("2. Add Product");
    console.log("3. Update Data");
    console.log("4. Delete Product");

    let input = prompt("Please input menu ");

    if (Number(input) === 1) {
      await showCategories();
      categori = [];
    }

    if (Number(input) === 2) {
      let name = prompt("Please input your name product ");
      let price = prompt("Please input your price product ");
      let stock = prompt("Please input your stock product ");
      let location = prompt("Please input your location ");
      let barcode = prompt("Please input your code barcode ");
      await showCategories();

      let categoriesarray = [];
      let status = true;
      while (status) {
        let categories = prompt("Please input categories ");
        categori.map((e) => {
          if (Number(e.number) === Number(categories)) {
            categoriesarray.push(e.id);
          }
        });
        let cekStatus = prompt("input again ? y / n ");
        if (cekStatus === "n") {
          status = !status;
        }
      }

      const input = {
        name: name,
        price: price,
        stock: stock,
        location: location,
        barcode: barcode,
        user: "rajih",
        categories: categoriesarray,
      };
      await validationProduct(input);
    }
    if (Number(input) === 3) {
      let status1 = false;
      let data = null;
      let id = prompt("Please input id product ");
      await checkFindProduct(id)
        .then((response) => {
          if (response.status === "Success") {
            status1 = true;
            data = response.data;
          }
        })
        .catch((err) => {
          null;
        });
      while (status1) {
        console.log(data);
        let name = prompt("Please input your name product ");
        let price = prompt("Please input your price product ");
        console.log(
          "---please make sure if you want to add stock start with + and otherwise start with - (example : -1 or +1)"
        );
        let stock = prompt("Please input your stock product ");
        let location = prompt("Please input your location ");
        let barcode = prompt("Please input your code barcode ");
        await showCategories();

        let categoriesarray = [];
        let status = true;
        while (status) {
          let categories = prompt("Please input categories ");
          categori.map((e) => {
            if (Number(e.number) === Number(categories)) {
              categoriesarray.push(e.id);
            }
          });
          let cekStatus = prompt("input again ? y / n ");
          if (cekStatus === "n") {
            status = !status;
          }
        }
        const input = {
          id: id,
          name: name,
          price: price,
          stock: stock,
          location: location,
          barcode: barcode,
          user: "rajih",
          categories: categoriesarray,
        };

        await updateProduct({ input: input, data: data });
        status1 = false;
      }
    }
    if (Number(input) === 4) {
      let input = prompt("Please input id product ");

      await deleteProduct(input);
    }
  }
})();
