import React, { useEffect } from "react";

import Navbar from "./components/Nav/Navbar";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import { Chats } from "./components/pages/Chats/Chats";
import { Home } from "./components/pages/Home";
import Actions from "./components/pages/Actions";
import Stats from "./components/pages/Stats";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { setDefaultHeaders } from "./api/instanse";

import { Dialog } from "./components/pages/Chats/dialog/dialog";
import { AuthPage } from "./components/pages/auth/authorisation";
import { useDispatch } from "react-redux";
import { actions } from "./redux/actions";
import "materialize-css";
import requests from "./api/requests";

import { useState } from "react";
import axios from "axios";

import { Category } from "./components/pages/category/category";
import { SearchRes } from "./components/pages/SearchPage/result/result";
import { Image } from "./components/pages/detailImage/image";

import "@/styles/index.scss";
import "@styles/app/app.scss";
import { User } from "@/components/pages/user/user";
import { CreatePost } from "./components/pages/createPost/createPost";
import history from "./components/history";

const loader = document.querySelector(".preloader");
const showLoader = () => loader.classList.remove("preloader");
const addClass = () => loader.classList.add("loader-hide");

function App() {
  const [loading, setLoading] = useState(true);
  axios.defaults.baseURL = "http://92.255.109.134/api/";
  const dispatch = useDispatch();
  const checkToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      try {
        const token = (await requests.auth.create()).data.token;

        axios.defaults.headers.Authorization = `Token ${token}`;

        localStorage.setItem("token", token);

        return;
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    setDefaultHeaders(token);
    const hash = localStorage.getItem("hash");

    if (!!hash) {
      setLoading(false);
      return dispatch(actions.setUser(hash));
    }
    setLoading(false);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    showLoader();
    addClass();
    checkToken();
  }, []);

  let msg_qty = getRandomInt(10) + 1;

  return loading ? (
    ""
  ) : (
    <Router history={history}>
      <div>
        <Navbar />
        <div className="first-row" />

        <div>
          <div className="navbar-tabs">
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
                to={"/chats"}
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
          </div>
          <CacheSwitch>
            <Route path="/search" component={SearchPage} />
            <Route path="/chats" component={Chats} />
            <CacheRoute exact path="/" render={Home} />
            <Route path="/actions" component={Actions} />
            <Route path="/stats" component={Stats} />
            <Route path="/chat/:id/" component={Dialog} />
            <Route path="/auth/authorisation" component={AuthPage} />
            <Route path="/category/:id" component={Category} />
            <Route path="/results/:str" component={SearchRes} />
            <Route path="/image/:id" component={Image} />
            <Route exact path="/user/detail/:username/" component={User} />
            <Route exact path="/post/create/" component={CreatePost} />
          </CacheSwitch>
        </div>
      </div>
    </Router>
  );
}

export default App;
