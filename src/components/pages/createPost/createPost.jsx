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

export const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [uploaded, setUploaded] = useState([]);
  const [files, setFiles] = useState([]);
  const token = useSelector((token) => token.user.id);
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const res = await requests.image.create({
        ...data,
        files: [...files],
      });

      M.toast({ html: "post succes created", classes: "succes" });
      history.push(`/image/${res.data.id}`);
    } catch (e) {
      M.toast({ html: e.response.data.error, classes: "error" });
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((el) => el !== prev[index]));
    setUploaded((prev) => prev.filter((el) => el !== prev[index]));
  };

  const changeFilesHandler = (e) => {
    [...e.target.files].forEach((el) => {
      if (files.filter((element) => el.name === element.name).length !== 0)
        return;
      setFiles((prev) => [...prev, el]);
      let reader = new FileReader();
      reader.addEventListener("load", handleFile);
      reader.readAsDataURL(el);
    });
  };
  const handleFile = (e) => {
    const content = e.target.result;

    setUploaded((prevState) => [...prevState, content]);
    // You can set content in state and show it in render.
  };

  return token ? (
    <div className={classes.page}>
      <div className={classes.form__wrapper}>
        <form
          action=""
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.form__title}>Post game</div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              {...register("name")}
              required
            />
            <span className={classes.form__bar}></span>
            <label>Game name</label>
          </div>

          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("external_url")}
              required
            />
            <span className={classes.form__bar}></span>
            <label>Game Url</label>
          </div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("tags")}
              required
            />
            <span className={classes.form__bar}></span>
            <label>Tags</label>
          </div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              type="text"
              {...register("category")}
              required
            />
            <span className={classes.form__bar}></span>
            <label>Categories</label>
          </div>
          <div className={classes.form__group}>
            <textarea
              className={classes.form__input}
              type="text"
              {...register("caption")}
              required
            />
            <span className={classes.form__bar}></span>
            <label>Caption</label>
          </div>

          <div className={classes.form__uploaded}>
            <Swiper {...settings} slidesPerView={3}>
              {uploaded.map((el, i) => (
                <SwiperSlide key={i}>
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
              <SwiperSlide>
                <div className={classes.form__file}>
                  <div
                    className={classes.form__file_wrap}
                    style={{ marginTop: uploaded.length > 0 ? "60px" : "0px" }}
                  >
                    <input
                      type="file"
                      {...register("files")}
                      onChange={changeFilesHandler}
                      accept=".png, .jpg, .gif"
                      multiple
                      className={classes.upload}
                      style={{ height: uploaded.length > 0 ? "100%" : "90px" }}
                      required
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <button className={classes.form__button}>Create Post</button>
        </form>
      </div>
    </div>
  ) : (
    <div className={classes.not__auth}>
      to create post{" "}
      <NavLink className={classes.not__auth_link} to={"/auth/authorization"}>
        sign in
      </NavLink>
    </div>
  );
};
