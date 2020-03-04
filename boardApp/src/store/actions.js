import api from "@/api";
import {
  FETCH_POST_LIST,
  FETCH_POST,
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  UPDATE_COMMENT,
  EDIT_COMMENT
} from "./mutations-type";

export default {
  fetchPostList({ commit }) {
    return api.get("/posts").then(response => {
      commit(FETCH_POST_LIST, response.data);
    });
  },
  fetchPost({ commit }, postId) {
    return api.get(`/posts/${postId}`).then(response => {
      commit(FETCH_POST, response.data);
    });
  },
  signin({ commit }, payload) {
    const { email, password } = payload;
    return api
      .post("/auth/signin", { email, password })
      .then(response => {
        // console.log("res data:", response.data);
        const { accessToken } = response.data;
        commit(SET_ACCESS_TOKEN, accessToken);

        return api.get("/users/me");
      })
      .then(response => {
        commit(SET_MY_INFO, response.data);
      });
  },
  signinByToken({ commit }, token) {
    commit(SET_ACCESS_TOKEN, token);

    return api.get("/users/me").then(response => {
      commit(SET_MY_INFO, response.data);
    });
  },
  signout({ commit }) {
    commit(DESTROY_MY_INFO);
    commit(DESTROY_ACCESS_TOKEN);
  },
  createComment({ commit, state }, comment) {
    const postId = state.post.id;
    return api
      .post(`/posts/${postId}/comments`, { contents: comment })
      .then(response => {
        commit(UPDATE_COMMENT, response.data);
      });
  },
  editComment({ commit, state }, { commentId, comment }) {
    const postId = state.post.id;
    return api
      .put(`/posts/${postId}/comments/${commentId}`, { contents: comment })
      .then(response => {
        commit(EDIT_COMMENT, response.data);
      });
  }
};
