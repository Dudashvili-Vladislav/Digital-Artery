import { Post } from "@/components/tape/post/post";
import classes from "@/styles/tape/tape.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { useLike } from "../../hooks/useLike";
import { useRef } from "react";

export const Tape = ({ images }) => {
  const history = useHistory();
  const tape = useRef(images);
  useLike(tape);
  return (
    <div className={classes.images} ref={tape}>
      {images.map((el, i) => (
        <Post image={el} key={i} />
      ))}
    </div>
  );
};
