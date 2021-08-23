import { React } from "react";
import s from "./Post.module.css";

const Post = ({ title, body }) => {
  return (
    <div className={s.post_wrap}>
      <div className={s.post}>
        <div className={s.title}>{title}</div>
        <div className={s.body}>{body}</div>
      </div>
    </div>
  );
};

export default Post;
