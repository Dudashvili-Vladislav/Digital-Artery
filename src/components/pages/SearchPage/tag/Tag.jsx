import React from "react";
import classes from "./Tag.module.scss";

export const Tag = ({ title }) => {
  return <div className={`${classes.title} tag`}>{title}</div>;
};
