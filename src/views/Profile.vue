<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitForm">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="userName"
          :class="{invalid: v$.userName.$errors.length}"
        >
        <label for="description">Имя</label>
        <small
          v-if="v$.userName.$errors"
          class="helper-text invalid"
          v-for="error of v$.userName.$errors">
          {{ addError(error.$validator, error.$params.min) }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, minLength, minValue} from '@vuelidate/validators';
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      v$: useVuelidate(),
      userName: '',
    }
  },

  validations() {
    return {
      userName: {required, minLength: minLength(2)},
    }
  },

  methods: {
    async submitForm() {
      if (this.v$.$invalid) {
        return this.v$.$touch();
      }
      try {
        if (this.user.name !== this.userName) {
          await this.$store.dispatch('changeName', this.userName)
          this.userName = '';
          this.$alert('Имя успешно изменено!');
          this.v$.$reset();
        } else {
          this.$alert('Имя не должно быть одинаковым!')
        }
      } catch (e) {}
    },
    addError(name, count = 0) {
      if (name === 'required') {
        return 'Поле не должно быть пустым';
      } else if (name === 'minLength') {
        return `Минимальная длина должна быть ${count} символа`;
      }
    }
  },
  computed: mapGetters(['user'])
}
</script>
