"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}
const { mapFinderOptions } = require("sequelize/types/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Reviews", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Users" },
            },
            spot_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Spots" },
            },
            review: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // stars must be an integer between 1 and 5
            stars: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        options.tableName = "Reviews";
        return queryInterface.dropTable("Reviews");
    },
};
