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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostView from "../components/PostView";
import CommentList from "../components/CommentList";
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
    CommentList
  },
  created() {
    this.fetchPost(`/${this.postId}`).catch(error => {
      alert(error.response.data.msg);
      this.$router.back();
    });
  },
  computed: {
    ...mapState(["post"])
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
    ...mapActions(["fetchPost"])
  }
};
</script>

<style scoped></style>
