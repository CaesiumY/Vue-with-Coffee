<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @deleteMemo="deleteMemo"
      />
    </ul>
  </div>
</template>

<script>
import Memo from "./Memo";
import MemoForm from "./MemoForm";

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
    },
    deleteMemo(id) {
      const index = this.memos.findIndex(item => item.id === id);
      this.memos.splice(index, 1);
      this.storeMemo();
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
