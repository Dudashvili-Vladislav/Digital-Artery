import { Post } from "@/components/tape/post/post";
import classes from "@/styles/tape/tape.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { likeHandler } from "@utils/likeHandler";

export const Tape = ({ images }) => {
  const history = useHistory();

  return (
    <div className={classes.images} onClick={(e) => likeHandler(e, history)}>
      {images.map((el, i) => (
        <Post image={el} key={i} />
      ))}
    </div>
  );
};
