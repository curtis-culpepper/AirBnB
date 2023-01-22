"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            "Spots",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },
                address: {
                    type: Sequelize.STRING(256),
                    allowNull: false,
                },
                city: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                state: {
                    type: Sequelize.STRING(2),
                    allowNull: false,
                },
                country: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                latitude: {
                    type: Sequelize.DECIMAL(10, 8),
                    allowNull: false,
                },
                longitude: {
                    type: Sequelize.DECIMAL(11, 8),
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING(256),
                    allowNull: false,
                },
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            options
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = "Spots";
        return queryInterface.dropTable(options);
    },
};
