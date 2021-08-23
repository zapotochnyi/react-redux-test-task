import { getCommentsFromAPI } from "./postsReducer";
import { getPostsFromAPI, setCurrentPost } from "./postsReducer";
import { getUsersFromAPI } from "./usersReducer";

const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const POSTS_LINK_ENABLED = "POSTS_LINK_ENABLED";
const POST_LINK_ENABLED = "POST_LINK_ENABLED";

const initialState = {
  error: null,
  initialized: false,
  postsLinkIsEnabled: false,
  postLinkIsEnabled: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error,
      };

    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    case POSTS_LINK_ENABLED:
      return {
        ...state,
        postsLinkIsEnabled: action.isEnabled,
      };

    case POST_LINK_ENABLED:
      return {
        ...state,
        postLinkIsEnabled: action.isEnabled,
      };

    default:
      return state;
  }
};

const setErrorMessage = (error) => ({ type: SET_ERROR_MESSAGE, error });
const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const setPostsLinkEnabled = (isEnabled) => ({
  type: POSTS_LINK_ENABLED,
  isEnabled,
});
export const setPostLinkEnabled = (isEnabled) => ({
  type: POST_LINK_ENABLED,
  isEnabled,
});

export const dispatchErrorMessage = (dispatch, err) => {
  dispatch(
    setErrorMessage({
      message: "Something went wrong. Please reload a page",
      err,
    })
  );
};

export const initializeApp = () => (dispatch) => {
  let usersPromise = dispatch(getUsersFromAPI());
  let postsPromise = dispatch(getPostsFromAPI(1));
  let commentsPromise = dispatch(getCommentsFromAPI(1));

  Promise.all([usersPromise, postsPromise, commentsPromise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
