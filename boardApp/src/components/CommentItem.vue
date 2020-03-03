<template>
  <div class="comment-item">
    <strong>{{ comment.user.name }}</strong>
    <span>{{ comment.createdAt }}</span>
    <p>{{ comment.contents }}</p>
    <ul>
      <li><button type="button">수정</button></li>
      <li><button type="button">삭제</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      required: true,
      validator(comment) {
        const isValidCommentId = typeof comment.id === "number";
        const isValidContents = comment.contents && comment.contents.length;
        const isValidUser = !!comment.user;
        return isValidCommentId && isValidContents && isValidUser;
      }
    }
  }
};
</script>

<style scoped></style>
