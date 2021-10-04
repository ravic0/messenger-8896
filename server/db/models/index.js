const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const Group = require('./groups');
const Read = require('./read');

// associations

//User
User.hasMany(Conversation, { foreignKey: 'userId' });
User.hasMany(Group, { foreignKey: 'userId' });

//Conversation
Conversation.hasMany(Message, { foreignKey: 'conversationId' });

//Read
Read.belongsTo(Message, { foreignKey: "messageId" });

//Group
Group.belongsTo(User, { foreignKey: 'userId' });
Group.belongsTo(Conversation);

//Message
Message.hasMany(Read); // for groups
Message.belongsTo(Conversation, { foreignKey: "conversationId" });



module.exports = {
  User,
  Conversation,
  Message,
  Group,
  Read
};
