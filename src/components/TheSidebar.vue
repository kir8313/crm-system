<template>
  <ul :class="['sidenav', 'app-sidenav', {open: isOpen} ]">
    <li v-for="link in links" :key="link.id">
      <router-link :to="link.url" class="waves-effect waves-orange pointer" :exact="link.exact">
          {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      {id: 1, title: 'Счет', url: '/', exact: true},
      {id: 2, title: 'История', url: '/history'},
      {id: 3, title: 'Планирование', url: '/planning'},
      {id: 4, title: 'Новая запись', url: '/record'},
      {id: 5, title: 'Категории', url: '/categories'},
    ]
  }),
  methods: {
    isActiveRout(url) {
      return this.$route.fullPath === url;
    }
  },
}
</script>

<style>
.sidenav li a {
  padding: 0;
}

.sidenav li a.active {
  background-color: rgba(0,0,0,0.05);
}
</style>