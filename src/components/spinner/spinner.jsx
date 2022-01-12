import classes from "@styles/spinner/spinner.module.scss";
import React from "react";
export const Spinner = () => {
  return (
    <div className={classes.spinner__wrap}>
      <div className={classes.loader}></div>
    </div>
  );
};
