import requests from "../../../api/requests";
import React, { useEffect, useState } from "react";
import { createChats } from "../../../../assets/chat/chats";
import { Chat } from "./Chat/Chat";
import classes from "./Chats.module.scss";
import { Dialog } from "./dialog/dialog";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export const chats = createChats(); // Создаем все чаты кастомной функцией

export const Chats = () => {
  const [currentUser, setCurrentUser] = useState(3); // id пользователя, с которым переписка
  const userId = useSelector((state) => state.user.id); // Получаем id текущего пользователя(авторизованного)
  const [ourID, setOurId] = useState(3);
  const changeChat = (id) => {
    setCurrentUser(id);
  };

  const isPC = matchMedia("(min-width: 1400px)").matches;

  const chatsRendered = chats.map(({ messages, user }, i) =>
    isPC ? (
      <div onClick={() => changeChat(i)} key={i}>
        <Chat lastMessage={messages[messages.length - 1]} user={user} key={i} />
      </div>
    ) : (
      <NavLink to={`chats/${i}`} key={i}>
        <div onClick={() => changeChat(i)}>
          <Chat
            lastMessage={messages[messages.length - 1]}
            user={user}
            key={i}
          />
        </div>
      </NavLink>
    )
  );

  return (
    <div>
      {userId || userId === 0 ? (
        <div className={classes.chats}>
          <div
            className={classes.chatsTitles}
            style={{ marginRight: isPC ? "50px" : "0px" }}
          >
            {chatsRendered}
          </div>
          {isPC ? (
            <div className={classes.dialog}>
              <Dialog messages={chats[currentUser].messages} id={ourID} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={classes.not__auth}>
          Please <NavLink to="/auth/authorisation">log in</NavLink>
        </div>
      )}
    </div>
  );
};
