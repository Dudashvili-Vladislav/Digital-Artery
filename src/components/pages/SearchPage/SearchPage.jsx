import { useState, useEffect } from "react";
import React from "react";
import requests from "../../../api/requests";
import { Tag } from "./tag/Tag";
import classes from "./Search.module.scss";
import "./index.scss";
import styled from "styled-components";

import { Categories } from "./categories/Categories";
import { Spinner } from "../../spinner/spinner";
import { Users } from "./users/users";
import { useHistory } from "react-router-dom";

const StyledDiv = styled.div`
  text-align: center;
  padding-top: 20px;

  input {
    width: 70%;
    border-radius: 15px;
    background-color: #242424;
    font-family: inherit;
    font-size: 100%;
    color: white;
    border-color: transparent;
    padding-left: 10px;

    ::placeholder {
      text-align: left;

      color: #888888;
      font-size: 18px;
    }
  }

  input:focus {
    outline-color: #242424;
    text-align: left;
    color: white;
    padding-left: 10px;
    outline: none;
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 10px;
    background-image: url("../assets/icons/cancel.png");
    background-size: 10px 10px;
  }
`;

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

  // const checkViewport = (query, quantity) => {
  //   matchMedia(`(min-width: ${query}px)`).matches
  //     ? (renderedTag = tags.map((el, i) =>
  //         i < quantity ? (
  //           <Tag
  //             title={el}
  //             key={i}
  //             color={colors[Math.floor(Math.random() * colors.length)]}
  //           />
  //         ) : (
  //           ""
  //         )
  //       ))
  //     : "";
  // };
  // (matchMedia("(min-width: 767px)").matches);
  // checkViewport(320, 7);
  // checkViewport(350, 9);
  // checkViewport(400, 10);
  // checkViewport(768, 15);
  // checkViewport(1000, 20);
  // checkViewport(1200, 25);
  // checkViewport(1400, tags.length);

  return (
    <div>
      <form action="" onSubmit={submitForm}>
        <StyledDiv className="filter-list">
          <input
            type="search"
            placeholder="Search Artist, Style or Collection"
            value={searchValue}
            onChange={changeHandler}
          />
        </StyledDiv>
      </form>
      <Users />
      <div className={classes.tags} onClick={clickOnTag}>
        {isLoading ? (
          <Spinner />
        ) : (
          tags.map((el, i) => <Tag key={i} title={el} />)
        )}
      </div>
      <Categories />
    </div>
  );
};

export default SearchPage;
