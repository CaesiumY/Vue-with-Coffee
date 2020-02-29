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
import api from "../api";

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
      const { title, contents } = payload;
      api.put(`/posts/${this.postId}`, { title, contents }).then(response => {
        alert("게시글이 성공적으로 수정되었습니다.");
        this.$router
          .push({
            name: "PostViewPage",
            params: { postId: response.data.id.toString() }
          })
          .catch(error => {
            if (error.response.status === 401) {
              alert("로그인이 필요합니다.");
              this.$router.push({ name: "Signin" });
            } else if (error.response.status === 403) {
              alert(error.response.data.msg);
              this.$router.back();
            } else {
              alert(error.response.data.msg);
            }
          });
      });
    }
  }
};
</script>

<style scoped></style>
