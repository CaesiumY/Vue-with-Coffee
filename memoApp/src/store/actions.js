import axios from "axios";
import {
  FETCH_MEMOS,
  ADD_MEMO,
  DELETE_MEMO,
  UPDATE_MEMO
} from "./mutations-types";

const memoAPICore = axios.create({
  baseURL: "http://localhost:8000/api/memos"
});

export function fetchMemos({ commit }) {
  memoAPICore
    .get("/")
    .then(response => {
      commit(FETCH_MEMOS, response.data);
    })
    .catch(e => alert(e));
}

export function addMemo({ commit }, payload) {
  memoAPICore.post("/", payload).then(response => {
    commit(ADD_MEMO, response.data);
  });
}

export function deleteMemo({ commit }, id) {
  memoAPICore.delete(`/${id}`).then(() => {
    commit(DELETE_MEMO, id);
  });
}

export function updateMemo({ commit }, payload) {
  const { id, content } = payload;
  memoAPICore.put(`/${id}`, { content }).then(() => {
    commit(UPDATE_MEMO, payload);
  });
}

export default {
  fetchMemos,
  addMemo,
  deleteMemo,
  updateMemo
};
