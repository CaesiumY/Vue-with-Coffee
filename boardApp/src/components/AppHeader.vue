<template>
  <div class="app-header">
    <h1 @click="pushRouter">Community</h1>
    <div v-if="isAuthorized">
      <strong>
        <button class="header__btn" @click="toggle" @blur="handleBlur">
          {{ me.name }}님 환영합니다.
          <i v-if="isActive" class="fas fa-sort-down"></i>
          <i v-else class="fas fa-sort-up"></i>
        </button>
      </strong>
      <ul v-if="isActive">
        <li>
          <button class="header__btn" @click="onClickSignout">로그아웃</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Signin' }">로그인</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    ...mapGetters(["isAuthorized"]),
    ...mapState(["me"])
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    onClickSignout() {
      this.signout();
      this.$router.push({ name: "PostListPage" });
    },
    pushRouter() {
      this.$router.push({ name: "PostListPage" }).catch(e => {});
    },
    handleBlur() {
      this.isActive = false;
    },
    ...mapActions(["signout"])
  }
};
</script>

<style scoped>
.app-header h1 {
  cursor: pointer;
}

.header__btn {
  background: transparent;
}
</style>
