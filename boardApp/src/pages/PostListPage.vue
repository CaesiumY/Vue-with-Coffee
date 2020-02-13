<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <post-list :posts="posts" />
  </div>
</template>

<script>
import PostList from "../components/PostList";
import api from "../api";

export default {
  name: "PostListPage",
  components: {
    PostList
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    api.get("/posts").then(response => {
      this.posts = response.data;
    });
  }
};
</script>

<style scoped>
</style>