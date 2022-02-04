import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "@styles/createPost/createPost.module.scss";
import requests from "../../../api/requests";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import cross from "../../../../assets/icons/cross.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { settings } from "../../slider/sliderSettings";
import { NavLink, useHistory } from "react-router-dom";
import { useRef } from "react";
import { useUploadFiles } from "../../../hooks/uploadFiles";
import plus from "../../../../assets/icons/plus.svg";

export const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);
  const token = useSelector((token) => token.user.id);
  const history = useHistory();

  const input = useRef();
  const [files, uiFiles, removeFile] = useUploadFiles(input);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await requests.image.create({
        ...data,
        files: [...files],
      });

      M.toast({ html: "post succes created", classes: "succes" });
      history.push(`/image/${res.data.id}`);
    } catch (e) {
      M.toast({ html: e.response.data.error, classes: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = (e) => {
    if (e.target.classList.contains(classes.form__label)) {
      const input =
        e.target.parentNode.querySelector("input") ||
        e.target.parentNode.querySelector("textarea");

      input.focus();
    }
  };

  return token ? (
    <div className={classes.page}>
      <div className={classes.form__wrapper}>
        <form
          action=""
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          onClick={handleInputClick}
        >
          <div className={classes.form__title}>Post game</div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              {...register("name")}
              required
            />
            <span className={classes.form__bar}></span>
            <label className={classes.form__label}>Game name</label>
          </div>

          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("external_url")}
              required
            />
            <span className={classes.form__bar}></span>
            <label className={classes.form__label}>Game Url</label>
          </div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("tags")}
              required
            />
            <span className={classes.form__bar}></span>
            <label className={classes.form__label}>Tags</label>
          </div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("category")}
              required
            />
            <span className={classes.form__bar}></span>
            <label className={classes.form__label}>Categories</label>
          </div>
          <div className={classes.form__group}>
            <textarea
              className={classes.form__input}
              type="text"
              {...register("caption")}
              required
            />
            <span className={classes.form__bar}></span>
            <label className={classes.form__label}>Caption</label>
          </div>

          <div className={classes.form__uploaded}>
            <Swiper
              {...settings}
              slidesPerView={5}
              autoHeight={true  }
              breakpoints={{
                "@0.25":{
                  slidesPerView: 3,
                },
                "@0.75": {
                  slidesPerView: 5,
                },
                "@1.25": {
                  slidesPerView: 5,
                },
              }}
            >
              {uiFiles.map((el, i) => (
                <SwiperSlide key={i} >
                  <div className={classes.img__wrap}>
                    <img
                      src={cross}
                      alt="cross"
                      className={classes.cross}
                      onClick={() => removeFile(i)}
                    />
                    <img src={el} alt="uploaded" />
                  </div>
                </SwiperSlide>
              ))}
              <SwiperSlide style = {{height: "100% "}}>
                <div className={classes.form__file}>
                  <img
                    src={plus}
                    alt="upload"
                    className={classes.form__file_img}
                  />
                  <input
                    type="file"
                    accept=".png, .jpg, .gif"
                    multiple
                    className={classes.upload}
                    ref={input}
                    required
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <button className={classes.form__button} disabled={isLoading}>
            Create Post
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className={classes.not__auth}>
      to create post{" "}
      <NavLink className={classes.not__auth_link} to={"/auth/authorisation"}>
        sign in
      </NavLink>
    </div>
  );
};
