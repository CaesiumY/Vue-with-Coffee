<template>
  <div class="post-view-page">
    <post-view :post="post" />
    <router-link :to="{name: 'PostListPage'}">목록</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostView from "../components/PostView";

export default {
  name: "PostViewPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  components: {
    PostView
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
    ...mapActions(["fetchPost"])
  }
};
</script>

<style scoped>
</style>