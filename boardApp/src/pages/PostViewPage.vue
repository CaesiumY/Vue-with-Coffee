<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <p v-else>게시글을 불러오는 중...</p>
    <router-link :to="{ name: 'PostEditPage', params: { postId } }">
      수정하기
    </router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    <comment-list v-if="post" :comments="post.comments" />
    <comment-form @submit="onCommentSubmit" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import PostView from "../components/PostView";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import api from "../api";

export default {
  name: "PostViewPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  components: {
    PostView,
    CommentList,
    CommentForm
  },
  created() {
    this.fetchPost(`/${this.postId}`).catch(error => {
      alert(error.response.data.msg);
      this.$router.back();
    });
  },
  computed: {
    ...mapState(["post"]),
    ...mapGetters(["isAuthorized"])
  },
  methods: {
    onDelete() {
      const { id } = this.post;
      api
        .delete(`/posts/${id}`)
        .then(response => {
          alert("게시물이 성공적으로 삭제되었습니다.");
          this.$router.push({ name: "PostListPage" });
        })
        .catch(error => {
          if (error.response.status === 401) {
            alert("로그인이 필요합니다.");
            this.$router.push({ name: "Signin" });
          } else {
            alert(error.response.data.msg);
          }
        });
    },
    onCommentSubmit(comment) {
      if (!this.isAuthorized) {
        alert("인증이 필요합니다!");
        this.$router.push({ name: "Signin" });
      } else {
        this.createComment(comment)
          .then(() => {
            alert("댓글이 성공적으로 작성되었습니다.");
          })
          .catch(error => console.log(Array));
      }
    },
    ...mapActions(["fetchPost", "createComment"])
  }
};
</script>

<style scoped></style>
