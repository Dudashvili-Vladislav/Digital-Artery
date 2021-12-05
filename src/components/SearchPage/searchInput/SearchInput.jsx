import React from "react";
import styled from 'styled-components';
import SearchIcon from "@material-ui/icons/Search";

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
  
`
const SearchInput = () => {
  
  return (
  <StyledDiv className="filter-list">
    <input type="search" placeholder="Search Artist, Style or Collection"/>
  </StyledDiv>
  );
};


export default SearchInput;