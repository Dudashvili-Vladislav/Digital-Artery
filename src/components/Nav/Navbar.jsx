import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "@styles/NavBar/NavBar.module.scss";
import "@styles/NavBar/NavBar.scss";

import img from "../../../assets/notUser.png";
import logo from "../../../assets/logo/logo.jpg";

import { Account } from "./account/account";
import RightNav from "./RightNav";

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
    <nav className="nav">
      <div onClick={() => scrollToTop()}>
        <img className="logo" src={logo} />
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
