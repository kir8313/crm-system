<template>
  <div class="col s12 m6 l4" v-if="rates !== null">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <div>
          <p class="currency-line">
            <span>{{ $currency(user.money) }}</span>
          </p>
          <p class="currency-line">
            <span>{{ convertMoneyUsd }} &#36;</span>
          </p>
          <p class="currency-line">
            <span>{{ convertMoneyEur }} &#8364;</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currency'],

  data: () => ({
    rates: null,
  }),

  computed: {
    convertMoneyUsd() {
      const currentRate = this.rates.find(item => item.id === 'USD/RUB').value;
      return (this.user.money / currentRate * 100).toFixed() / 100;
    },
    convertMoneyEur() {
      const currentRate = this.rates.find(item => item.id === 'EUR/RUB').value;
      return (this.user.money / currentRate * 100).toFixed() / 100;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  async mounted() {
    await this.$store.dispatch('getUser');
    this.rates = await this.currency;
  },
}
</script>