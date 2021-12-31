import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { format } from "react-string-format";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import img_json from "../../../../assets/img_arr.json";
import requests from "../../../api/requests";
import { useEffect } from "react";
import { Spinner } from "../../spinner/spinner";

const ImageList = styled.ul`
  background-color: #070406;
  margin-top: 0px;
  gap: 5px;
  display: grid;
  overflow-y: auto;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style-type: none;

  @media (max-aspect-ratio: 3/4) {
    grid-template-columns: repeat(3, 1fr);
    .item0 {
      grid-row-end: span 2;
      grid-column-end: span 2;
    }
    .item1 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item2 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item3 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item4 {
      grid-row-end: span 2;
      grid-column-end: span 2;
    }
    .item5 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
  }

  @media (min-aspect-ratio: 5/4) {
    grid-template-columns: repeat(6, 1fr);
    .item0 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item1 {
      grid-row-end: span 2;
      grid-column-end: span 2;
    }
    .item2 {
      grid-row-end: span 2;
      grid-column-end: span 2;
    }
    .item3 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item4 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
    .item5 {
      grid-row-end: span 1;
      grid-column-end: span 1;
    }
  }
`;

const ImageListItem = styled.li`
  background-color: #070406;
  height: auto;
  display: flex;
  position: relative;
  cursor: pointer;
  .text {
    text-align: right;
    padding: 1px 3px;
    padding-top: 0px;
    height: 18px;
    width: 45px;
    top: 0px;
    right: 0px;
    position: absolute;

    background-size: cover;
    font-size: 14px;
    font-family: GeosansLight;
    color: #c5c5c5;
    background-image: url("../assets/icons/heart_background_black.png");
  }

  .sub-image {
    position: absolute;
    top: 25%;
    left: 25%;
    opacity: 0;
    width: 50%;
    height: 50%;
  }

  @keyframes pulse {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    10% {
      opacity: 0.25;
    }
    20% {
      opacity: 0.5;
    }
    30% {
      opacity: 0.65;
    }
    40% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.85;
    }
    60% {
      opacity: 0.75;
    }
    70% {
      opacity: 0.65;
    }
    80% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.25;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  flex-grow: 1;
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const ImgArray = ({ history }) => {
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  const getImages = async () => {
    setLoading(true);
    try {
      const res = (await requests.feed.get(5));
      if(res) setImages(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  let timeout = 0;
  useEffect(() => {
    getImages();
  }, []);
  function handleClick(e) {
    if (timeout === 0) {
      timeout = setTimeout(function () {
        history.push(`/images/${e.target.getAttribute("data-id")}`);
        timeout = 0;
      }, 250);
    } else {
      setLike(e);
      clearTimeout(timeout);
      timeout = 0;
    }
  }

  function cleanAnimate(e) {
    const elem = e.currentTarget.parentNode.querySelector(".sub-image");
    elem.style.animationName = "";
    elem.style.animationDirection = "";
  }
  function setLike(event) {
    const parent = event.currentTarget.parentNode;

    const text = parent.querySelector(".text");

    const elem = event.currentTarget.parentNode.querySelector(".sub-image");

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

  // const itemData = images.map((item, index) => {
  //   console.log(item.images[0].file);
  //   return {
  //     img: format(item.images[0].file),
  //     title: "title",
  //   };
  // });

  return loading || !images ? (
    <Spinner />
  ) : (
    <ImageList>
      {images.map((item, index) => (
        <ImageListItem className={format("item{0}", index % 6)} key={index}>
          <div className="text">{getRandomInt(1000) + 1}</div>
          <Image
            {...srcset(item.images[0].file, 121)}
            alt={item.title}
            loading="lazy"
          />

          <img
            {...srcset("../assets/icons/heart-icon.png", 121)}
            className="sub-image"
            onAnimationEnd={cleanAnimate}
            is-liked="false"
            onClick={handleClick}
            data-id={index}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default withRouter(ImgArray);
