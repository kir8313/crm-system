export default {
  install(app, options) {
    app.config.globalProperties.$currency = (value) => {
     return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      }).format(value)
    }
  }
}
