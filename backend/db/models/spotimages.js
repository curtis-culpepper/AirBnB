"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class spotImages extends Model {
        //    delete a spot image which must belong to current user with URL: /api/spot-images/:imageId
        static async deleteSpotImage(imageId, userId) {
            const image = await spotImages.findByPk(imageId);
            if (image) {
                if (image.user_id === userId) {
                    await image.destroy();
                    return image;
                }
            }
            return null;
        }

        static associate(models) {
            spotImages.belongsTo(models.Spots, {
                foreignKey: "spot_id",
            });
        }
    }
    spotImages.init(
        {
            spot_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Spots" },
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            preview: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "spotImages",
        }
    );
    return spotImages;
};
