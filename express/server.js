// 4  start the server ;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
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
const app = require('./app');
// const result = dotenv.config({ path: './express/config.env' });
// console.log(result);




const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});
