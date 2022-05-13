<template>
  <div class="app-main-layout">
    <the-navbar @toggle-sidebar="changeIsOpen"/>
    <the-sidebar :isOpen="isOpen" />
    <main :class="['app-content', {full: !isOpen}]">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import TheSidebar from "@/components/TheSidebar";
export default {
  components: {TheSidebar, TheNavbar},
  methods: {
    changeIsOpen() {
      this.$store.commit('changeIsOpen')
    }
  },
  computed: {
    isOpen() {
      return this.$store.getters.isOpen
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('getInfo')
    }
  },
}
</script>