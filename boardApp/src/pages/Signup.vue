<template>
  <div class="sign-up-page">
    <h3>회원가입</h3>
    <signup-form />
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm";
export default {
  name: "회원가입",
  components: {
    SignupForm
  }
};
</script>

<style scoped>
</style>