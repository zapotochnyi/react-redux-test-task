//libraries
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//css
import s from "./HeaderContainer.module.css";
//icons
import { ReactComponent as UsersIcon } from "../../assets/group.svg";
import { ReactComponent as PostsIcon } from "../../assets/post.svg";
import { ReactComponent as PostIcon } from "../../assets/sticky-notes.svg";
//selectors
import {
  getPostLinkIsEnabled,
  getPostsLinkIsEnabled,
} from "../../utils/appSelectors";

const HeaderContainer = ({ postsLinkIsEnabled, postLinkIsEnabled }) => {
  return (
    <div className={s.header_wrap}>
      <nav className={s.nav_wrap}>
        <NavLink activeClassName={s.active} to="/users">
          <UsersIcon />
        </NavLink>

        {postsLinkIsEnabled ? (
          <NavLink activeClassName={s.active} to="/posts">
            <PostsIcon />
          </NavLink>
        ) : (
          <PostsIcon className={s.disabled} />
        )}

        {postLinkIsEnabled ? (
          <NavLink activeClassName={s.active} to="/post">
            <PostIcon />
          </NavLink>
        ) : (
          <PostIcon className={s.disabled} />
        )}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    postsLinkIsEnabled: getPostsLinkIsEnabled(state),
    postLinkIsEnabled: getPostLinkIsEnabled(state),
  };
};

export default connect(mapStateToProps, {})(HeaderContainer);
