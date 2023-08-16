// Register
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

async function register(p_username, p_email, p_password) {
    const user = await Prisma.user.create({
      data: {
        username: p_username,
        email: p_email,
        password: p_password,
      }
    });
    return console.log (user) 
  }
  module.exports = {
    register
  }