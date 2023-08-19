const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const { register, changePassword } = require("../controller/user");

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

async function changePasswordValidation(email, password, newPassword) {
  try {
      const user = await Prisma.user.findFirst({where: {email: email}});
      const complexPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (user.password !== password) {
          console.log("The current username or password is incorrect.");
      } else if (newPassword.length < 6 ||!complexPassword.test(newPassword)) {
          return console.log("The new password does not meet the requirements");
      } else {
          await changePassword(email, password, newPassword)
      } 
  }
  catch (error) {
      console.log("Failed to change password.");
      }
  }

module.exports = {
  registerValidation,
  changePasswordValidation,
}