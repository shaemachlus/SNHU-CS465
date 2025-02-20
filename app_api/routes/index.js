const express = require("express"); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
});

// This is where we import the controllers we will route
const authController = require("../controllers/authentication");
const tripsController = require("../controllers/trips");

router.route("/login").post(authController.login);

router.route("/register").post(authController.register);

// define route for our trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip); // GET Method routes tripList
// GET Method routes tripsFindByCode - requires parameter
// POST Method Adds a Trip
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindCode)
  .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
