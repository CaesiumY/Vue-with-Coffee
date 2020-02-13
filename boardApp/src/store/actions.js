import api from "@/api";
import { FETCH_POST_LIST } from "./mutations-type";

export default {
  fetchPostList({ commit }) {
    return api.get("/posts").then(response => {
      commit(FETCH_POST_LIST, response.data);
    });
  }
};
