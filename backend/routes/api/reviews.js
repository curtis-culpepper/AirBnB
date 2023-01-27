// router for /api/reviews

const express = require("express");
const asyncHandler = require("express-async-handler");

const { Review, User, Spot } = require("../../db/models");

const router = express.Router();

// GET /api/reviews/current.

router.get(
    "/current",
    asyncHandler(async (req, res) => {
        const reviews = await Review.findAll({
            where: {
                userId: req.user.id,
            },
            include: Spot,
        });
        return res.json(reviews);
    })
);

// get all reviews by a spot's id
// error code 404 if spot not found with message "Spot couldn't be found"

router.get("spots/:spotId/reviews"),
    asyncHandler(async (req, res) => {
        const spotId = parseInt(req.params.spotId, 10);
        const spot = await Spot.findByPk(spotId);
        if (spot) {
            const reviews = await Review.findAll({
                where: {
                    spotId,
                },
                include: User,
            });
            return res.json(reviews);
        } else {
            const err = Error("Spot couldn't be found.");
            err.status = 404;
            err.title = "Spot not found.";
            return res.json(err);
        }
    });

// create and return a new review for a spot specified by id
// error code 400 if review is not valid with message "Validation error"
// error code 404 if spot not found with message "Spot couldn't be found"
// error code 403 if review from current user already exists for spot

// remove .catch and replace with proper method
router.post(
    "/spots/:spotId/reviews",
    asyncHandler(async (req, res) => {
        const spotId = parseInt(req.params.spotId, 10);
        const spot = await Spot.findByPk(spotId);
        if (spot) {
            const { rating, content } = req.body;
            const review = await Review.create({
                rating,
                content,
                userId: req.user.id,
                spotId,
            });
            return res.json(review);
        } else {
            const err = new Error("Spot couldn't be found.");
            err.status = 404;
            err.title = "Spot not found.";
            throw err;
        }
    })
        .catch((res) => {
            if (res.name === "SequelizeValidationError") {
                const err = new Error("Validation error");
                err.errors = res.errors;
                err.status = 400;
                err.title = "Validation error";
                throw err;
            }
        })
        .catch((res) => {
            if (res.name === "SequelizeUniqueConstraintError") {
                const err = new Error("Review already exists");
                err.status = 403;
                err.title = "Review already exists";
                throw err;
            }
        })
);

// create and return a new image for a review specified by id
// require authentication
// require authorization. review must belong to current user
// reviews/:reviewid/images
// if error, 404 status with message "Review couldn't be found"
// if error, 403 status with message "Maximum number of images for this resource was reached"
