<template>
  <div class="sign-up-page">
    <h3>회원가입</h3>
    <signup-form @submit="onSubmit" />
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm";
export default {
  name: "Signup",
  components: {
    SignupForm
  },
  methods: {
    onSubmit(payload) {
      console.log(payload);
    }
  }
};
</script>

<style scoped>
</style>