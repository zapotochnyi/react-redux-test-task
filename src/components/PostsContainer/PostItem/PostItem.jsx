import React from "react";
import { NavLink } from "react-router-dom";
import s from "./PostItem.module.css";

const PostItem = ({
  postId,
  title,
  body,
  setCurrentPost,
  setPostNumber,
  setPostLinkEnabled,
}) => {
  return (
    <div className={s.post_item_wrap}>
      <div className={s.post_title}>{title}</div>
      <div className={s.post_body}>{body}</div>
      <NavLink className={s.nav_btn_wrap} to={`/post/` + postId}>
        <button
          onClick={() => {
            setCurrentPost(postId);
            setPostNumber(postId);
            setPostLinkEnabled(true);
          }}
          className={s.details_btn}
        >
          Details
        </button>
      </NavLink>
    </div>
  );
};

export default PostItem;
