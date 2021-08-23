//libraries
import React from "react";
import { connect } from "react-redux";
//css
import s from "./UsersContainer.module.css";
//components
import UserItem from "./UserItem/UserItem";
//redux
import {
  setPostsLinkEnabled,
  setPostLinkEnabled,
} from "../../redux/appReducer";
//selectors
import { getUsersList } from "../../utils/usersSelectors";

const UsersContainer = ({ users, setPostsLinkEnabled, setPostLinkEnabled }) => {
  return (
    <div className={s.users_page_wrap}>
      <div className={s.users_title}>Users</div>

      <div className={s.users_items_wrap}>
        {users.map((user) => (
          <UserItem
            id={user.id}
            key={user.id}
            name={user.name}
            companyName={user.company.name}
            email={user.email}
            setPostsLinkEnabled={setPostsLinkEnabled}
            setPostLinkEnabled={setPostLinkEnabled}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: getUsersList(state),
  };
};

export default connect(mapStateToProps, {
  setPostsLinkEnabled,
  setPostLinkEnabled,
})(UsersContainer);
