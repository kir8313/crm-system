<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <loader v-if="isLoading"/>

    <p v-else-if="!amounts" class="center">
      Записей пока нет.
      <router-link to="/record">Добавьте новую запись</router-link>
    </p>

    <section v-else>
      <div
        v-show="isShowChart"
        class="history-chart">
        <div style="width: 400px; margin: 0 auto;">
          <DoughnutChart v-bind="doughnutChartProps" />
        </div>
      </div>


      <history-table :amounts="items"/>
      <Paginate v-if="pageCount > 1"
        v-model="page"
        :page-count="pageCount"
        :click-handler="onChangePage"
        prev-text="<i class='material-icons'>chevron_left</i>"
        next-text="<i class='material-icons'>chevron_right</i>"
        container-class="pagination"
        page-class="waves-effect"
        prev-class="waves-effect"
        next-class="waves-effect"
      >
      </Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import {mapGetters} from 'vuex'
import Loader from "@/components/Loader";
import Paginate from "vuejs-paginate-next";
import pagination from "@/mixins/pagination";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
export default {
  components: {Loader, HistoryTable, Paginate, DoughnutChart },
  mixins: [pagination],
  data: () => ({
    isLoading: true,
    amounts: [],
    dataValues: [],
    dataLabels: [],
    toggleLegend: true,
    index: 0,
    doughnutChartProps: null,

  }),
  computed: {
    ...mapGetters(['categories']),
    testData() {
      return {
        labels: this.dataLabels,
        datasets: [
          {
            data: this.dataValues,
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
              "#FFA500FF",
              "#008000FF",
            ],
          },
        ],
      }
    },

    options() {
      return {
        scales: {
          myScale: {
            type: "logarithmic",
            position: this.toggleLegend ? "left" : "right",
          },
        },
        plugins: {
          legend: {
            position: this.toggleLegend ? "top" : "bottom",
          },
          title: {
            display: true,
            text: "Расходы по категориям",
          },
        },
      }
    },
    isShowChart() {
      return this.dataValues.filter(item => item > 0).length
    }
  },
  methods: {
    init() {
      this.initPagination( this.amounts.map(amount => {
        return {
          ...amount,
          title: this.categories.find(cat => cat.id === amount.id).title,
          typeColor: amount.typeMoney === 'income' ? 'green' : 'red',
          typeText: amount.typeMoney === 'income' ? 'Доход' : 'Расход',
        }
      }))
    },

    sumEveryCategory() {
      this.dataValues = this.categories.map(cat => {
        return this.amounts.reduce((accum, nextVal) => {
          if (nextVal.id === cat.id && nextVal.typeMoney === 'outcome') {
            accum += +nextVal.amount
          }
          return accum
        }, 0)
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    this.amounts = await this.$store.dispatch('getAmounts');
    if (this.amounts ) {
      this.dataLabels = this.categories.map(c => c.title)
      this.sumEveryCategory();
      this.init();

      const { doughnutChartProps } = useDoughnutChart({
        chartData: this.testData,
        options: this.options,
      });

      this.doughnutChartProps = doughnutChartProps;
    }

    this.isLoading = false;
  },
}
</script>