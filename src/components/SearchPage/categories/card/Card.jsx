import React from "react";
import classes from "./Card.module.scss";
export const Card = ({ img, title }) => {
  return(
      <div className = {classes.card} >
          <div className={classes.img} style = {{backgroundImage : `url(${img})`}}></div>
          <div className = {classes.title}>{title}</div>
          
      </div>
  );
};
