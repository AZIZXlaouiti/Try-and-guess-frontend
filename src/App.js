import React, { useState, useEffect } from "react";
import Cable from "actioncable";
import Canvas from "./components/static/Canvas";
import { useDispatch, useSelector } from "react-redux";
import { setCanvasSubscription } from "./actions/connection";
import { setChatSubscription } from "./actions/connection";
import { setChats } from "./actions/chatLogs";
import { setLines } from "./actions/canvasLogs";
import ChatForm from "./components/static/ChatForm";
import ChatList from "./components/static/ChatList";
import Timer from "./components/static/Timer";
import SessionFrom from "./components/sessions/sessionForm";
import { getCurrentUser } from "./components/sessions/auth";
import { Link } from "@mui/material";
import Words from "./components/static/Words";
import UserList from "./components/static/UserList";
import { CircularProgress } from "@mui/material";
const App = () => {
  const session = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connections.subscriptions);
  const token = localStorage.getItem("token");

  const [state, setState] = useState({
    mode: "draw",
    pen: "up",
    lineWidth: 10,
    penColor: "black",
  });
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };

  useEffect(() => {
    const createSocket = () => {
      const cable = Cable.createConsumer("ws://localhost:3001/cable");
      const canvasConnection = cable.subscriptions.create(
        {
          channel: "SketchChannel",
        },
        {
          connected: () => {
            //
          },
          received: async (data) => {
            dispatch(setLines(data));
          },
          create: (canvasContent) => {
            canvasConnection.perform("create", {
              canvas: canvasContent,
            });
          },
        }
      );

      const chatConnection = cable.subscriptions.create(
        {
          channel: "ChatChannel",
          user: session.currentUser.user.username,
        },
        {
          connected: () => {},
          received: async (data) => {
            //refactor to switch later
            if (data.join) {
              dispatch({
                type: "ADD_USER",
                payload: { users: data.connected, turn: data.turn },
              });
              dispatch({ type: "ADD_CHAT", payload: data.join });
            } else if (data.leave) {
              dispatch({
                type: "ADD_USER",
                payload: { users: data.connected, turn: data.turn },
              });
              dispatch({ type: "ADD_CHAT", payload: data.leave });
            } else if (data.word) {
              dispatch({ type: "SELECTED_WORD", payload: data.word.word });
            } else if (data.timer) {
              dispatch({ type: "START_TIMER", payload: data.timer });
            } else if (data.user) {
              dispatch({ type: "ADD_SCORE", payload: data.user });
            } else {
              const resp = await JSON.parse(data);
              dispatch({ type: "ADD_CHAT", payload: resp.chat_messages });
            }
          },
          create: (chatContent) => {
            chatConnection.perform("create", {
              content: chatContent,
              user_id: session.currentUser.user.id,
            });
          },
          guess: () => {
            chatConnection.perform("guess", {
              user_id: session.currentUser.user.id,
            });
          },
          start: () => {
            chatConnection.perform("start");
            chatConnection.perform("start_timer");
          },
        }
      );

      dispatch(setCanvasSubscription(canvasConnection));
      dispatch(setChatSubscription(chatConnection));
    };

    if (session.loggedIn) {
      createSocket();
    }
  }, [session.loggedIn, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, []);

  if (!session.loggedIn) {
    return (
      <>
        <SessionFrom />
      </>
    );
  }
  return (
    <>
        <Link
          variant="subtitle2"
          underline="hover"
          component="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
            connection.chats.unsubscribe({
              user: session.currentUser.user.username,
            });
            connection.canvas.unsubscribe();
          }}
        >
          logout
        </Link>
        <Words />
        <Timer />
        <UserList />
        <Canvas />
        <ChatList />
        <ChatForm />
      <footer>
        <h4>Pen by mohamed aziz laouiti</h4>
      </footer>
    </>
  );
};

export default App;
