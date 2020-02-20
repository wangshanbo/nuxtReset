export const getCookie = (cname) => {
  if (process.client) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
}

export const setCookie = (name, value, day) => {
  if (process.client) {
    if (day !== 0) { // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000
      var date = new Date(+new Date() + expires)
      document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString()
    } else {
      document.cookie = name + '=' + escape(value)
    }
  }
}

export const delCookie = (name) => {
  setCookie(name, ' ', -1)
}
