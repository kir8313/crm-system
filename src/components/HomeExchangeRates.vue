<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
            <th>Время</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="idx in 2" :key="idx">
            <td>{{ getCurrencyName(idx) }}</td>
            <td>{{ getCurrencyRate(idx) }}</td>
            <td>{{ getCurrencyDate(idx) }}</td>
            <td>{{ getCurrencyTime(idx) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      user: {},
    }
  },
  methods: {
    getCurrencyName(index) {
      return this.rates[index - 1].id.split('/')[0].toLowerCase();
    },
    getCurrencyRate(index) {
      return this.rates[index - 1].value;
    },
    getCurrencyDate(index) {
      return this.rates[index - 1].date;
    },
    getCurrencyTime(index) {
      return this.rates[index - 1].time;
    }
  },
  mounted() {
    this.user = this.$store.getters.user
  },
}
</script>