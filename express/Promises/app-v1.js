// problem with call back hell
// - its make code difficult to maintain
// it is easier to identify with the trangle shape in the code  which indicate that its a call back hell which means callback inside of another callback from the example below
const fs = require("fs");
const superagent = require("superagent");
fs.readFile("dog.txt", "utf-8", (err, data) => {
  console.log(`breed : ${data}`);

  // second callBack
  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    console.log(res.body.message);

    fs.writeFile("breed-image.txt", res.body.message, (err, data) => {
      if (err) return err.message;
    });
  });
});
// callback hell