import { React } from "react";
import s from "./Comment.module.css";

const Comment = ({ name, email, body }) => {
  return (
    <div className={s.comment_wrap}>
      <div className={s.name_email_wrap}>
        <div className={s.name}>{name}</div>
        <div className={s.email}>{email}</div>
      </div>

      <div className={s.body}>{body}</div>
    </div>
  );
};

export default Comment;
