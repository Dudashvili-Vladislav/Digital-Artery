import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import requests from "../../../api/requests";
import { settings } from "../../slider/sliderSettings";
import { Spinner } from "../../ui/spinner/spinner";
import React from "react";
import classes from "@styles/edit/edit.module.scss";
import { useHistory } from "react-router-dom";
import cross from "../../../../assets/icons/cross.svg";
import plus from "../../../../assets/icons/plus.svg";

export const Edit = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();
  const [form, setForm] = useState({
    images: [],
    caption: "",
    name: "",
    tags: "",
    external_url: "",
    category: "",
  });
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  // const input = useRef();
  // const [files, uiFiles, removeFile, setUiFiles] = useUploadFiles(
  //   input,
  //   form.images
  // );

  useEffect(() => {
    const getPost = async () => {
      const post = (await requests.image.get(id)).data;
      setForm({ ...form, ...post });
      setUploaded(post.images.map((el) => el.file));
    };
    getPost();
  }, []);

  const handleFile = (e) => {
    const content = e.target.result;
    setUploaded((prevState) => [...prevState, content]);
  };

  const changeFilesHandler = (e) => {
    if (e.target.files.length + uploaded.length > 5)
      return M.toast({
        html: "Posts can't have more than 5 pictures.",
        classes: "error",
      });
    [...e.target.files].forEach((el) => {
      if (files.some((element) => el.name === element.name)) return;

      setFiles((prev) => [...prev, el]);
      let reader = new FileReader();
      reader.addEventListener("load", handleFile);
      reader.readAsDataURL(el);
    });
  };

  // const removeImg = (e) => {
  //   if (e.target.classList.contains(classes.image__icon)) {
  //     if (form.images.length === 1) {
  //       return M.toast({
  //         html: "Post must have at least 1 image",
  //         classes: "error",
  //       });
  //     }
  //     setForm({
  //       ...form,
  //       to_delete: [...form.to_delete, e.target.getAttribute("data-to-delete")],
  //       images: form.images.filter(
  //         (el) => form.images[e.target.getAttribute("data-id")].file != el.file
  //       ),
  //     });
  //   }
  // };

  console.log(files)
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uploaded.length <= 0)
        return M.toast({
          html: "The post must contain at least one image",
          classes: "error",
        });
      const res = await requests.edit.put(
        {
          ...form,
          images: [...files],
          toDelete,
        },
        id
      );
      history.push(`/image/${id}`);
    } catch (e) {
      console.log(e.response);
      M.toast({ html: e.response.data.detail, classes: "error" });
    }
  };

  const onChange = (e) => {
    if (e.target.classList.contains(classes.form__input)) {
      const name = e.target.name;
      setForm({ ...form, [name]: e.target.value });
    }
  };

  const deleteCurrentFile = (e) => {
    if (e.target.getAttribute("data-to-delete").startsWith("http")) {
      setToDelete([...toDelete, e.target.getAttribute("data-to-delete")]);
    }

    setUploaded((images) =>
      images.filter((el) => el !== e.target.getAttribute("data-to-delete"))
    );
  };

  return form ? (
    <form className={classes.form} onSubmit={onSubmit}>
      <div>
        <Swiper
          {...settings}
          slidesPerView={3}
          className={classes.images}
          autoHeight={false}
        >
          {uploaded.map((el, i) => (
            <SwiperSlide key={i} className={classes.image}>
              <img
                src={cross}
                alt="cross"
                className={classes.image__icon}
                data-to-delete={el}
                data-id={i}
                onClick={deleteCurrentFile}
              />
              <img src={el} alt="image item" className={classes.image__item} />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <div className={classes.form__file}>
              <div
                className={classes.form__file_wrap}
                style={{ marginTop: uploaded.length > 0 ? "60px" : "0px" }}
              >
                <img
                  src={plus}
                  className={classes.icon}
                  style={{
                    opacity: "0.5",
                    marginTop: uploaded.length > 0 ? "-60px" : "0px",
                  }}
                />
                <input
                  type="file"
                  accept=".png, .jpg, .gif"
                  multiple
                  className={classes.upload}
                  style={{ height: uploaded.length > 0 ? "100%" : "90px" }}
                  onChange={changeFilesHandler}
                />
              </div>
            </div>
          </SwiperSlide>
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
