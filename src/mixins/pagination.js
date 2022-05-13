import _ from 'lodash'

export default {
  data: () => ({
    pageSize: 3,
    pageCount: 0,
    allItems: [],
    items: [],
    page: 1,
  }),
  methods: {
    initPagination(allItems) {
     this.allItems =  _.chunk(allItems, this.pageSize);
     this.pageCount = _.size(this.allItems);
     this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    onChangePage(page) {
      this.$router.push({query: {page}})
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  },
  mounted() {
    this.page = +this.$route.query.page || 1;
    if (this.page === 1) {
      this.$router.push({query: {page: 1}})
    }
  }
}