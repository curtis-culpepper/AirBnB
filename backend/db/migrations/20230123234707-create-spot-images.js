"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("spotImages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            spot_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Spots" },
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            preview: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        options.tableName = "spotImages";
        return queryInterface.dropTable("spotImages");
    },
};
