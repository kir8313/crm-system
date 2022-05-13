<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <loader v-if="isLoading"/>
    <p v-else-if="!$store.getters.categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавьте новую категорию</router-link>
    </p>

    <form v-else class="form" @submit.prevent="sendRecord">
      <div class="input-field">
        <select ref="select" v-model="activeOption">
          <option
            v-for="category in $store.getters.categories"
            :value="category.id"
            :key="category.id">
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="mb-2">
        <label class="radio-label">
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="typeMoney"
          />
          <span>Доход</span>
        </label>

        <label class="radio-label">
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="typeMoney"
          />
          <span>Расход</span>
        </label>
      </div>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: v$.amount.$errors.length}"
        >
        <label for="amount">Сумма</label>
        <small v-if="isLimit" class="helper-text invalid">Минимальная величина {{ maxLimit }}</small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: v$.description.$errors.length}"
        >
        <label for="description">Описание</label>
        <small
          v-if="v$.description.$errors"
          class="helper-text invalid"
          v-for="error of v$.description.$errors">
          {{ addError(error.$validator, error.$params.min) }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import Loader from "@/components/Loader";
import {minLength, minValue, required} from "@vuelidate/validators";
import {mapGetters} from 'vuex';

export default {
  components: {Loader},
  data: () => ({
    v$: useVuelidate(),
    isLoading: true,
    select: null,
    activeOption: null,
    typeMoney: 'income',
    amount: 0,
    description: '',
  }),
  validations() {
    return {
      amount: {required, minValue: minValue(10)},
      description: {required, minLength: minLength(2)},
    }
  },
  methods: {
    formatDate(date) {
      const pathOne = date.split('T')[0].split('-').reverse().join('.');
      const pathTwo = date.split('T')[1].split('.')[0];
      return pathTwo + " " + pathOne;
    },
    async sendRecord() {
      if (this.v$.$invalid) {
        return this.v$.$touch();
      }
      if (this.isCanCreateAmount) {
        try {
          await this.$store.dispatch('sendAmount', {
            id: this.activeOption,
            typeMoney: this.typeMoney,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          });

          const money = this.typeMoney === 'income' ?
            this.info.money + this.amount :
            this.info.money - this.amount;

          await this.$store.dispatch('updateInfo', money)

          this.$alert('Запись создана!');
          this.activeOption = this.$store.getters.categories[0].id;
          this.description = '';
          this.amount = 0;
          this.v$.$reset();
        } catch (e) {
        }
      } else {
        this.$alert(`Не хватает ${this.amount - this.info.money}`)
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
    ...mapGetters(['info']),
    isLimit() {
      return this.v$.amount.$errors.length && this.amount < this.v$.amount.minValue.$params.min;
    },
    maxLimit() {
      return this.v$.amount.minValue.$params.min;
    },
    isCanCreateAmount() {
      if (this.typeMoney === 'income') {
        return true;
      } else {
        return this.info.money >= this.amount;
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getCategories')
    this.isLoading = false;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);

    if (this.$store.getters.categories.length) {
      this.activeOption = this.$store.getters.categories[0].id;
    }


  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>
.radio-label {
  display: block;
  margin-bottom: 1rem;
  text-align: left;
}

.mb-2 {
  margin-bottom: 2rem;
}
</style>
