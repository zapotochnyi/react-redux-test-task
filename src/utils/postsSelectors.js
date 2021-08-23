export const getPostsList = (state) => {
  return state.posts.postsList;
};

export const getCurrentPost = (state) => {
  return state.posts.currentPost;
};

export const getPostNumber = (state) => {
  return state.posts.postNumber;
};

export const getComments = (state) => {
  return state.posts.comments;
};
