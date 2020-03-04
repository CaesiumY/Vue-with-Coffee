import {
  FETCH_POST_LIST,
  FETCH_POST,
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  UPDATE_COMMENT,
  EDIT_COMMENT
} from "./mutations-type";
import api from "../api";
import Cookies from "js-cookie";

export default {
  [FETCH_POST_LIST](state, posts) {
    state.posts = posts;
  },
  [FETCH_POST](state, post) {
    state.post = post;
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    if (accessToken) {
      state.accessToken = accessToken;
      // console.log("state data:", state.accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      Cookies.set("accessToken", accessToken);
    }
  },
  [SET_MY_INFO](state, me) {
    if (me) {
      state.me = me;
    }
  },
  [DESTROY_ACCESS_TOKEN](state) {
    state.accessToken = "";
    delete api.defaults.headers.common.Authorization;
    Cookies.remove("accessToken");
  },
  [DESTROY_MY_INFO](state) {
    state.me = null;
  },
  [UPDATE_COMMENT](state, payload) {
    state.post.comments.push(payload);
  },
  [EDIT_COMMENT](state, payload) {
    console.log(payload);
    const { id: commentId, comment, updatedAt } = payload;
    const targetComment = state.post.comments.find(
      comment => comment.id === commentId
    );
    targetComment.contents = comment;
    targetComment.updatedAt = updatedAt;
  }
};
