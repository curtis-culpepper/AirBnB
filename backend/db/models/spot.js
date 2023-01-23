"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        toSafeObject() {
            const { id, userId, name, description, price, lat, lng } = this; // context will be the Spot instance
            return { id, userId, name, description, price, lat, lng };
        }

        // create a new spot
        static async createSpot({ userId, ...rest }) {
            const spot = await Spot.create({
                userId,
                ...rest,
            });
            return spot;
        }
        // get all spots
        static async getAllSpots() {
            const spots = await Spot.findAll({
                include: [
                    {
                        association: "SpotImages",
                        attributes: ["id", "url", "preview"],
                    },
                    {
                        association: "Owner",
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            });
            return spots;
        }
        // get all spots owned by the current user
        static async getSpotsByUser(userId) {
            const spots = await Spot.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        association: "SpotImages",
                        attributes: ["id", "url", "preview"],
                    },
                    {
                        association: "Owner",
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            });
            return spots;
        }
        // get a spot by id
        static async getSpotById(id) {
            const spot = await Spot.findByPk(id, {
                include: [
                    {
                        association: "SpotImages",
                        attributes: ["id", "url", "preview"],
                    },
                    {
                        association: "Owner",
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            });
            return spot;
        }
        // add an image to a spot based on the spot's id
        static async addImageToSpot({ spotId, userId, url, preview }) {
            const spot = await Spot.findByPk(spotId);
            if (!spot) {
                const err = new Error("Spot not found");
                err.status = 404;
                err.title = "Spot not found";
                err.errors = ["Spot not found"];
                throw err;
            }
            if (spot.userId !== userId) {
                const err = new Error("Unauthorized");
                err.status = 401;
                err.title = "Unauthorized";
                err.errors = ["Unauthorized"];
                throw err;
            }
            const image = await SpotImage.create({
                spotId,
                url,
                preview,
            });
            return image;
        }
        // edit a spot
        static async editSpot({ id, userId, ...rest }) {
            const spot = await Spot.findByPk(id);
            if (!spot) {
                const err = new Error("Spot not found");
                err.status = 404;
                err.title = "Spot not found";
                err.errors = ["Spot not found"];
                throw err;
            }
            if (spot.userId !== userId) {
                const err = new Error("Unauthorized");
                err.status = 401;
                err.title = "Unauthorized";
                err.errors = ["Unauthorized"];
                throw err;
            }
            await spot.update(rest);
            return spot;
        }
        // delete a spot
        static async deleteSpot({ id, userId }) {
            const spot = await Spot.findByPk(id);
            if (!spot) {
                const err = new Error("Spot not found");
                err.status = 404;
                err.title = "Spot not found";
                err.errors = ["Spot not found"];
                throw err;
            }
            if (spot.userId !== userId) {
                const err = new Error("Unauthorized");
                err.status = 401;
                err.title = "Unauthorized";
                err.errors = ["Unauthorized"];
                throw err;
            }
            await spot.destroy();
            return { message: "Spot deleted" };
        }

        static associate(models) {
            Spot.belongsTo(models.User, { foreignKey: "userId" });
            Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
            Spot.hasMany(models.Booking, { foreignKey: "spotId" });
            Spot.hasMany(models.Review, { foreignKey: "spotId" });
        }
    }
    Spot.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "User ID cannot be empty",
                    },
                    isInt: {
                        msg: "User ID must be an integer",
                    },
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.address,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.city,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.state,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.country,
            },
            lat: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: Spot.validations.lat,
            },
            lng: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: Spot.validations.lng,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.name,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: Spot.validations.description,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: Spot.validations.price,
            },
        },
        {
            sequelize,
            modelName: "Spot",
        }
    );
    return Spot;
};
