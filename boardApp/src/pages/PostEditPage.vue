<template>
  <div class="post-edit-page">
    <h1>게시물 수정</h1>
    <post-edit-form v-if="post" :post="post" @submit="onSubmit" />
    <p v-else>게시물 불러오는 중...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostEditForm from "../components/PostEditForm";

export default {
  name: "PostEditPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  components: {
    PostEditForm
  },
  computed: {
    ...mapState(["post"])
  },
  methods: {
    onSubmit(payload) {
      console.log(payload);
    }
  }
};
</script>

<style scoped></style>
