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
            stars: {
                type: Sequelize.FLOAT,
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
