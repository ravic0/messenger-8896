import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { chatContentStyles } from '../../styles';

const useStyles = chatContentStyles;

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount } = conversation;

  // console.log('Conversation: ', conversation);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography className={`${classes.previewText}, ${(unreadCount > 0 && classes.previewUnseenText) || ' '}`}>
          {latestMessageText}
        </Typography>

        {unreadCount > 0 && (
          <Box className={classes.messageContainer}>
            <Typography className={classes.messageCount}>{unreadCount}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatContent;
