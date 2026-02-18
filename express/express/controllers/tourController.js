
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
// );
// from Mongoose model
const Tour = require('../model/tourModel');

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
module.exports.getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find();
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
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
