<template>
  <div class="grey darken-1 empty-layout">
    <form class="card auth-card" @submit.prevent="submitForm">
      <div class="card-content">
        <span class="card-title">Зарегистрироваться</span>
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
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="userName"
            :class="{invalid: v$.userName.$errors.length}"
          >
          <label for="name">Имя</label>
          <small
            v-if="v$.userName.$errors"
            class="helper-text invalid"
            v-for="(error) of v$.userName.$errors">
            {{ addError(error.$validator, error.$params.min) }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="money"
            type="number"
            v-model.number="money"
            :class="{invalid: v$.money.$errors.length}"
          >
          <label for="money">Количество денег</label>
          <small
            v-if="v$.money.$errors"
            class="helper-text invalid"
            v-for="(error) of v$.money.$errors">
            {{ addError(error.$validator, error.$params.min) }}
          </small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit" :disabled="disable"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, email, minLength, minValue} from '@vuelidate/validators';

export default {
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
      userName: '',
      money: 0,
      agree: true,
      disable: false,
    }
  },
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      userName: {required, minLength: minLength(2)},
      money: {required, minValue: minValue(1)},
      agree: {checked: v => v}
    }
  },

  methods: {
    async submitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.userName,
        money: this.money
      }
      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
      } catch (e) {}
    },
    addError(name, count = 0) {
      if (name === 'required') {
        return 'Поле не должно быть пустым';
      } else if (name === 'minLength') {
        return `Минимальная длина должна быть ${count} символа`;
      } else if (name === 'minValue') {
        return `Минимальное значение должно быть ${count}`;
      }  else if (name === 'email') {
        return 'Введите корректный email';
      }
    }
  },
  mounted() {
    M.updateTextFields();
  }
}
</script>
