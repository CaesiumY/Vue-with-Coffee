<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <post-list :posts="posts" />
  </div>
</template>

<script>
import PostList from "../components/PostList";
import api from "../api";
import { mapActions, mapState } from "vuex";

export default {
  name: "PostListPage",
  components: {
    PostList
  },
  created() {
    this.fetchPostList();
  },
  computed: {
    ...mapState(["posts"])
  },
  methods: {
    ...mapActions(["fetchPostList"])
  }
};
</script>

<style scoped>
</style>