import { Post } from "@/components/ui/tape/post/post";
import "@/styles/tape/tape.scss";
import React, { useRef } from "react";
import { useLike } from "../../../hooks/useLikes";


export const Tape = ({ images }) => {
  const tape = useRef();
  useLike(tape)
  return (
    <div className="images" ref={tape}>
      {images.map((el) => (
        <Post image={el} key={el.id}/>
      ))}
    </div>
  );
};
