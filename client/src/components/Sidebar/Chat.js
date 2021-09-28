import React from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { setActiveChat } from '../../store/activeConversation';
import { connect } from 'react-redux';
import { chatStyles } from '../../styles';

const useStyles = chatStyles;

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, setActiveChat } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
