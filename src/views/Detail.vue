<template>
  <div>
    <loader v-if="isLoading" />
    <p v-else-if="!amount">Записи с id = {{ $route.params.id }} не существует</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <a
          href="/history"
          class="breadcrumb"
          @click.prevent="$router.back()"
        >История
        </a>
        <a class="breadcrumb">
          {{ amount.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[amount.typeColor]">
            <div class="card-content white-text">
              <p>Описание: <b>{{ amount.description }}</b></p>
              <p>Сумма: <b>{{ $currency(amount.amount) }}</b></p>
              <p>Категория: <b>{{ amount.title }}</b></p>

              <small><b>{{ $date(amount.date) }} {{ $date(amount.date, 'time') }}</b></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  components: {Loader},
  data: () => ({
    amount: null,
    isLoading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const amount = await this.$store.dispatch('getAmountById', id);
    const category = await this.$store.dispatch('getCategoryById', amount.id);
    this.amount = {
      ...amount,
      title: category.title,
      typeColor: amount.typeMoney === 'income' ? 'green' : 'red',
      typeText: amount.typeMoney === 'income' ? 'Доход' : 'Расход',
    }

    this.isLoading = false;
  }
}
</script>
