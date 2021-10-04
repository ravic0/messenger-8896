const { DataTypes } = require("sequelize");
const db = require("../db");

const Read = db.define("readMessage", {
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Read;