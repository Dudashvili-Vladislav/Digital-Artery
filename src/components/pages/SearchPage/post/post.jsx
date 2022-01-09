import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./post.module.scss";
export const Posts = ({ posts, reqStr }) => {
  return posts.length > 0 ? (
    <div className={classes.posts}>
      {posts.map(({ images, num_vote_up, id }, i) => (
        <div className={classes.post} key={i}>
          <div className={classes.post__likes}>{num_vote_up}</div>
          <NavLink to={`/image/${id}`}>
            <img src={images[0].file} className={classes.post__img} />
          </NavLink>
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.empty}>posts for request {reqStr} not found</div>
  );
};
