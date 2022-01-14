import classes from "@/styles/tape/post.module.scss";
import React from "react";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const Post = ({ image }) => {
  return (
    <div className={classes.image}>
      <div className={classes.image__text}>{image.num_vote_up}</div>
      <img
        className={classes.image__item}
        {...srcset(image.images[0].file, 121)}
        alt={image.title}
        loading="lazy"
      />
      <img
        {...srcset("../assets/icons/heart-icon.png", 121)}
        className="sub-image"
        data-id={image.id}
      />
    </div>
  );
};
