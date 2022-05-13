<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{invalid: v$.title.$errors.length}"
          >
          <label for="name">Название</label>
          <small
            v-if="v$.title.$errors"
            class="helper-text invalid"
            v-for="error of v$.title.$errors">
            {{ addError(error.$validator, error.$params.min) }}
          </small>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: v$.limit.$errors.length}"
          >
          <label for="limit">Лимит</label>
          <small v-if="isLimit" class="helper-text invalid">Минимальная величина {{ maxLimit }}</small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, minLength, minValue} from '@vuelidate/validators';

export default {
  data() {
    return {
      v$: useVuelidate(),
      title: '',
      limit: 0,
    }
  },
  validations() {
    return {
      title: {required, minLength: minLength(2)},
      limit: {required, minValue: minValue(100)},
    }
  },
  methods: {
    async submitForm() {
      if (this.v$.$invalid) {
        return this.v$.$touch();
      }
      try {
        await this.$store.dispatch('sendCategory', {
          title: this.title,
          limit: this.limit,
        })
        this.title = '';
        this.limit = 0;
        this.$alert('Категория успешно создана!');
        this.v$.$reset();
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
  mounted() {
    M.updateTextFields();
  },
  computed: {
    isLimit() {
     return this.v$.limit.$errors.length && this.limit < this.v$.limit.minValue.$params.min;
    },
    maxLimit() {
      return this.v$.limit.minValue.$params.min;
    },
  }
}
</script>