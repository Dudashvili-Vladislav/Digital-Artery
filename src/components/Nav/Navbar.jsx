import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import classes from "./Navbar.module.scss";
import img from "../../../assets/notUser.png";

import { Account } from "./account/account";
import RightNav from "./RightNav";
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
  const userId = useSelector((state) => state.user.id);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const closeModal = (e) => {
    if (
      e.target.classList.contains("logout") ||
      e.target.classList.contains("login")
    )
      setOpenAuthModal(false);
  };

  return (
    <Nav>
      <div onClick={() => scrollToTop()}>
        <img className="logo" src="../assets/logo/logo.jpg" />
      </div>
      <div onClick={closeModal}>
        <RightNav open={openAuthModal} isAuth={!!userId} />
      </div>

      {userId && (
        <div className={classes.userAccount}>
          <Account id={userId} isOpenModal={openAuthModal} />
        </div>
      )}
      <div className="user__wrapper">
        <img
          src={img}
          className="user"
          onClick={() => setOpenAuthModal(!openAuthModal)}
        />
      </div>
      {openAuthModal && (
        <div className={classes.cross} onClick={() => setOpenAuthModal(false)}>
          <span></span>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;
