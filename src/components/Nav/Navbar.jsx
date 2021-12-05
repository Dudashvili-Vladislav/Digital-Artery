import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';


const Nav = styled.nav`
  width: 100%;
  height: 67px;
  margin-top: 0px;
  background-color: #070406;
  border-bottom: 1px solid #626262;
  padding: 0px;
  justify-content: space-between;
  position: fixed;
  z-index: 18;
  text-align: center;

  .logo {
    position: relative;
    color: #fff;
    height: 62px;
    margin-top: 5px;
  }
`
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const Navbar = () => {
  return (
    <Nav>
      <div onClick={() => scrollToTop()}>
        <img className="logo" src="../assets/logo/logo.jpg" />
      </div>
      <Burger/>
    </Nav>
  )
}

export default Navbar
