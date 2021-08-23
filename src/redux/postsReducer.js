import { postsAPI } from "../api/api";
import { dispatchErrorMessage } from "./appReducer";

const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POST";
const SET_CURRENT_POST = "SET_CURRENT_POST";
const SET_POST_NUMBER = "SET_POST_NUMBER";
const SET_COMMENTS = "SET_COMMENTS";
const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
const DELETE_POST = "DELETE_POST";

const initialState = {
  postsList: null,
  currentPost: null,
  postNumber: 1,
  comments: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        postsList: action.posts,
      };

    case ADD_POST:
      return {
        ...state,
        postsList: [action.postData, ...state.postsList],
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: state.postsList.filter(
          (post) => post.id === action.postId
        )[0],
      };

    case SET_POST_NUMBER:
      return {
        ...state,
        postNumber: action.num,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        postsList: state.postsList.map((post) => {
          if (post.id === action.editedPostData.id) {
            post = action.editedPostData;
          }
          return post;
        }),
        currentPost: action.editedPostData,
      };

    case DELETE_POST:
      return {
        ...state,
        postsList: state.postsList.filter(
          (post) => post.id !== action.deletedPostId
        ),
      };

    default:
      return state;
  }
};

const setPosts = (posts) => ({ type: GET_POSTS, posts });
const addPost = (postData) => ({ type: ADD_POST, postData });
export const setCurrentPost = (postId) => ({ type: SET_CURRENT_POST, postId });
export const setPostNumber = (num) => ({ type: SET_POST_NUMBER, num });
const setComments = (comments) => ({ type: SET_COMMENTS, comments });
const editPostSuccess = (editedPostData) => ({
  type: EDIT_POST_SUCCESS,
  editedPostData,
});
const postDeletedSuccess = (deletedPostId) => ({
  type: DELETE_POST,
  deletedPostId,
});

export const getPostsFromAPI = (userId) => async (dispatch) => {
  try {
    let response = await postsAPI.getPosts(userId);
    if (response.data.length > 0) {
      dispatch(setPosts(response.data));
    }
    return response;
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export const addPostToAPI = (userId, title, body) => async (dispatch) => {
  try {
    let postBody = { title, userId, body };
    let response = await postsAPI.addPost(postBody);
    dispatch(addPost(response.data));
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export const getCommentsFromAPI = (postId) => async (dispatch) => {
  try {
    let response = await postsAPI.getComments(postId);
    if (response.data.length > 0) {
      dispatch(setComments(response.data));
    }
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export const editPost = (postId, title, body, userId) => async (dispatch) => {
  try {
    let postBody = { id: postId, title, body, userId };
    if (postId === 101) {
      dispatch(editPostSuccess(postBody));
    }
    let response = await postsAPI.editPost(postId, postBody);
    dispatch(editPostSuccess(response.data));
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await postsAPI.deletePost(postId);
    dispatch(postDeletedSuccess(postId));
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export default postsReducer;
