import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { currentUserStyles } from '../../styles';

const useStyles = currentUserStyles;

const CurrentUser = (props) => {
  const classes = useStyles();

  const user = props.user || {};

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <MoreHorizIcon classes={{ root: classes.ellipsis }} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CurrentUser);
