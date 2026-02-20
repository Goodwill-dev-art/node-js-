const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `a tour must have a name`],
      unique: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, `a tour must have a price`],
    },
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, `A tour must have a group size`],
    },
    difficulty: {
      type: String,
      required: [true],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, `A tour must have a cover image`],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;







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
