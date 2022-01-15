import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import classes from "@styles/image/image.module.scss";
import { useEffect } from "react";
import requests from "../../../api/requests";
import { Spinner } from "@/components/spinner/spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import play from "../../../../assets/icons/play.svg";
import heart from "../../../../assets/icons/heart-icon.png";
import { NavLink } from "react-router-dom";
import "@styles/image/image.scss";
export const Image = ({ match }) => {
  const { id } = match.params;

  const [image, setImage] = useState();
  useEffect(() => {
    const getImage = async () => {
      try {
        const { data } = await requests.image.get(id);

        setImage(data);
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, []);

  return image ? (
    <div className={classes.image}>
      <div className={classes.image__wrap}>
        <div className={classes.gif__wrap}>
          <a href={image.external_url} target="_block">
            <img src={play} alt="play" className={classes.gif__wrap_play} />
          </a>

          <img
            src={image.images[image.images.length - 1].file}
            alt="gif"
            className={classes.image__gif}
          />
        </div>

        <div>
          {matchMedia("(min-width:1200px)").matches ? (
            <div className={classes.image__tape}>
              {image.images.map((el, i) =>
                i === image.images.length - 1 ? (
                  ""
                ) : (
                  <img
                    className={`${classes.image__tape_item} image__item-${
                      i + 1
                    }`}
                    src={el.file}
                    key={i}
                  />
                )
              )}
            </div>
          ) : (
            <Swiper
              touchRatio={3}
              speed={1000}
              slidesPerView={3}
              spaceBetween={5}
              autoHeight={true}
              loop={false}
              grabCursor={true}
              className={classes.image__slider}
              breakpoints={{
                "@0.75": {
                  slidesPerView: 3,
                },
                "@1.25": {
                  slidesPerView: 10,
                },
              }}
            >
              {image.images.map(({ file }, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={file}
                    className={classes.image__slider_item}
                    alt="slider item"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className={classes.image__text}>{image.name}</div>
      <div className={classes.image__container}>
        <div className={classes.image__likes}>
          <img src={heart} alt="" />
          <div>{image.num_vote_up}</div>
        </div>

        <div className={classes.image__description}>{image.caption}</div>
        <div className={classes.image__author}>
          <div className={classes.image__author_title}>Authors:</div>
          <NavLink to={`/user/detail/${image.user.username}`}>
            <div className={classes.image__author_wrap}>
              <img
                src={image.user.picture}
                alt="user image"
                className={classes.image__author_img}
              />
              <div className={classes.image__author_username}>
                {image.user.name || image.user.username}
              </div>
            </div>
          </NavLink>
        </div>
        <div className={classes.image__tags}>
          <div>tags: </div>
          <div className={classes.image__tags_tags}>
            {image.tags.split(",").map((el, i) => (i === 0 ? el : ", " + el))}
          </div>
        </div>
        <div className={classes.image__category}>
          category: {image.category}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
