const {
    setTokenCookie,
    requireAuth,
    restoreUser,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");
const asyncHandler = require("express-async-handler");

// router imports ------------------------------

const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const bookingsRouter = require("./bookings.js");
const reviewsRouter = require("./reviews.js");
const spotImagesRouter = require("./images.js");
const reviewImagesRouter = require("./reviewImages.js");

// ---------------------------------------------

// routers -------------------------------------

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use("/bookings", bookingsRouter);
router.use("/reviews", reviewsRouter);
router.use("/spotImages", spotImagesRouter);
router.use("/reviewImages", reviewImagesRouter);

// ---------------------------------------------
// write test routes below

module.exports = router;
