import React from 'react';
import { Box, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { headerStyles } from '../../styles';

const useStyles = headerStyles;

const Header = (props) => {
  const classes = useStyles();
  const { username, online } = props;

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{username}</Typography>
        <Box className={`${classes.statusDot} ${classes[online && 'online']}`}></Box>
        <Typography className={classes.statusText}>{online ? 'Online' : 'Offline'}</Typography>
      </Box>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Box>
  );
};

export default Header;
