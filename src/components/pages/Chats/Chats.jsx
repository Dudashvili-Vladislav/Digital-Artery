import { Dialog } from "./dialog/dialog";
import React, { useEffect, useState } from "react";
import { createChats } from "../../../../assets/chat/chats";
import { Chat } from "./Chat/Chat";
import classes from "./Chats.module.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export const chats = createChats(); // Создаем все чаты кастомной функцией

export const Chats = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(3); // id пользователя, с которым переписка

  useEffect(() => {
    dispatch(actions.setUser(5)); // Устанавливаем пользователя, который сейчас авторизован на страничке
  }, []);

  const userId = useSelector((state) => state.user.id); // Получаем id текущего пользователя(авторизованного)

  const changeChat = (id) => {
    setCurrentUser(id);
  };

  const isPC = matchMedia("(min-width: 1400px)").matches;

  const chatsRendered = chats.map(({ messages, user }, i) =>
    isPC ? (
      <div onClick={() => changeChat(i)}>
        <Chat lastMessage={messages[messages.length - 1]} user={user} key={i} />
      </div>
    ) : (
      <NavLink to={`chats/${i}`}>
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
              <Dialog messages={chats[currentUser].messages} id={userId} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={classes.not__auth}>Авторизуйтесь</div>
      )}
    </div>
  );
};
