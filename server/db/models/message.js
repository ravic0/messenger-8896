const { DataTypes } = require('sequelize');
const db = require('../db');

const Message = db.define('message', {
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Message;
