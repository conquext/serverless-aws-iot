import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import Guid from "guid";
import React, { useRef, useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import UserNamePrompt from "./components/UserNamePrompt";
import RealtimeClient from "./RealtimeClient";

const getClientId = () => "web-client:" + Guid.raw();
const getMessageId = () => "message-id:" + Guid.raw();

const initialState = {
  users: [],
  messages: [],
  clientId: getClientId(),
  isConnected: false,
};

const App = () => {
  const [state, updateState] = useState(initialState);
  const client = useRef(null);

  const setState = (st) => {
    const prevSt = { ...state };
    updateState(prevSt, { ...st });
  };

  const connect = (username) => {
    setState({ username });

    client.current = new RealtimeClient(state.clientId, username);

    client.current.connect().then(() => {
      setState({ isConnected: true });
      client.current.onMessageReceived((topic, message) => {
        if (topic === "client-connected") {
          setState({ users: [...state.users, message] });
        } else if (topic === "client-disconnected") {
          setState({
            users: state.users.filter(
              (user) => user.clientId !== message.clientId
            ),
          });
        } else {
          setState({ messages: [...state.messages, message] });
        }
      });
    });
  };

  const onSend = (message) => {
    client.current.sendMessage({
      username: state.username,
      message: message,
      id: getMessageId(),
    });
  };

  return (
    <div>
      <ChatWindow
        users={state.users}
        messages={state.messages}
        onSend={onSend}
      />
      <UserNamePrompt onPickUsername={connect} />
    </div>
  );
};

export default App;
