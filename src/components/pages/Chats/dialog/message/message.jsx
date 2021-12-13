import { users } from "../../../../../../assets/chat/users";
import React from "react";
import classes from "./message.module.scss";
export const Message = ({ time, owner, text, ourMessage }) => {
  const { image } = users.filter(({ id }) => id === owner)[0];
  const isPC = matchMedia("(min-width: 1400px)").matches;

  
  return (
    <div
      className={classes.message}
      style={{
        width: isPC ? "100%" : "80%",
        left: ourMessage  ? isPC ?  "40%" : '15%' : isPC ? "10%" : '5%',
        
      }}
    >
      {!ourMessage ? (
        <img
          src={`../${image}`}
          alt=""
          className={classes.message__img}
          style={{ left: ourMessage && isPC ? "100%" : "-10%", top: 10 }}
        />
      ) : (
        ""
      )}
      <div className={classes.message__text}>
        <div
          className={classes.message__title}
          style={{ fontSize: isPC ? "100%" : "90%" }}
        >
          {text}
        </div>
        <div
          className={classes.message__time}
          style={{ left: ourMessage && isPC ? "90%" : "0%" }}
        >
          {time}
        </div>
      </div>
      {ourMessage ? (
        <img
          src={`../${image}`}
          alt=""
          className={classes.message__img}
          style={{ left: ourMessage && isPC ? "103%" : "-10%", bottom: 10 }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
