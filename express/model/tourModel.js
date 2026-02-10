const mongoose = require("mongoose")
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `a tour must have a name`],
    unique:true
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, `a tour must have a price`],
  },
});
const Tour=mongoose.model("Tour", tourSchema)
module.exports=Tour


// console.log(app.get('env'));
// console.log(process.env.NODE_ENV + ' it is');
// console.log(process.env.PASSWORD);
// console.log(process.env.USERS);

// const userSchema= new  mongoose.Schema({
//   name: {
//     type:String, 
//     required:[true, 'a user must have a name']
//   },
//   users: {
//     type: String,
//     required: [true , `a user must have a username`]
//   },
//   age: {
//     type:Number
//   }
// })
// const testTour = new Tour({
//   name: "The forest Hiker",
//   price: 497,
//   rating :4.7 
// })
// const testTour2 = new Tour({
//   name: "The EKo hotel",
//   price:422,
//   rating: 4.3
// })
// // const User = mongoose.model('User', userSchema)
// const testUser = new User({
//   name: "Oriakhi Godwin",
//   users: "GurdKhid",
//   age:33
// })
// testUser.save().then(doc=>console.log(doc))
// testTour.save().then(doc=>{
//   console.log(doc)
// }).catch(err=> console.log(`err ${err.message}`))
 
// testTour2.save().then(doc=> {
//   console.log(doc)
// })