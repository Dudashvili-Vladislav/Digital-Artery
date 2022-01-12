import { Post } from "@/components/tape/post/post";
import classes from "@/styles/tape/tape.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";

export const Tape = ({ images }) => {
  let timeout = 0;

  const history = useHistory();

  function handleClick(e) {
    if (e.target.classList.contains("sub-image")) {
      if (timeout === 0) {
        timeout = setTimeout(function () {
          history.push(`/image/${e.target.getAttribute("data-id")}`);
          timeout = 0;
        }, 250);
      } else {
        setLike(e.target);
        clearTimeout(timeout);
        timeout = 0;
      }
    }
  }
  function cleanAnimate(e) {
    const elem = e.target;
    elem.style.animationName = "";
    elem.style.animationDirection = "";
  }

  function setLike(event) {
    const parent = event.parentNode;

    const text = parent.querySelector("div");

    const elem = event.parentNode.querySelector(".sub-image");

    function toggleLike(direction) {
      elem.style.animationName = "pulse";
      elem.style.animationDuration = "0.75s";
      elem.style.animationDirection = direction;
    }

    if (JSON.parse(elem.getAttribute("is-liked"))) {
      return;
    }
    text.innerText = parseInt(text.innerText) + 1;

    const opacity = elem.style.opacity;

    if (opacity != 0.0) {
      elem.style.opacity = 0.0;
    } else {
      toggleLike();
      elem.setAttribute("is-liked", true);
      elem.offsetParent.children[0].style.backgroundImage =
        'url("../assets/icons/heart_background_white.png")';
    }
  }

  return (
    <div
      className={classes.images}
      onClick={handleClick}
      onAnimationEnd={cleanAnimate}
    >
      {images.map((el, i) => (
        <Post image={el} key={i} />
      ))}
    </div>
  );
};
