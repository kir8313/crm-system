<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="isLoading"/>
      <div v-else class="row">
        <the-category-create/>
        <the-category-edit
          :categories="categories"
          :key="categories.length + updCount"
          @update="updCount++"/>
      </div>
    </section>
  </div>
</template>

<script>
import TheCategoryCreate from "@/components/TheCategoryCreate";
import TheCategoryEdit from "@/components/TheCategoryEdit";
import Loader from "@/components/Loader";

export default {
  components: {Loader, TheCategoryEdit, TheCategoryCreate},
  data: () => ({
    isLoading: true,
    updCount: 0,
  }),
  computed: {
    categories() {
      if (this.$store.getters.categories) {
        return this.$store.getters.categories
      } else if (localStorage.getItem('categories')) {
        return JSON.parse(localStorage.getItem('categories'));
      } else {
        return []
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    this.isLoading = false;
  }
}
</script>