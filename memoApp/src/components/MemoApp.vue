<template>
  <div class="memo-app">
    <memo-form />
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
  }
};
</script>

<style scoped></style>
