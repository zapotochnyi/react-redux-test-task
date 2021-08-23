//libraries
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
//css
import s from "./PostsContainer.module.css";
//components
import PostItem from "./PostItem/PostItem";
import Loader from "../common/Loader";
import AddNewPostModal from "./AddNewPostModal/AddNewPostModal";
//redux
import {
  getPostsFromAPI,
  addPostToAPI,
  setCurrentPost,
  setPostNumber,
} from "../../redux/postsReducer";
import { setCurrentPostsUserName } from "../../redux/usersReducer";
import { setPostLinkEnabled } from "../../redux/appReducer";
//selectors
import { getPostNumber, getPostsList } from "../../utils/postsSelectors";
import { getCurrentPostsUserName } from "../../utils/usersSelectors";

const PostsContainer = ({
  postsList,
  currentPostsUserName,
  getPostsFromAPI,
  setCurrentPostsUserName,
  addPostToAPI,
  setCurrentPost,
  setPostNumber,
  postNumber,
  setPostLinkEnabled,
  ...props
}) => {
  let [isInit, setIsInit] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentPostsUserName(postsList[0].userId);
  }, [postsList, setCurrentPostsUserName]);

  useEffect(() => {
    setCurrentPost(postNumber);
  }, [setCurrentPost, postNumber]);

  useEffect(() => {
    let userId = props.match.params.userId;
    getPostsFromAPI(userId).then(() => {
      setIsInit(true);
    });
  }, [getPostsFromAPI, props.match.params.userId]);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("lock");
  };

  return (
    <>
      {!isInit ? (
        <Loader />
      ) : (
        <div className={s.posts_page_wrap}>
          <div className={s.title_wrap}>
            <div className={s.title}>Posts of {currentPostsUserName}</div>
            <button
              onClick={openModal}
              className={s.add_btn}
            >
              Add new
            </button>
          </div>

          {isOpen && (
            <AddNewPostModal
              userId={postsList[0].userId}
              addPostToAPI={addPostToAPI}
              setIsOpen={setIsOpen}
            />
          )}

          <div className={s.posts_items_wrap}>
            {postsList.map((post) => (
              <PostItem
                key={post.id}
                postId={post.id}
                title={post.title}
                body={post.body}
                setCurrentPost={setCurrentPost}
                setPostNumber={setPostNumber}
                setPostLinkEnabled={setPostLinkEnabled}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    postsList: getPostsList(state),
    currentPostsUserName: getCurrentPostsUserName(state),
    postNumber: getPostNumber(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getPostsFromAPI,
    setCurrentPostsUserName,
    addPostToAPI,
    setCurrentPost,
    setPostNumber,
    setPostLinkEnabled,
  }),
  withRouter
)(PostsContainer);
