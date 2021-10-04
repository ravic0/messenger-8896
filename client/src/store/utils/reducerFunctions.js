export const addMessageToStore = (state, payload) => {
  const { message, sender, activeChat } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      latestMessageText: message.text,
      unreadMessagesCount: sender.username === activeChat ? 0 : 1,
    };
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const conv = { ...convo };
      conv.messages.push(message);
      conv.latestMessageText = message.text;
      if (conv.otherUser.username !== activeChat && message.senderId === convo.otherUser.id)
        conv.unreadCount += 1;
      return conv;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const conv = { ...convo };
      conv.id = message.conversationId;
      conv.messages.push(message);
      conv.latestMessageText = message.text;
      return conv;
    } else {
      return convo;
    }
  });
};

export const setReadInStore = (state, userId, id) => {
  return state.map((convo) => {
    if (convo.id === id) {
      const convoCopy = { ...convo };
      convoCopy.unreadCount = 0;
      convoCopy.messages.forEach((m) => m.read = true);
      convoCopy.unreadMessages = [];
      const messages = convoCopy.messages.filter((m) => m.senderId === userId.id);
      if (messages.length > 0)
        convoCopy.otherUser.lastReadId =
          messages[messages.length - 1] && messages[messages.length - 1].id;
      else convoCopy.otherUser.lastReadId = undefined;
      return convoCopy;
    } else
      return convo;
  })
};