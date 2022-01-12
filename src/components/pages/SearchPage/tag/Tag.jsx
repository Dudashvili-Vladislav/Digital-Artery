import React from "react";
import classes from "@styles/search/tag/Tag.module.scss";

export const Tag = ({ title, color }) => {
  
  return (
    <div className={`${classes.title} tag`} style={{ color: `#${color}` }}>
      {title}
    </div>
  );
};
