<template>
  <div class="post-create-page">
    <h1>게시물 작성하기</h1>
    <post-create-form @submit="onSubmit" />
  </div>
</template>

<script>
import PostCreateForm from "../components/PostCreateForm";
import api from "../api";

export default {
  name: "PostCreatePage",
  components: {
    PostCreateForm
  },
  methods: {
    onSubmit(payload) {
      console.log(payload);
      const { title, contents } = payload;
      api
        .post("/posts", { title, contents })
        .then(response => {
          alert("게시물이 성공적으로 작성되었습니다.");
          this.$router.push({
            name: "PostViewPage",
            params: { postId: response.data.id.toString() }
          });
        })
        .catch(error => {
          if (error.response.status == 401) {
            alert("로그인이 필요합니다.");
            this.$router.push({ name: "Signin" });
          } else {
            alert(error.response.data.msg);
          }
        });
    }
  }
};
</script>

<style scoped></style>
