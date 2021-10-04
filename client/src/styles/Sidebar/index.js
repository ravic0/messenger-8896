import { makeStyles } from '@material-ui/core/styles';

export const badgeAvatarStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  online: {
    backgroundColor: '#1CED84',
  },
  sidebar: {
    marginLeft: 17,
  },
}));

export const chatStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

export const chatContentStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
    position: 'relative',
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  messageContainer: {
    position: 'absolute',
    height: '20px',
    width: '25px',
    border: '1px solid #fff',
    padding: '2px',
    backgroundColor: '#3A8DFF',
    borderRadius: '10px',
    right: '10px',
    top: '5px',
    textAlign: 'center',
  },
  messageCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  previewUnseenText: {
    fontWeight: 'bold',
    color: '#000',
  },
}));

export const currentUserStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 17,
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5,
  },
}));

export const searchStyles = makeStyles(() => ({
  filledInput: {
    height: 50,
    background: '#E9EEF9',
    borderRadius: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#99A9C4',
    letterSpacing: 0,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    '&::placeholder': {
      color: '#ADC0DE',
      opacity: 1,
    },
  },
}));

export const sidebarStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));
