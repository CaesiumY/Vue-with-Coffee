<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @deleteMemo="deleteMemo"
        @updateMemo="updateMemo"
      />
    </ul>
  </div>
</template>

<script>
import Memo from "./Memo";
import MemoForm from "./MemoForm";
import axios from "axios";

const memoApiCore = axios.create({
  baseURL: "http://localhost:8000/api/memos"
});

export default {
  name: "MemoApp",
  components: {
    MemoForm,
    Memo
  },
  data() {
    return {
      memos: []
    };
  },
  created() {
    // this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    memoApiCore.get("/").then(response => (this.memos = response.data));
  },
  methods: {
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem("memos", memosToString);
    },
    addMemo(payload) {
      // this.memos.push(payload);
      // this.storeMemo();
      memoApiCore.post("/", payload).then(response => {
        this.memos.push(response.data);
      });
    },
    deleteMemo(id) {
      const index = this.memos.findIndex(item => item.id === id);
      // this.memos.splice(index, 1);
      // this.storeMemo();
      memoApiCore.delete(`/${id}`).then(() => this.memos.splice(index, 1));
    },
    updateMemo(payload) {
      const { id, content } = payload;
      const index = this.memos.findIndex(item => item.id === id);
      const targetMemo = this.memos[index];
      // this.memos.splice(index, 1, { ...targetMemo, content });
      // this.storeMemo();
      memoApiCore.put(`/${id}`, { content }).then(() => {
        this.memos.splice(index, 1, { ...targetMemo, content });
      });
    }
  }
};
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>
