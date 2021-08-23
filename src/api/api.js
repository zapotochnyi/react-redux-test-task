import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const usersAPI = {
  getUsers() {
    return instance.get("users");
  },
};

export const postsAPI = {
  getPosts(userId) {
    return instance.get(`posts?userId=${userId}`);
  },

  addPost(body) {
    return instance.post("posts", body, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  getComments(postId) {
    return instance.get(`comments?postId=${postId}`);
  },

  editPost(postId, body) {
    return instance.put(`posts/${postId}`, body, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  deletePost(postId) {
    return instance.delete(`posts/${postId}`);
  },
};
