const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);

// 2. route handlers
module.exports. getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
module.exports.getTour = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'invalid id',
    });
  }
  const tour = tours.find((tour) => tour.id === id);
  res.status(202).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
module.exports.createTour = (req, res) => {
  console.log(req.body);
  console.log(tours[tours.length - 1]);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
}
module.exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'invalid id',
    });
  }
  res.status(202).json({
    status: 'success',
    data: '<Updated tour>',
  });
};
module.exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: 'null',
  });
};