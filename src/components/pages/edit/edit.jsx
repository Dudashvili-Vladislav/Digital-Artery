import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import requests from "../../../api/requests";
import { settings } from "../../slider/sliderSettings";
import { Spinner } from "../../ui/spinner/spinner";
import React from "react";
import classes from "@styles/edit/edit.module.scss";
import { useHistory } from "react-router-dom";

export const Edit = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();
  const [form, setForm] = useState();

  useEffect(() => {
    const getPost = async () => {
      const post = (await requests.image.get(id)).data;
      setForm(post);
    };
    getPost();
  }, []);

  const removeImg = (e) => {
    if (e.target.classList.contains(classes.image__item)) {
      setForm({
        ...form,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requests.edit.put(form, id);
      history.push(`/image/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e) => {
    if (e.target.classList.contains(classes.form__input)) {
      const name = e.target.name;
      setForm({ ...form, [name]: e.target.value });
    }
  };

  return form ? (
    <form className={classes.form} onSubmit={onSubmit}>
      <div onClick={removeImg}>
        <Swiper {...settings} slidesPerView={3} className={classes.images}>
          {form.images.map((el, i) => (
            <SwiperSlide key={i}>
              <img
                src={el?.file}
                alt="image item"
                data-id={i}
                className={classes.image__item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={classes.form__group}>
        <input
          className={classes.form__input}
          name="name"
          value={form.name}
          onChange={onChange}
        />
        <span className={classes.form__bar}></span>
      </div>
      <div className={classes.form__group}>
        <input
          className={classes.form__input}
          name="caption"
          value={form.caption}
          onChange={onChange}
        />
      </div>
      <div className={classes.form__group}>
        <input
          className={classes.form__input}
          name="tags"
          value={form.tags}
          onChange={onChange}
        />
      </div>
      <div className={classes.form__group}>
        <input
          className={classes.form__input}
          name="external_url"
          value={form.external_url}
          onChange={onChange}
        />
      </div>
      <div className={classes.form__group}>
        <input
          className={classes.form__input}
          name="category"
          value={form.category}
          onChange={onChange}
        />
      </div>
      <button className={classes.form__button}>update post</button>
    </form>
  ) : (
    <Spinner />
  );
};
