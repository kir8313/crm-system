<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import alerts from "@/utils/alerts";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      this.$error(alerts[fbError.code] || 'Неожиданная ошибка')
    }
  }
}
</script>
