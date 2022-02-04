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
import subscribedImage from "../../../../assets/icons/subscribed.svg";
import { useRef } from "react";

export const User = ({ match }) => {
  const { username } = match.params;

  const [userData, setUserData] = useState({});

  const [isSubscribed, setSubscribe] = useState();

  const dispatch = useDispatch();

  const subscribedParent = useRef();
  const subscribeParent = useRef();
  const subscribeImg = useRef();
  const subscribedImg = useRef();

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

  useEffect(() => {
    getUserData();
  }, []);

  const unsubscribe = async () => {
    try {
      await requests.subscribe.delete(userData.userData.id);
      getUserData();
    } catch (e) {
      M.toast({
        html: "An error occurred while unsubscribing",
        classes: "error",
      });
    }
  };

  const subscribeHandler = async () => {
    try {
      const sub = await requests.subscribe.create(userData.userData.id);
      getUserData();
    } catch (e) {
      console.log(e);
    }
  };

  const subscribeAnimate = (e) => {
    // const toggleAnim = (e, direction) => {
    //   return e.animate(
    //     [
    //       {
    //         opacity: 0.5,
    //       },
    //       {
    //         opacity: 0,
    //       },
    //     ],
    //     {
    //       fill: "forwards",
    //       duration: 300,
    //       direction,
    //     }
    //   );
    // };

    if (e.target == subscribeImg.current) {
      subscribeHandler();
      subscribeParent.current.classList.remove(classes.user__icons_active);
      subscribedParent.current.classList.add(classes.user__icons_active);
      // toggleAnim(e.target, "reverse").addEventListener("finish", (evt) => {
      //
      //   toggleAnim(subscribedParent.current, "reverse");
      // });
    } else if (e.target == subscribedImg.current) {
      unsubscribe();
      // toggleAnim(e.target, "reverse").addEventListener("finish", (evt) => {
      subscribedParent.current.classList.remove(classes.user__icons_active);
      subscribeParent.current.classList.add(classes.user__icons_active);
      //   toggleAnim(subscribeParent.current, "reverse");
      // });
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

              <div
                className={`${classes.user__icons_item} ${
                  isSubscribed ? classes.user__icons_active : ""
                }`}
                onClick={subscribeAnimate}
                ref={subscribedParent}
              >
                <img
                  src={subscribedImage}
                  alt="subscribed"
                  style={{ cursor: "pointer" }}
                  className={classes.icon}
                  ref={subscribedImg}
                />
              </div>

              <div
                className={`${classes.user__icons_item} ${
                  !isSubscribed ? classes.user__icons_active : ""
                }`}
                onClick={subscribeAnimate}
                ref={subscribeParent}
              >
                <img
                  src={subscribe}
                  alt="subscribe"
                  style={{ cursor: "pointer" }}
                  className={classes.icon}
                  ref={subscribeImg}
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
