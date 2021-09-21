import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    //TODO: Step 4: When there is a new message for this particular receiver, update their chat. Only for receiver.
    // console.log("STEP 4: Received broadcast from server about a new message from a sender");
    // fetchConversations();
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
