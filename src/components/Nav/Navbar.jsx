import { Modal } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import classes from "./Navbar.module.scss";
import img from "../../../assets/notUser.png";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/actions";
const Nav = styled.nav`
  width: 100%;
  height: 67px;
  margin-top: 0px;

  background-color: #070406;
  border-bottom: 1px solid #626262;
  display: flex;
  padding: 0px;
 justify-content: center; 
  align-items: center;
  position: fixed;
  z-index: 18;

  .logo {
    width: 100%
    position: relative;
    color: #fff;
    height: 62px;
    margin-top: 5px;
    text-align: center;
    
  }
  .user {
    position: absolute;
    right: 2%;
    top: 50%;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    text-align: unset; 
    opacity: .5;
    cursor: pointer;
    transition: all .2s;
  }
  .user:hover{
    opacity: 1;
  }
  
`;
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.id);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(actions.setUser(""));
    setOpenAuthModal(false);
    localStorage.removeItem("token");
  };
  return (
    <Nav>
      <div onClick={() => scrollToTop()}>
        <img className="logo" src="../assets/logo/logo.jpg" />
      </div>
      {openAuthModal && (
        <div className={classes.modal__wrapper}>
          <div className={classes.modal}>
            {!isAuth ? (
              <div className={classes.modal__links}>
                <NavLink
                  className={classes.modal__link}
                  to="/auth/authorisation"
                >
                  Авторизация
                </NavLink>
                <NavLink
                  className={classes.modal__link}
                  to="/auth/registration"
                >
                  Регистрация
                </NavLink>
              </div>
            ) : (
              <div className={classes.modal__link} onClick={logOut}>
                Выйти
              </div>
            )}
          </div>
        </div>
      )}

      <div className="user__wrapper">
        <img
          src={img}
          className="user"
          onClick={() => setOpenAuthModal(!openAuthModal)}
        />
      </div>
    </Nav>
  );
};

export default Navbar;
