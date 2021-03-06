import classes from "@styles/user/user.module.scss";
import { Post } from "@components/tape/post/post";
import { Spinner } from "@components/spinner/spinner";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../../../api/requests";
import React from "react";
import { NavLink } from "react-router-dom";
import subscribe from "../../../../assets/icons/subscribe.svg";
import mail from "../../../../assets/icons/mail.svg";
import { useDispatch } from "react-redux";
import { actions } from "@redux/actions";
export const User = ({ match }) => {
  const { username } = match.params;
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const userData = (await requests.user.get(username)).data;
        setUserData((prev) => {
          return { ...prev, userData };
        });
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
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : userData.posts ? (
    <div>
      <div className={`page ${classes.user__page}`}>
        <div className={classes.user}>
          <div className={classes.user__title}>
            {userData.userData.name ||
              userData.userData.username.substring(0, 20)}
          </div>
          <div className={classes.user__subtitle}>
            {userData.userData.name ? userData.userData.username.substring(0, 30) : ""}
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
              <img src={subscribe} alt="subscribe" />
            </div>
          </div>
        </div>

        <div className={classes.images}>
          {userData.posts.map((el, i) => (
            <NavLink to={`/image/${el.id}`} key={i}>
              <Post image={el} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
