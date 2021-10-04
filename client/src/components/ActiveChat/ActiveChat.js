import React from 'react';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { connect } from 'react-redux';
import { activeChatStyles } from '../../styles';

const useStyles = activeChatStyles;

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              id={conversation.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const conversation =
    state.conversations &&
    state.conversations.find(
      (conversation) => conversation.otherUser.username === state.activeConversation,
    );
  return {
    user: state.user,
    conversation,
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
