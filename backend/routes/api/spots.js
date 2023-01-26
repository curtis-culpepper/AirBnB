const { Spot } = require("../../db/models");
// Middleware
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// users must be authorized to access this route
const { requireAuth } = require("../../utils/auth");

// return all the spots
router
    .get(
        "/",
        asyncHandler(async (req, res) => {
            const spots = await Spot.findAll();
            return res.json({ spots });
        })
    )
    .catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    });

// get all spots owned by the current user
router
    .get(
        "/current",
        requireAuth,
        asyncHandler(async (req, res) => {
            const spots = await Spot.findAll({
                where: {
                    ownerId: req.user.id,
                },
            });
            return res.json({ spots });
        })
    )
    .catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    });

// get details of a spot from an id. error response if spot does not exist: 404, "Spot couldn't be found"
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const spot = await Spot.findByPk(req.params.id);
        if (spot) {
            return res.json({ spot });
        } else {
            return res.status(404).json({ error: "Spot couldn't be found" });
        }
    }).catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    })
);

// creates and returns a new spot. requires authorization. status code 201 if successful
// 400 if validation error with respone body containing the errors
router.post(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
        const {
            name,
            description,
            address,
            city,
            state,
            zip,
            lat,
            lng,
            price,
            imageUrl,
        } = req.body;
        const spot = await Spot.create({
            ownerId: req.user.id,
            name,
            description,
            address,
            city,
            state,
            zip,
            lat,
            lng,
            price,
            imageUrl,
        });
        return res.status(201).json({ spot });
    }).catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    })
);

// create and return a new image for a spot specified by id. require authorization. spot must belong to current user.
// status code 404 if spot not found with message: "Couldn't find a spot with the specified id"
router.post(
    "/:id/images",
    requireAuth,
    asyncHandler(async (req, res) => {
        const spot = await Spot.findByPk(req.params.id);
        if (spot) {
            const { imageUrl } = req.body;
            await spot.update({ imageUrl });
            return res.json({ spot });
        } else {
            return res
                .status(404)
                .json({ error: "Couldn't find a spot with the specified id" });
        }
    }).catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    })
);

// edit a spot. require authorization. spot must belong to current user.
// status code 400 if validation error
// status code 404 if spot not found
router.put(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const spot = await Spot.findByPk(req.params.id);
        if (spot) {
            const {
                name,
                description,
                address,
                city,
                state,
                zip,
                lat,
                lng,
                price,
                imageUrl,
            } = req.body;
            await spot.update({
                name,
                description,
                address,
                city,
                state,
                zip,
                lat,
                lng,
                price,
                imageUrl,
            });
            return res.json({ spot });
        } else {
            return res
                .status(404)
                .json({ error: "Couldn't find a spot with the specified id" });
        }
    }).catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    })
);

// delete a spot. require authorization. spot must belong to current user.
// status code 404 if spot not found with message: "Couldn't find a spot with the specified id"
router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const spot = await Spot.findByPk(req.params.id);
        if (spot) {
            await spot.destroy();
            return res.json({ spot });
        } else {
            return res
                .status(404)
                .json({ error: "Couldn't find a spot with the specified id" });
        }
    }).catch((res) => {
        if (res.name === "SequelizeValidationError") {
            const errors = res.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
    })
);
