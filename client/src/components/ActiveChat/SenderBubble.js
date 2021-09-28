import React from 'react';
import { Box, Typography, Avatar } from '@material-ui/core';
import { senderBubbleStyles } from '../../styles';

const useStyles = senderBubbleStyles;

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, hasReadLast, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {hasReadLast && (
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.readAvatar} />
      )}
    </Box>
  );
};

export default SenderBubble;
