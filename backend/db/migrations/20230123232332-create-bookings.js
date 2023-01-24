"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("Bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            spot_id: {
                type: Sequelize.INTEGER,
                references: { model: "Spots" },
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "Users" },
            },
            start_date: {
                type: Sequelize.DATE,
            },
            end_date: {
                type: Sequelize.DATE,
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
        options.tableName = "Bookings";
        return queryInterface.dropTable("Bookings");
    },
};
