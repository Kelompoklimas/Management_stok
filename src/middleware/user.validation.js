const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const { register } = require("../controller/user");

async function registerValidation(username, email, password) {
    if (!username || !email || !password) {
        return console.log("All fields are required");
    }
  
    const existingUser = await Prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return console.log("Email is already registered");
    }
  await register(username,email,password)
}

module.exports = {
  registerValidation,
}