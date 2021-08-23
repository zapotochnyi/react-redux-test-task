//libraries
import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
//css
import s from "./PostDetails.module.css";
//redux
import {
  getCommentsFromAPI,
  editPost,
  deletePost,
  setPostNumber,
} from "../../redux/postsReducer";
//components
import Comment from "./Comment/Comment";
import EditPostModal from "./EditPostModal/EditPostModal";
import ConfirmWindow from "./ConfirmWindow/ConfirmWindow";
import Loader from "../common/Loader";
//selectors
import { getComments, getPostNumber } from "../../utils/postsSelectors";
import { getCurrentPost } from "../../utils/postsSelectors";
import { getCurrentPostsUserName } from "../../utils/usersSelectors";
import Post from "./Post/Post";

const PostDetailsContainer = ({
  comments,
  getCommentsFromAPI,
  currentPost: { userId, id, title, body },
  currentPostsUserName,
  editPost,
  deletePost,
  postNumber,
  setPostNumber,
  ...props
}) => {
  let [isInit, setIsInit] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [confirmWindowIsOpen, setConfirmWindowIsOpen] = useState(false);
  let postId = props.match.params.postId;

  useEffect(() => {
    getCommentsFromAPI(postId).then(() => {
      setIsInit(true);
    });
  }, [postId, getCommentsFromAPI]);

  return (
    <>
      {!isInit ? (
        <Loader />
      ) : (
        <div className={s.post_page_wrap}>
          <div className={s.title_buttons_wrap}>
            <div className={s.page_title}>{currentPostsUserName} post</div>
            <div className={s.buttons}>
              <button
                onClick={() => {
                  setIsOpen(true);
                  document.body.classList.add("lock");
                }}
                className={s.edit_btn}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setConfirmWindowIsOpen(true);
                  document.body.classList.add("lock");
                }}
                className={s.delete_btn}
              >
                Delete
              </button>
            </div>
          </div>

          {isOpen && (
            <EditPostModal
              editPost={editPost}
              postId={id}
              setIsOpen={setIsOpen}
              userId={userId}
              title={title}
              body={body}
            />
          )}

          {confirmWindowIsOpen && (
            <ConfirmWindow
              postNumber={postNumber}
              setPostNumber={setPostNumber}
              postId={id}
              deletePost={deletePost}
              setConfirmWindowIsOpen={setConfirmWindowIsOpen}
            />
          )}

          <Post title={title} body={body} />

          <div className={s.comments_title}>Comments</div>

          <div className={s.comments_wrap}>
            {comments.map((comment) => (
              <Comment
                name={comment.name}
                email={comment.email}
                body={comment.body}
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
    comments: getComments(state),
    currentPost: getCurrentPost(state),
    currentPostsUserName: getCurrentPostsUserName(state),
    postNumber: getPostNumber(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getCommentsFromAPI,
    editPost,
    deletePost,
    setPostNumber,
  }),
  withRouter
)(PostDetailsContainer);
