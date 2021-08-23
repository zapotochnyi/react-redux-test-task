import { React } from "react";
import { NavLink } from "react-router-dom";
import s from "./UserItem.module.css";

const UserItem = ({
  id,
  name,
  companyName,
  email,
  setPostsLinkEnabled,
  setPostLinkEnabled,
}) => {
  return (
    <div className={s.user_item_wrap}>
      <div className={s.name}>{name}</div>
      <div className={s.company_name}>{companyName}</div>
      <div className={s.email}>{email}</div>
      <NavLink to={"/posts/" + id}>
        <button
          onClick={() => {
            setPostsLinkEnabled(true);
            setPostLinkEnabled(false);
          }}
          className={s.posts_btn}
        >
          Posts
        </button>
      </NavLink>
    </div>
  );
};

export default UserItem;
