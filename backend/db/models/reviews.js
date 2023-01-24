"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Reviews extends Model {
        // get all reviews of the current user with URL: /api/reviews/current
        static async getReviewsByUser(userId) {
            const reviews = await Reviews.findAll({
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
            return reviews;
        }
        // get all reviews of the current spot by a spot's id with /api/spots/:spotId/reviews
        static async getReviewsBySpot(spotId) {
            const reviews = await Reviews.findAll({
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
            return reviews;
        }
        // create a review for a spot based on the spot's id with /api/spots/:spotId/reviews
        static async createReview({ userId, spotId, ...rest }) {
            const review = await Reviews.create({
                user_id: userId,
                spot_id: spotId,
                ...rest,
            });
            return review;
        }
        // add an image to a review based on the review's id with /api/reviews/:reviewId/images
        static async addImageToReview({ reviewId, ...rest }) {
            const review = await Reviews.findByPk(reviewId);
            const image = await review.createReviewImage({
                ...rest,
            });
            return image;
        }
        // edit a review with /api/reviews/:reviewId
        static async editReview({ reviewId, ...rest }) {
            const review = await Reviews.findByPk(reviewId);
            const updatedReview = await review.update({
                ...rest,
            });
            return updatedReview;
        }
        // delete a review with /api/reviews/:reviewId
        static async deleteReview(reviewId) {
            const review = await Reviews.findByPk(reviewId);
            await review.destroy();
            return review;
        }

        static associate(models) {
            // define association here
            Reviews.belongsTo(models.Users, {
                foreignKey: "user_id",
                as: "User",
            });
            Reviews.belongsTo(models.Spots, {
                foreignKey: "spot_id",
                as: "Spot",
            });
            Reviews.hasMany(models.ReviewImages, {
                foreignKey: "review_id",
                as: "ReviewImages",
            });
        }
    }
    Reviews.init(
        {
            user_id: DataTypes.INTEGER,
            spot_id: DataTypes.INTEGER,
            review: DataTypes.STRING,
            stars: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: "Reviews",
        }
    );
    return Reviews;
};
