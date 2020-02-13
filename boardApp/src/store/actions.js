import api from "@/api";
import { FETCH_POST_LIST, FETCH_POST } from "./mutations-type";

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
  }
};
