const express = require('express');
const app = express();
const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

app.use(
  express.json(),
); /* this a middleware which is use  to modify the incoming request data  its stand etween in the middle of the request and the response*/

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
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
const createTour = (req, res) => {
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
};
const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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
// app.get('/api/v1/tours', getAllTour);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
app.route(`/api/v1/tours`).get(getAllTour).post(createTour);
app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});

// express is a minimal nodejs framework , a higher level of abstracton
// it allows rapid developnent of Node.js  application
// contains a very robust set of features : complex routing esier handling of request and responses, middleware server side rending

// installing postman
// postman is used to test api or use to run api GET,POST ,PATCH request
// in express we define Route( this determine how an application respond to a certain request or a client request )

// const { application } = require("express")

// API AND RESTFUL API DESIGN

// what is api?
// API stands for application programming interface a piece of software that can be used by another piece of software in order to allow application to talk to each other

// example web api  e.g dartabase -> json data -> api  which an app that send data to the client whenever a reqiuest comes in
// other example are node.js file sysem browser dom js api  we are interesting with the dom api the browser exposes us to in other word api stand as a standlone PIECEOF STANDALONE SPOFTWARE

// THE REST ARCHICTECTURE  WHICH STAND  REPRESENTATION STATE TRANSFER
// 1 sepearte APi into logical resources  api should be divided into logical resources (ehich are object or represenation of something, which has data associated to it. Any information that can be named can be resource e.g tour user review )  e.g tour
// 2 expose structured resource -based urls: make availabe the data using some strctured url the client can send request to e.g https://www.natours.com/addNewTour : the addNewTour is called the api end point but the endpoint dont follow the third rule which said that we should only use http method to perform action on data which means that endpoint should contain some resources
// for example the addNewTour which was suppose to be an endpoint acting as an action but it is suppose we use an http to send a post  equest to add newTour  and use a resources as the url in other word use http metthod as an action
// 3. use Http method (verbs)
// 4. send data as JSON (usually)
// 5 be stateless : state simply refer to a piece of darta in the application that might change over Time for example whether a cetain user is login or on the page which a  list with several pages worth the currentPages that means all state mist be handled by the client  which means each request must contain all the information neccessary  to process certain request
