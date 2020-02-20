//   barseat, // 网咖座位列表
const postList = [
  'login',
  'updateChainUserCache',
  'save',
  'memberDel',
  'memberSave',
  'updateState',
  'delStaff'
]
const getList = [
  'getList',
  'statistic',
  'memberList',
  'listEmployee',
  'memberDataList',
  'getChainMemberInfo',
  'getChainMemberTradeList',
  'getShopsByMember',
  'getChainMemberOnlineList'
]
const adminPostRequest = {}
postList.forEach(element => {
  adminPostRequest[element] = (data) => {
    return http.post({
      url: CHAIN_API.admin[element],
      data: data
    })
  }
})

const adminGetRequest = {}
getList.forEach(element => {
  adminGetRequest[element] = (data) => {
    return http.get({
      url: CHAIN_API.admin[element],
      data: data
    })
  }
})
export {
  adminPostRequest,
  adminGetRequest
}
