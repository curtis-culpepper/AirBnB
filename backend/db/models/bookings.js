"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bookings extends Model {
        // get all of the current users bookings with URL: /api/bookings/current
        static async getBookingsByUser(userId) {
            const bookings = await Bookings.findAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        association: "Spot",
                        attributes: [
                            "id",
                            "name",
                            "description",
                            "price",
                            "lat",
                            "lng",
                        ],
                    },
                    {
                        association: "User",
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            });
            return bookings;
        }
        // get all of the bookings for a spot by a spot's id with URL: /api/spots/:spotId/bookings
        static async getBookingsBySpot(spotId) {
            const bookings = await Bookings.findAll({
                where: {
                    spot_id: spotId,
                },
                include: [
                    {
                        association: "Spot",
                        attributes: [
                            "id",
                            "name",
                            "description",
                            "price",
                            "lat",
                            "lng",
                        ],
                    },
                    {
                        association: "User",
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            });
            return bookings;
        }
        // create a booking for a spot based on the spot's id with URL: /api/spots/:spotId/bookings
        static async createBooking({ userId, spotId, ...rest }) {
            const booking = await Bookings.create({
                user_id: userId,
                spot_id: spotId,
                ...rest,
            });
            return booking;
        }
        // delete a booking based on the booking's id with URL: /api/bookings/:bookingId
        static async deleteBooking(bookingId) {
            const booking = await Bookings.findByPk(bookingId);
            await booking.destroy();
            return booking;
        }

        static associate(models) {
            Bookings.belongsTo(models.Users, { foreignKey: "user_id" });
            Bookings.belongsTo(models.Spots, { foreignKey: "spot_id" });
        }
    }
    Bookings.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            spot_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Bookings",
        }
    );

    return Bookings;
};
