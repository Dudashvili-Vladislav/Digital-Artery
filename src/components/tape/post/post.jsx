import classes from "@/styles/tape/post.module.scss";
import React from "react";
import { useLocation } from "react-router-dom";
import heart from '../../../../assets/icons/heart-icon.png'
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const Post = ({ image }) => {
  const location = useLocation();
  
  return (
    <div className={classes.image}>
      <p className={`${classes.image__text} text`}>{image.num_vote_up}</p>
      <img
        className={classes.image__item}
        {...srcset(
          location.pathname.includes("/user/detail")
            ? image.images[image.images.length - 1].file
            : image.images[0].file,
          121
        )}
        alt={image.title}
        loading="lazy"
      />
      <img
        {...srcset(heart, 121)}
        className="sub-image"
        data-id={image.id}
      />
    </div>
  );
};
