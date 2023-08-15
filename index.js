const prompt = require("prompt-sync")({ sigint: true });
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const User = Prisma.user;

var isRunning = true;
(async () => {
  while (isRunning) {
    console.log("1. Login");
    console.log("2. Register");

    let input = prompt("Please input menu ");

    if (Number(input) === 1) {
      let name = prompt("Please input your name ");
      let password = prompt("Please input your password ");

      await User.create({
        data: {
          email: "rajih@gmail.com",
          username: "rajih",
          password: "rajih123",
        },
      });
    }
  }
})();
