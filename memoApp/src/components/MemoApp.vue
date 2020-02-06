<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />
    <memo />
  </div>
</template>

<script>
import Memo from "./Memo";
import MemoForm from "./MemoForm";

export default {
  name: "MemoApp",
  components: {
    MemoForm
  },
  data() {
    return {
      memos: []
    };
  },
  created() {
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
  },
  methods: {
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem("memos", memosToString);
    },
    addMemo(payload) {
      this.memos.push(payload);
      this.storeMemo();
    }
  }
};
</script>

<style scoped></style>
