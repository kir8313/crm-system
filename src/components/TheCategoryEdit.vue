<template>
  <div class="col s12 m6">
    <div v-if="categories.length">
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent=changeCategory>
        <div class="input-field">
          <select ref="select" v-model="activeOption" >
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id">
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    <p class="center" v-else>Добавьте первую категорию</p>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {minLength, minValue, required} from "@vuelidate/validators";

export default {
  props: ['categories'],
  emits: ['update'],
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 0,
    select: null,
    activeOption: null,
  }),
  created() {
    if (this.categories.length) {
      const {title, id, limit} = this.categories[0];
      this.activeOption = id;
      this.limit = limit;
      this.title = title;
    }
  },
  validations() {
    return {
      title: {required, minLength: minLength(2)},
      limit: {required, minValue: minValue(100)},
    }
  },
  methods: {
    async changeCategory() {
      if (this.v$.$invalid) {
        return this.v$.$touch();
      }
      try {
        await this.$store.dispatch('changeCategory', {
          title: this.title,
          limit: this.limit,
          id: this.activeOption,
        })
        this.$alert('Категория изменена!');
        this.$emit('update');
        this.v$.$reset();
      } catch (e) {
      }
    },
    addError(name, count = 0) {
      if (name === 'required') {
        return 'Поле не должно быть пустым';
      } else if (name === 'minLength') {
        return `Минимальная длина должна быть ${count} символа`;
      }
    }
  },
  computed: {
    isLimit() {
      return this.v$.limit.$errors.length && this.limit < this.v$.limit.minValue.$params.min;
    },
    maxLimit() {
      return this.v$.limit.minValue.$params.min;
    },
  },
  watch: {
    activeOption(val) {
      const {limit, title} = this.categories.find(item => item.id === val);
      this.limit = limit;
      this.title = title;
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
