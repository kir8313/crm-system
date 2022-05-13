<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <button class="burger" @click="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </button>
        <span class="black-text">{{ currentDay }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            <span v-if="user">{{ user.name }}</span>
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  emits: ['toggleSidebar'],
  data: () => ({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      await this.$router.push('/login?message=logout')
    },
    isMoreTen(value) {
      return value > 10 ? value : '0' + value;
    }
  },
  computed: {
    currentDay() {
      return `${this.isMoreTen(this.day)}.${this.isMoreTen(this.month)}.${new Date().getFullYear()}`
    },
    user() {
      return this.$store.getters.user;
    }
  },

  async mounted() {
    M.Dropdown.init(this.$refs.dropdown, {
      // constrainWidth: true,
    });
    await this.$store.dispatch('getUser');
  },
}
</script>

<style scoped>
.burger {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}

#dropdown {
  top: 64px !important;
}

#dropdown .black-text {
  text-align: center;
}

#dropdown .black-text > i {
  margin: 0 auto;
  float: none;
}
</style>
