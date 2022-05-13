<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ $currency(info.money) }}</h4>
    </div>

    <loader v-if="isLoading"/>

    <p v-else-if="!amounts.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавьте новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="amount in amounts" :key="amount.id">
        <p>
          <strong>{{ amount.title }}</strong>
          {{ $currency(amount.spend) }} из {{ $currency(amount.limit) }}
        </p>
        <div class="progress" v-tooltip="amount.tooltip">
          <div
            class="determinate"
            :class="[amount.progressColor]"
            :style="{width: amount.progressPercent}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Loader from "@/components/Loader";

export default {
  components: {Loader},
  data() {
    return {
      isLoading: true,
      amounts: []
    }
  },
  computed: {
    ...mapGetters(['categories', 'info'])
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    const amounts = await this.$store.dispatch('getAmounts');

    if (amounts) {
      this.amounts = this.categories.map(category => {
        const spend = amounts
          .filter(amount => amount.id === category.id)
          .filter(amount => amount.typeMoney === "outcome")
          .reduce((accum, nextValue) => accum += nextValue.amount, 0);

        const tooltipMoney = category.limit - spend;
        const tooltip = tooltipMoney >= 0 ? `На балансе осталось: ${this.$currency(tooltipMoney)}`: `Вы превысили на ${this.$currency(Math.abs(tooltipMoney))}`
        const percent = 100 * spend / category.limit;
        const progressPercent = percent >= 100 ? '100%' : percent + '%';
        const progressColor = percent < 60 ? "green" : percent < 100 ? 'yellow' : 'red';

        return {
          ...category, spend, progressPercent, progressColor, tooltip
        }
      })
    }

    this.isLoading = false;
  }
}
</script>
