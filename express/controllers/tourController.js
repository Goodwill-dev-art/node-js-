// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
// );
// from Mongoose model
// querying data
// 1. filtering query object and also exculde specoial field name of some query string like page and sort before we do filtering
// 2 allowing complex queries  using the greater and the less than opertor
// 3.  mutliple sort query sort(a b) ese
// 3  limiting field
// 4 pagination  (page and limit (the amount of result that we want per page ))
// Query.skip().limit(19)
// aggregation pipeline
// aggregation pipeline

// 2. route handlers
// module.exports.checkID = (req, res, next, val) => {
//   // console.log(val);
//   console.log(req.params.id);
//   const id = req.params.id * 1;
//   if (id >= tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       data: 'invalid id',
//     });
//   }
//   next();
// };
// module.exports.checkBody = (req, res, next) => {
//   console.log(req.body.name);
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       data: 'this is a bad request',
//     });
//   }
//   next();
// };
const Tour = require('../model/tourModel');
module.exports.top5tour = function (req, res, next) {
  req.query.sort = '-price,ratingsAverage, duration';
  req.query.fields = `name,duration, price, summary, ratingsAverage`;
  req.query.limit = 5;
  next();
};

class APIfeatures {
  constructor(query, queryInputData) {
    this.query = query;
    this.queryInputData = queryInputData;
  }
  filter() {
    const queryObj = { ...this.queryInputData };
    const excludedField = ['page', 'sort', 'fields', 'limit', 'skip'];
    excludedField.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    // 1b.  advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replaceAll(/\beq|lt|lte|gt|gte\b/g, (op) => `$${op}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryInputData.sort) {
      const sortBy = this.queryInputData.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  // limit fields
  limitField() {
    if (this.queryInputData.fields) {
      const fields = this.queryInputData.fields.split(',').join(' ');
      console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pagination() {
    const limit = this.queryInputData.limit * 1 || 10;
    const page = this.queryInputData.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports.getAllTour = async (req, res) => {
  try {
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .pagination();
    const tours = await features.query;

    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      result: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
module.exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    console.log(req.params.id + 'dkkddd');
    res.status(202).json({
      status: 'success',
      result: req.params.id,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
module.exports.createTour = async (req, res) => {
  try {
    console.log(req.body.name);
    const newTour = await Tour.create(req.body);
    res.status(202).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
module.exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(202).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
module.exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports.getTourStats = async (req, res) => {
  try {
    const stat = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          avgPrice: { $avg: '$price' },
          numTours: { $sum: 1 },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
      {
        $match: { _id: { $ne: 'easy' } },
      },
    ]);
    res.status(202).json({
      status: 'success',
      data: {
        stat,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
// calculating the busiet month
module.exports.getMonthlyPlan = async (req, res) => {
  try {
    // console.log(req.params.year)
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStat: { $sum: 1 },
          tour: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    res.status(202).json({
      status: 'success',
      results: plan.length,
      data: {
        plan,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
