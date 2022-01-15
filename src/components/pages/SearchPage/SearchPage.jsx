import { useState, useEffect } from "react";
import React from "react";
import requests from "../../../api/requests";
import { Tag } from "./tag/Tag";

import "@styles/search/index.scss";
import classes from "@styles/search/searchpage.module.scss";
import "@styles/search/input.scss";

import { Categories } from "./categories/Categories";
import { Spinner } from "@/components/spinner/spinner";
import { useHistory } from "react-router-dom";
import { colors } from "../../../../assets/tags/colors";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const SearchPage = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const changeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const getAllTags = async () => {
    setLoading(true);
    try {
      const tagsRes = await requests.tags.get();
      setTags(tagsRes.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    history.push(`/results/${searchValue}`);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const clickOnTag = (e) => {
    if (e.target.classList.contains("tag")) {
      setSearchValue(e.target.innerText);
      history.push(`/results/${e.target.innerText}`);
    }
  };
  const getRandomColor = () => {
    const randomNum = Math.floor(Math.random() * (colors.length - 1));

    return colors[randomNum];
  };

  return (
    <div className={classes.container}>
      <form action="" onSubmit={submitForm}>
        <div className="input">
          <input
            type="search"
            placeholder="Search Artist, Style or Collection"
            value={searchValue}
            onChange={changeHandler}
          />
        </div>
      </form>

      <div className="tags" onClick={clickOnTag}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Swiper slidesPerView="auto" className={classes.tags__wrap}>
            {tags.map((el, i) => (
              <SwiperSlide style={{ width: "auto" }}>
                <Tag key={i} title={el} color={getRandomColor()} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Categories />
    </div>
  );
};

export default SearchPage;
