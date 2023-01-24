"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Spots", {
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
            address: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            lat: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: false,
            },
            lng: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
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
        await queryInterface.dropTable("Spots");
    },
};
