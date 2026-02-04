// callback hell

//  the "get"  in the superagent module will return a primise
// after which we can consume with the then methid
// when a promise successfully return a value is a resolved promised which is fulfled
// using the catch method to handle resolve promises

const fs = require("fs");

const superagent = require("superagent");
// fs.readFile("dog.txt", "utf8", (err, data) => {
//   console.log(`breed : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("breed-image.txt", res.body.message, (err, data) => {
//         if (err) return console.log(err.message);
//         console.log("random dog image has been saved ");
//       });
//     })
//     .catch((err) => console.log(err.message));
// });

//  building promsises
const readFilePro = (file) =>
  new Promise((resolve, reject) =>
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return reject(err);
      // console.log("this is data", data);
      resolve(data);
    }),
  );

const writeFilePro = (file, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(file, data, (err, data) => {
      if (err) return reject(err.message);

      resolve("the dog breed is save successully");
    }),
  );
readFilePro("dog.txt")
  .then((data) => superagent.get(`https://dog.ceo/api/breed/${data}/images/random`))
  .then((res) => writeFilePro("breed-images.txt", res.body.message))
  .catch((err) => console.log(err.message));
