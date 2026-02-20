const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();
//  router.param("id", tourController.checkID)
router
  .route(`/`)
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/top5tour')
  .get(tourController.top5tour, tourController.getAllTour);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthlyPlan/:year').get(tourController.getMonthlyPlan)
router
  .route(`/:id`)
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
