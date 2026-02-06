const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

// middlewares
app.use(
  express.json(),
); /* this a middleware which is use  to modify the incoming request data  its stand etween in the middle of the request and the response*/
app.use((req, res, next) => {
  console.log('this is a middleware ,✋🏽✋🏽');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

// route handlers
const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
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

// routes

const getAllUser = (req, res) => {
  res.status(500).json({
    message: 'this route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

app.route(`/api/v1/tours`).get(getAllTour).post(createTour);
app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
app.route('/api/v1/users').get(getAllUser).post(createUser);
app.route('/api/v1/user/:id').get(getUser).patch(updateUser).delete(deleteUser);
//   start the server ;
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
// 1 sepearte APi into logical resources  api should be divided into logical resources (which are object or represenation of something, which has data associated to it. Any information that can be named can be resource e.g tour user review )  e.g tour
// 2 expose structured resource -based urls: make availabe the data using some strctured url the client can send request to e.g https://www.natours.com/addNewTour : the addNewTour is called the api end point but the endpoint dont follow the third rule which said that we should only use http method to perform action on data which means that endpoint should contain some resources
// for example the addNewTour which was suppose to be an endpoint acting as an action but it is suppose we use an http to send a post  equest to add newTour  and use a resources as the url in other word use http metthod as an action
// 3. use Http method (verbs)
// 4. send data as JSON (usually)
// 5 be stateless : state simply refer to a piece of darta in the application that might change over Time for example whether a cetain user is login or on the page which a  list with several pages worth the currentPages that means all state mist be handled by the client  which means each request must contain all the information neccessary  to process certain request

// explaining middleware  and the request response circle
// our express app receive a request when someone hit the serverfor which it wil then create a request and response object that data will then be use in order to generate and
// send back a meaniful response in order to process that data  we use a MIDDLEWARE which can manipulate the reuwst and the response object or really execute
// any other code its usually mostly about the request its called middleware because its a function that is executed between or in the middle of reciving a request and sending a response e. g our route handler, express .json
// all the middleware that we use in our app is called the middleware stack  .the order of middleware in the stack is defined by the other they are defined in he code so a middleware that appear first in the code is executed before a middleware that appear later
// our request or response obj that were created in the begining  go through each middleware where they are process or where some other code is executed
// then at the end of each middleware function a next function is called which is a function that we have access to in each middleware function just like the request and response object
// when we called the next function the next middleware will be executed with the  exact same request and response object  and that happen with all the middleware until we reach the last one

// creating middleware function
// the use method is d one use in order to use middleware which in turn create a function added to the middleware
// the middleware stack is stopped at a route handler i.e its end whena respnd is send its mist come before the route handler

// use a third party middle (MORGAN (a login  middleware that will allow us to see request data right in the console))
