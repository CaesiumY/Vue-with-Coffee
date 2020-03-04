<template>
  <ul class="comments">
    <li v-for="comment in comments" :key="comment.id">
      <comment-item @edit="onEdit" :comment="comment" />
    </li>
    <li v-if="comments.length <= 0">입력된 댓글이 없습니다.</li>
  </ul>
</template>

<script>
import CommentItem from "./CommentItem";
import { mapActions } from "vuex";

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
  },
  methods: {
    onEdit({ id, comment }) {
      this.editComment({ commentId: id, comment })
        .then(response => {
          alert("댓글이 수정되었습니다.");
        })
        .catch(error => {
          if (error.response === 401) {
            alert("로그인이 필요합니다.");
            this.$router.push({ name: "Signin" });
          } else {
            alert(error.response.data.msg);
          }
        });
    },
    ...mapActions(["editComment"])
  }
};
</script>

<style scoped></style>
