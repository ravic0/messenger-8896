import io from 'socket.io-client';
import store from './store';
import { removeOfflineUser, addOnlineUser, setRead } from './store/conversations';
import { handleNewMessage } from './store/utils/thunkCreators';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('connected to server');

  socket.on('add-online-user', (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on('remove-offline-user', (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on('toggle-read', (data) => {
    store.dispatch(setRead(data.userId, data.id));
  });

  // When there is a new message for this particular receiver, update their chat. Only for receiver.
  socket.on('new-message', (data) => {
    store.dispatch(handleNewMessage(data.message, data.sender, data.recipientId, data.otherUser));
  });
});

export default socket;
