import React from "react";
import styled from "styled-components";
import { RemoveScroll } from "react-remove-scroll";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { Account } from "./account/account";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 8vh;
  margin-top: 10px;
  font-family: GeosansLight;

  flex-flow: column nowrap;

  background-image: linear-gradient(
    to bottom left,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.1)
  );
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100vh;
  transition: transform 0.3s ease-in-out;

  li {
    color: #fff;
    text-align: center;
    padding: 0px 0px;
    cursor: pointer;
  }

  li:first-child {
    margin-top: 5vh;
  }

  li img {
    margin-top: 60px;
    margin-bottom: 10px;

    @media (max-aspect-ratio: 3/4) {
      width: 60vw;
      aspect-ratio: 1;
    }
    @media (min-aspect-ratio: 5/4) {
      height: 40vh;
      width: 40vh;
      aspect-ratio: 1;
    }
  }
`;

const RightNav = ({ open, isAuth }) => {
  let img_src = "../assets/01.jpg";
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(actions.setUser(""));
    localStorage.removeItem("hash");
    localStorage.removeItem("token");
  };
  return (
    <Ul open={open}>
      <RemoveScroll enabled={open} />
      <li>
        <img src={img_src} />
      </li>
      <li>Finances</li>
      <li>Settings</li>
      <li>About Us</li>
      {!isAuth ? (
        <li>
          <NavLink to="/auth/authorisation" className="login">
            Sign In
          </NavLink>
        </li>
      ) : (
        <li onClick={logOut} className="logout">
          Log Out
        </li>
      )}
    </Ul>
  );
};

export default RightNav;
