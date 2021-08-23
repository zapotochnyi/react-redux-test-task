import { usersAPI } from "../api/api";
import { dispatchErrorMessage } from "./appReducer";

const GET_USERS = "GET_USERS";
const SET_CURRENT_POSTS_USER_NAME = "SET_CURRENT_POSTS_USER_NAME";

const initialState = {
  usersList: null,
  currentPostsUserName: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersList: action.users,
      };

    case SET_CURRENT_POSTS_USER_NAME:
      return {
        ...state,
        currentPostsUserName: state.usersList.filter(
          (user) => user.id === action.userId
        )[0].name,
      };

    default:
      return state;
  }
};

const setUsers = (users) => ({ type: GET_USERS, users });
export const setCurrentPostsUserName = (userId) => ({
  type: SET_CURRENT_POSTS_USER_NAME,
  userId,
});

export const getUsersFromAPI = () => async (dispatch) => {
  try {
    let response = await usersAPI.getUsers();
    if (response.data.length > 0) {
      dispatch(setUsers(response.data));
      dispatch(setCurrentPostsUserName(1));
    }
    return response;
  } catch (err) {
    dispatchErrorMessage(dispatch, err);
  }
};

export default usersReducer;
