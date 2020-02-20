//   barseat, // 网咖座位列表
const httpList = [
  'barseat'
]
const httpRequest = {}
httpList.forEach(element => {
  httpRequest[element] = (data) => {
    return http.get({
      url: WEB_API.barBase[element],
      data: data
    })
  }
})
export {
  httpRequest
}

