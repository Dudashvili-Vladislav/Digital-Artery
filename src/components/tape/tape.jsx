import { Post } from "@/components/tape/post/post";
import classes from "@/styles/tape/tape.module.scss";
import React, { useRef } from "react";
import { useLike } from "../../hooks/useLikes";


export const Tape = ({ images }) => {
  const tape = useRef();
  useLike(tape)
  return (
    <div className={classes.images} ref={tape}>
      {images.map((el, i) => (
        <Post image={el} key={i} />
      ))}
    </div>
  );
};
