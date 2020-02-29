<template>
  <div class="post-edit-page">
    <h1>게시물 수정</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostEditPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["post"])
  }
};
</script>

<style scoped></style>
