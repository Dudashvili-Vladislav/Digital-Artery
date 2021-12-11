import { Dialog } from "./dialog/dialog";
import React, { useEffect, useState } from "react";
import { createChats } from "../../../../assets/chat/chats";
import { Chat } from "./Chat/Chat";
import classes from "./Chats.module.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { Route } from "react-router-dom";
import { CacheSwitch } from "react-router-cache-route";
import { useSelector } from "react-redux";

export const Chats = () => {
  const chats = createChats();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(0);
  useEffect(() => {
    dispatch(actions().setUser(5));
  }, []);
  const userId = useSelector((state) => state.user.id);

  const isPC = matchMedia("(min-width: 1300px)").matches;
  const changeChat = (id) => setCurrentUser(id);

  const chatsRendered = chats.map(({ messages, user }, i) => (
    <div onClick={() => changeChat(i)}>
      <Chat lastMessage={messages[messages.length - 1]} user={user} key={i} />
    </div>
  ));

  return (
    <div>
      {userId ? (
        <div className={classes.chats}>
          <div
            className={classes.chatsTitles}
            style={{ marginRight: isPC ? "50px" : "0px" }}
          >
            {chatsRendered}
          </div>
          {isPC ? (
            <div className={classes.dialog}>
              <Dialog messages={chats[currentUser].messages}  id = {userId}/>
            </div>
          ) : (
            <CacheSwitch>
              <Route path="chats/1">
                {" "}
                <Dialog messages={chats[currentUser].messages}  id = {userId}/>
              </Route>
            </CacheSwitch>
          )}
        </div>
      ) : (
       <div className={classes.not__auth}>Авторизуйтесь</div> 
      )}
    </div>
  );
};
