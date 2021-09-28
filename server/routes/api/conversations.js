const router = require('express').Router();
const { User, Conversation, Message } = require('../../db/models');
const { Op } = require('sequelize');
const onlineUsers = require('../../onlineUsers');

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ['id'],
      order: [[Message, 'createdAt', 'ASC']],
      include: [
        { model: Message, order: ['createdAt', 'ASC'] },
        {
          model: User,
          as: 'user1',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
      ],
    });

    // update conversations as per the latest message received
    conversations.sort(
      (c1, c2) =>
        c2.messages[c2.messages.length - 1].createdAt -
        c1.messages[c1.messages.length - 1].createdAt,
    );

    for (let i = conversations.length - 1; i >= 0; i--) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();


      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // get a count of unread messages between user and otherUser
      const read = convoJSON.messages.filter(
        (m) => m.msgRead && m.senderId !== convoJSON.otherUser.id,
      );
      convoJSON.otherUser.lastReadMessageId = read.length > 0 && read[read.length - 1].id;

      // if message is sent by the user himself, unread messages should be 0
      // if (convoJSON.messages && convoJSON.messages[convoJSON.messages.length - 1].senderId === userId)
      //   convoJSON.unreadCount = 0;
      // else 
      convoJSON.unreadCount =
        convoJSON.messages.filter((m) => !m.msgRead && m.senderId === convoJSON.otherUser.id)
          .length;

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;

      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
