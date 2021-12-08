import { users } from "../../../../../../assets/chat/users";
import React from "react";
import classes from "./message.module.scss";
export const Message = ({ time, owner, text, ourMessage }) => {
  const { image } = users.filter(({ id }) => id === owner)[0];

  return (
    <div
      className={classes.message}
      style={{
        left: ourMessage ? "40%" : "10%",
      }}
    >
      {!ourMessage ? (
        <img
          src={`../${image}`}
          alt=""
          className={classes.message__img}
          style={{ left: ourMessage ? "100%" : "-10%", top: 10 }}
        />
      ) : (
        ""
      )}
      <div className={classes.message__text}>
        <div className={classes.message__title}>{text}</div>
        <div className={classes.message__time} style ={{left: ourMessage ? '90%' : '0%'}}>{time}</div>
      </div>
      {ourMessage ? (
        <img
          src={`../${image}`}
          alt=""
          className={classes.message__img}
          style={{ left: ourMessage ? "103%" : "-10%", bottom: 10 }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
