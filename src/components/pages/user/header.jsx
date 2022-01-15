import React from "react";
import classes from "@styles/user/header.module.scss";
export const Header = ({ user }) => {
  return (
    <div className={classes.logo}>
      <img src={user.logo} alt="user picture" />
    </div>
  );
};
