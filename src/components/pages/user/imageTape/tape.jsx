import React, { useRef } from "react";
import { useLike } from "../../../../hooks/useLikes";
import { Post } from "@components/ui/tape/post/post.jsx";
import  "@styles/user/tape.scss";
export const UserTape = ({ images }) => {
  const imagesWrap = useRef();
  useLike(imagesWrap);
  return (
    <div ref={imagesWrap} className="tape">
      {images.map((el, i) => (
        <Post image={el} key={i} />
      ))}
    </div>
  );
};
