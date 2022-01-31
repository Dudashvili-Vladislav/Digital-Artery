import classes from "@styles/user/user.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../../../api/requests";
import React from "react";
import { NavLink } from "react-router-dom";
import subscribe from "../../../../assets/icons/subscribe.svg";
import mail from "../../../../assets/icons/mail.svg";
import { useDispatch } from "react-redux";
import { actions } from "@redux/actions";
import { UserTape } from "./imageTape/tape";
import subscribed from "../../../../assets/icons/subscribed.svg";
import { useRef } from "react";

export const User = ({ match }) => {
  const { username } = match.params;

  const [userData, setUserData] = useState({});
  
  const [isSubscribed, setSubscribe] = useState();

  const dispatch = useDispatch();

  const subscribedImg = useRef();
  const subscribeImg = useRef();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = (await requests.user.get(username)).data;


        setUserData((prev) => {
          return { ...prev, userData };
        });
        setSubscribe(userData.being_followed);
        dispatch(actions.setCurrentImage(userData.logo));
        const metrics = (await requests.metrics.get(username)).data;
        setUserData((prev) => {
          return { ...prev, metrics };
        });
        const posts = (await requests.userPost.get(username)).data;
        setUserData((prev) => {
          return { ...prev, posts };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const subscribeHandler = async () => {
    try {
      const sub = await requests.subscribe.create(userData.userData.id);
    } catch (e) {
      console.log(e);
    }
  };

  const subscribeAnimate = (e) => {
    const toggleAnim = (e, direction) => {
      return e.animate(
        [
          {
            opacity: 0.5,
          },
          {
            opacity: "0",
          },
        ],
        {
          fill: "forwards",
          duration: 300,
          direction,
        }
      );
    };
    if (e.target == subscribeImg.current) {
      subscribeHandler();
      toggleAnim(e.target).addEventListener("finish", (evt) => {
        e.target.classList.remove(classes.active);
        subscribeImg.current.classList.add(classes.icon);
        subscribedImg.current.classList.add(classes.active);
        toggleAnim(subscribedImg.current, "reverse");
      });
    }
  };

  return userData.posts ? (
    <div>
      <div className={`page ${classes.user__page}`}>
        <div className={classes.user}>
          <div className={classes.user__block}>
            <div className={classes.user__info}>
              <div className={classes.user__title}>
                {userData.userData.name ||
                  userData.userData.username.substring(0, 10)}
              </div>
              <div className={classes.user__subtitle}>
                {userData.userData.name
                  ? userData.userData.username.substring(0, 30)
                  : ""}
              </div>
              <div className={classes.user__text}>
                {userData.userData.bio || "user hasn`t description"}
              </div>
              <div className={classes.user__info}>
                Number of posts: {userData.userData.post_count}
              </div>
              <div className={classes.user__info}>
                Number of followers: {userData.userData.follower_count}
              </div>
            </div>
            <div className={classes.user__avatar}>
              <img
                src={userData.userData.picture}
                alt="avatar"
                style={{ background: "white" }}
              />
            </div>
          </div>

          <div className={classes.user__metrics}>
            <div className={classes.user__metrics_wrap}>
              <div className={classes.user__info}>
                Prelike succes rate: {userData.metrics.prelike_success_rate}%
              </div>
              <div className={classes.user__info}>
                Like succes rite: {userData.metrics.like_success_rate}%
              </div>
            </div>
            <div className={classes.user__icons}>
              <NavLink to={`/chat/${0}`}>
                <img src={mail} alt="send message" />
              </NavLink>

              <img
                src={subscribed}
                alt=""
                className={isSubscribed ? classes.active : classes.icon}
                ref={subscribedImg}
                onClick={subscribeAnimate}
              />

              <div className={!isSubscribed ? classes.subscribe : classes.icon}>
                <img
                  src={subscribe}
                  alt="subscribe"
                  style={{ cursor: "pointer" }}
                  className={isSubscribed ? classes.icon : classes.active}
                  ref={subscribeImg}
                  onClick={subscribeAnimate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.images}>
          <UserTape images={userData.posts} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
