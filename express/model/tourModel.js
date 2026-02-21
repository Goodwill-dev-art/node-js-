const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator")
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `a tour must have a name`],
      unique: true,
      maxlength: [40, 'A tour name must have less or equal than 40 character '],
      minLength: [10, 'A tour name must have more or equal than 10 character'],
      // validate:[validator.isAlpha, "Tour name must only contain charcter"]
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5'],
    },
    price: {
      type: Number,
      required: [true, `a tour must have a price`],
    },
    priceDiscount: {
      type: Number,
      validate:    {
        validator: function (val) {
        return val < this.price;
      },
      message: "Discount price ({value}) show be below regular price"
      }
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
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'difficulty is either easy medium , hard',
      },
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
    secretTour: {
      type: Boolean,
      default: false,
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
// document middleware: it work before .Save() and .create()
tourSchema.pre('save', function (next) {
  console.log(this);
  this.slug = slugify(this.name, { lower: true });

  next();
});
// query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (doc, next) {
  console.log(Date.now() - this.start);
  next();
});
tourSchema.pre('aggregate', function (next) {
  this.pipeline.push({ $match: { secretTour: { $ne: true } } });
  next();
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
