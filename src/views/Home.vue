<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="isLoading"/>
    <div v-else class="row">
      <home-bill :currency="currency"/>
      <home-exchange-rates :rates="currency"/>

    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import TheSidebar from "@/components/TheSidebar";
import HomeBill from "@/components/HomeBill";
import HomeExchangeRates from "@/components/HomeExchangeRates";

export default {
  components: {HomeExchangeRates, HomeBill, TheSidebar, TheNavbar},
  data() {
    return {
      isLoading: true,
      currency: null,
    }
  },
  methods: {
    async refresh() {
      this.isLoading = true;
      this.currency = await this.$store.dispatch('getCurrency');
      this.isLoading = false;
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('getCurrency');
    this.isLoading = false;
  }
}

</script>
