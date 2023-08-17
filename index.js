const prompt = require("prompt-sync")({ sigint: true });
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const User = Prisma.user;

const { allTags, createTags } = require("./src/controller/tags");
const validationProduct = require("./src/middleware/Product.validation");
const {
  checkFindProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  listProduct,
} = require("./src/controller/product");
const { register, login, changePassword } = require("./src/controller/user");
const connectDB = require("./config/config");

var isRunning = true;
var secondRunning = false;
var categori = [];
let user = null;

let showCategories = async () => {
  const find = await allTags();
  if (find === "NotFound") {
    return console.log("Tags Not Found");
  } else {
    find.map((i, index) =>
      categori.push({
        number: index + 1,
        id: i.id,
        nameCategori: i.name_tags,
      })
    );

    console.table(
      categori.map((item) => ({
        number: item.number,
        nameCategori: item.nameCategori,
      }))
    );
  }
};

(async () => {
  // connec mongoDB
  await connectDB();
  while (isRunning) {
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Change Password");
    console.log("4. List Product");
    console.log("5. Create Tags");

    let input = prompt("Please input menu ");

    if (Number(input) === 1) {
      let name = prompt("Please input your name ");
      let password = prompt("Please input your password ");
      let logins = await login(name, password);
      if (logins === "succes") {
        isRunning = false;
        secondRunning = true;
        user = name;
      }
    }
    if (Number(input) === 2) {
      let name = prompt("Please input your name ");
      let email = prompt("Please input your email ");
      let password = prompt("Please input your password ");
      await register(name, email, password);
    }
    if (Number(input) === 3) {
      let email = prompt("Please input your email ");
      let password = prompt("Please input your password ");
      await changePassword(email, password);
    }
    if (Number(input) === 4) {
      await listProduct();
    }
    if (Number(input) === 5) {
      let name_Categori = prompt("Please input name tags ");
      await createTags(name_Categori);
    }
  }

  while (secondRunning) {
    console.log("1. Show all category");
    console.log("2. Add Product");
    console.log("3. Update Data");
    console.log("4. Delete Product");
    console.log("5. Search Product");

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

      const categoriesArray = [];
      const urutan = [];
      let status = true;

      while (status) {
        const categories = prompt("Please input number categories");

        if (urutan.includes(Number(categories))) {
          console.log("Already category selected");
        } else {
          const matchedCategory = categori.find(
            (e) => Number(e.number) === Number(categories)
          );
          if (matchedCategory) {
            categoriesArray.push(matchedCategory.id);
            urutan.push(Number(matchedCategory.number));
          } else {
            return console.log("Invalid category number");
          }
        }

        const cekStatus = prompt("Input again? (y/n)");
        if (cekStatus.toLowerCase() === "n") {
          status = false;
        }
      }
      categori = [];
      const input = {
        name: name,
        price: price,
        stock: stock,
        location: location,
        barcode: barcode,
        user: user,
        categories: categoriesArray,
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
    if (Number(input) === 5) {
      let input = prompt("Please input name product ");

      await searchProduct(input);
    }
  }
})();
