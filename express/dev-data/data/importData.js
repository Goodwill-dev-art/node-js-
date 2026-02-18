const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../model/tourModel');

dotenv.config({path: '../../config.env'});
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(`DB connected successfully,`);
    //  console.log(con)
  });

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const importDevData = async function () {
  try {
    await Tour.create(tour);

  } catch (error) {
    console.log(error.message);
  }
  process.exit()
};
const deleteAllData = async function () {
  try {
 await Tour.deleteMany();
   
  } catch (error) {
    console.log(error.message);
  }
};
console.log(process.argv);
console.log(process.argv[2]);
if (process.argv[2]==="--importDevData"){
importDevData()
}
if (process.argv[2]==="--deleteAll"){
deleteAllData()
}