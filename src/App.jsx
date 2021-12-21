import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navbar from "./components/Nav/Navbar";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import { Chats } from "./components/pages/Chats/Chats";
import Home from "./components/pages/Home";
import Actions from "./components/pages/Actions";
import Stats from "./components/pages/Stats";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";

import styled from "styled-components";

import "./styles.css";
import { store } from "./redux/store";
import { Dialog } from "./components/pages/Chats/dialog/dialog";
import { AuthPage } from "./components/pages/auth/authorisation";

const Tabs = styled.ul`

  margin-top: 11px;
  margin-bottom: 0px;
  margin-left: 0;
  padding-left: 0;
  color: var(--black)
  font-color: white;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  list-style: none;
  gap: 5px;
  width: 100%;
  font-size: 18px;

  sup {
    color: white;
    font-size: 10px;
  }

  .nav-tab-link {
	text-decoration: none;
	color: #888888;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .nav-tab-link-active {
	text-decoration: none;
	color: white;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
  }

`;

const loader = document.querySelector(".preloader");
const showLoader = () => loader.classList.remove("preloader");
const addClass = () => loader.classList.add("loader-hide");

function App() {
  useEffect(() => {
    showLoader();
    addClass();
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let msg_qty = getRandomInt(10) + 1;

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <div className="first-row" />

          <div>
            <Tabs className="navbar-tabs">
              <li>
                <NavLink
                  to={"/search"}
                  className="nav-tab-link"
                  activeClassName="nav-tab-link-active"
                >
                  search
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/chat"}
                  className="nav-tab-link"
                  activeClassName="nav-tab-link-active"
                >
                  chat<sup> {msg_qty}</sup>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={"/"}
                  className="nav-tab-link"
                  activeClassName="nav-tab-link-active"
                >
                  home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/actions"}
                  className="nav-tab-link"
                  activeClassName="nav-tab-link-active"
                >
                  actions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/stats"}
                  className="nav-tab-link"
                  activeClassName="nav-tab-link-active"
                >
                  stats
                </NavLink>
              </li>
            </Tabs>
            <CacheSwitch>
              <Route path="/search" component={SearchPage} />
              <Route path="/chat" component={Chats} />
              <CacheRoute exact path="/" render={Home} />
              <Route path="/actions" component={Actions} />
              <Route path="/stats" component={Stats} />
              <Route path="/chats/:id/" component={Dialog} />
              <Route path="/auth/authorisation" component={AuthPage} />
            </CacheSwitch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
