<template>
  <component :is="page ">
    <router-view/>
  </component>
</template>

<script>
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
export default {
  components: {AuthLayout, MainLayout},
  computed: {
    page() {
      return (this.$route.meta.page || 'login') + '-layout';
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
