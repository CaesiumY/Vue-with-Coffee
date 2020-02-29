<template>
  <div class="post-edit-page">
    <h1>게시물 수정</h1>
  </div>
</template>

<script>
export default {
  name: "PostEditPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
