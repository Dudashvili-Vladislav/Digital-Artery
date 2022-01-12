import { users } from "../../../../../../assets/chat/users";
import React from "react";
import classes from "@styles/chats/message/message.module.scss";
export const Message = ({ time, owner, text, ourMessage }) => {
  const { image } = users.filter(({ id }) => id === owner)[0];
  const isPC = matchMedia("(min-width: 1400px)").matches;

  return (
    <div
      className={classes.message__wrap}
      style={{ justifyContent: ourMessage ? "end" : "start" }}
    >
      <div className={classes.message}>
        <img
          src={`../${image}`}
          alt="user image"
          className={classes.message__img}
          style={{left: ourMessage ? '104%': '-40px'}}
        />
        
        <div className={classes.message__text}>
          <div
            className={classes.message__title}
            style={{ fontSize: isPC ? "100%" : "90%" }}
          >
            {text}
          </div>
          <div className={classes.message__time}>{time}</div>
        </div>
      </div>
    </div>
  );
};
