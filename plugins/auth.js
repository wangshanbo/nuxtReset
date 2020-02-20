export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      console.log(to)
      console.log(from)
      console.log(next)
    }
  })
}
