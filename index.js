const prompt = require("prompt-sync")({ sigint: true });

var isRunning = true;
(async () => {
  while (isRunning) {
    console.log("1. Login");
    console.log("2. Register");

    let input = prompt("Please input menu ");

    if (Number(input) === 1) {
      let name = prompt("Please input your name ");
      let password = prompt("Please input your password ");

      const user = {
        nama: name,
        password: password,
      };

      const hasil = await login(user);
      if (hasil === "berhasil") {
        isRunning = !isRunning;
        isRunnings = true;
        logins = name;
      }
    }
  }
})();