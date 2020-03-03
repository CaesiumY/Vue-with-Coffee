<template>
  <ul class="comments">
    <li v-for="comment in comments" :key="comment.id">
      <comment-item :comment="comment" />
    </li>
    <li v-if="comments.length <= 0">입력된 댓글이 없습니다.</li>
  </ul>
</template>

<script>
import CommentItem from "./CommentItem";

export default {
  name: "CommentList",
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    CommentItem
  }
};
</script>

<style scoped></style>
