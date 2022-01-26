import { Post } from "@/components/ui/tape/post/post";
import "@/styles/tape/tape.scss";
import React, { useRef } from "react";
import { useLike } from "../../../hooks/useLikes";


export const Tape = ({ images }) => {
  console.log(images)
  const tape = useRef(undefined);
  useLike(tape)
  return (
    <div className="images" ref={tape}>
      {images.map((el,i) => (
        <Post image={el} key={i} i = {i}/>
      ))}
    </div>
  );
};
