import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import moment from 'moment';
import { updateReadMessages } from '../../store/utils/thunkCreators';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';

const Messages = (props) => {
  const { id, messages, otherUser, userId, updateReadMessages } = props;

  useEffect(() => {
    if (
      messages &&
      messages[messages.length - 1] &&
      messages[messages.length - 1].senderId === otherUser.id
    ) {
      updateReadMessages({
        id,
        otherUser,
      });
    }
  }, [id, messages, otherUser, userId, updateReadMessages]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            hasReadLast={message.id === otherUser.lastReadId}
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { conversations: state.conversations };
};

const mapDispatchToProps = (dispatch) => {
  return { updateReadMessages: (message) => dispatch(updateReadMessages(message)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
