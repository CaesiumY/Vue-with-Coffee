<template>
  <div id="app">
    <router-view name="header" />
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
