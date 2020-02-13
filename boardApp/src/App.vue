<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url(http://localhost:8000/assets/index.css);
#app {
  text-align: center;
}
</style>
