"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class reviewImages extends Model {
        // delete an existing image for a review using /api/review-images/:imageId
        // must belong to current user
        static async deleteReviewImage(imageId, userId) {
            const image = await reviewImages.findByPk(imageId);
            if (image) {
                if (image.user_id === userId) {
                    await image.destroy();
                    return image;
                }
            }
            return null;
        }

        static associate(models) {
            reviewImages.belongsTo(models.Reviews, {
                foreignKey: "review_id",
            });
        }
    }
    reviewImages.init(
        {
            review_id: DataTypes.INTEGER,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "reviewImages",
        }
    );
    return reviewImages;
};
