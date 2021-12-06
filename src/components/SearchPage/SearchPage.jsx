import { useState, useEffect } from "react";
import React from "react";
import { tags as TagsImported } from "../../../assets/tags/tags";
import { Tag } from "./tag/Tag";
import { colors } from "../../../assets/tags/colors";

import classes from "./Search.module.scss";
import "./index.scss";
import SearchInput from "./searchInput/SearchInput";
import { Categories } from "./categories/Categories";

const SearchPage = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(TagsImported);
  }, []);
  let renderedTag = [];
  const clickOnTag = (e) => {
    if (e.target.classList.contains("tag")) {
      e.target.classList.toggle("active");
    }
  };
  const checkViewport = (query, quantity) => {
    matchMedia(`(min-width: ${query}px)`).matches
      ? (renderedTag = tags.map((el, i) =>
          i < quantity ? (
            <Tag
              title={el}
              key={i}
              color={colors[Math.floor(Math.random() * colors.length)]}
            />
          ) : (
            ""
          )
        ))
      : "";
  };
  console.log(matchMedia("(min-width: 767px)").matches);
  checkViewport(320, 7);
  checkViewport(350, 9);
  checkViewport(400, 10);
  checkViewport(768, 15);
  checkViewport(1000, 20);
  checkViewport(1200, 25);
  checkViewport(1400, tags.length);

  return (
    <div>
      <SearchInput />
      <div className={classes.tags} onClick={clickOnTag}>
        {renderedTag}   
      </div>
      <Categories />
    </div>
  );
};

export default SearchPage;
