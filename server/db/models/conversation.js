const { DataTypes } = require('sequelize');
const db = require('../db');

const Conversation = db.define('conversation', {
  conversationId: {
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  }
});


module.exports = Conversation;
