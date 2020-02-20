// 登录相关
export const state = () => ({
  isLogin: 2 // 0:未登录，1已登录
})
export const mutations = {
  /**
     * @param {*} state
     * @param {*是否登录} val
  */
  setLoginState(state, val) {
    state.isLogin = val
  }
}

export const actions = {
  actionLoginSuccess({
    commit,
    dispatch
  }, msg) {
    commit('setShowLoginBox', 1)
  }
}

