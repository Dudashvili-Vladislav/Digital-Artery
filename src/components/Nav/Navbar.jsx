import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "@styles/NavBar/Navbar.module.scss";
import "@styles/NavBar/NavBar.scss";

import img from "../../../assets/notUser.png";
import logo from "../../../assets/logo/logo.jpg";

import { Account } from "./account/account";
import RightNav from "./RightNav";
import { useLocation } from "react-router-dom";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const Navbar = () => {
  const userId = useSelector((state) => state.user.id);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { logoUser } = useSelector((state) => state.currentUser);
  const closeModal = (e) => {
    setOpenAuthModal(false);
  };
  const location = useLocation();
  return (
    <nav className="nav">
      <div onClick={() => scrollToTop()}>
        {location.pathname.indexOf("/user/detail") === -1 || !logoUser ? (
          <img className="logo" src={logo} />
        ) : (
          <img className="user__logo" src={logoUser} alt="user logo" />
        )}
      </div>
      <div onClick={closeModal}>
        <RightNav open={openAuthModal} isAuth={userId} />
      </div>

      {userId && matchMedia("(min-width: 600px)").matches && (
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
    </nav>
  );
};

export default Navbar;
