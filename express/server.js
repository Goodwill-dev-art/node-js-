// 4  start the server ;
const dotenv = require('dotenv');


dotenv.config({ path: './express/config.env' });
const app = require('./app');
const result = dotenv.config({ path: './express/config.env' });
console.log(result);


// console.log(app.get('env'));
console.log(process.env.NODE_ENV + ' it is');
console.log(process.env.PASSWORD);
console.log(process.env.USERS);
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});
