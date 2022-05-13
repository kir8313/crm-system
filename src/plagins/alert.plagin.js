export default {
  install(app, options) {
    app.config.globalProperties.$alert = (html) => M.toast({html});
    app.config.globalProperties.$error = (html) => M.toast({html: `Тут ошибка: ${html}`})
  }
}