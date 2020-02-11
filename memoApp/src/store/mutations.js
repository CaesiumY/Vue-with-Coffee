import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO } from "./mutations-types";

export default {
  [FETCH_MEMOS](state, payload) {
    state.memos = payload;
  },
  [ADD_MEMO](state, payload) {
    state.memos.push(payload);
  },
  [DELETE_MEMO](state, id) {
    const targetIndex = state.memos.findIndex(v => v.id === id);
    state.memos.splice(targetIndex, 1);
  }
};
