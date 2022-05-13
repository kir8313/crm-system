<template>
  <div class="grey darken-1 empty-layout">
    <form class="card auth-card" @submit.prevent="submitForm">
      <div class="card-content">
        <span class="card-title">Авторизация</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: v$.email.$errors.length}"
          >
          <label for="password">Email</label>
          <small
            v-if="v$.email.$errors"
            class="helper-text invalid"
            v-for="(error, index) of v$.email.$errors">
              {{ addError(error.$validator) }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{invalid: v$.password.$errors.length}"
          >
          <label for="password">Пароль</label>
          <small
            v-if="v$.password.$errors"
            class="helper-text invalid"
            v-for="(error, index) of v$.password.$errors">
              {{ addError(error.$validator, error.$params.min) }}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, email, minLength} from '@vuelidate/validators';
import alerts from "@/utils/alerts";

export default {
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
    }
  },
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },

  methods: {
    async submitForm() {
      if (this.v$.$invalid) {
        return this.v$.$touch();
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
      } catch(e) {}
    },
    addError(name, count = 0) {
      if (name === 'required') {
        return 'Поле не должно быть пустым';
      } else if (name === 'minLength') {
        return `Минимальная длина должна быть ${count} символа`;
      } else if (name === 'email') {
        return 'Введите корректный email';
      }
    }
  },
  mounted() {
    if (alerts[this.$route.query.message]) {
      this.$alert(alerts[this.$route.query.message])
    }
  }
}
</script>
