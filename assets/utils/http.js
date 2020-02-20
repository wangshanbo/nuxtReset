/*
  eSnStudio Standard Ajax Module
  2015-05-12
*/
// Ajax-JSON函数
import {
  getCookie,
  setCookie,
  delCookie
} from '@/assets/utils/getCookie'
let apiPre = '/api'

const cookieContent = getCookie('wisdomCookie')
const ActionManager = {}
let Token = ''

function AjaxJson(url, method, args, fn, dataType) {
  if (process.client) {
    if (cookieContent !== getCookie('wisdomCookie')) {
      window.$nuxt.$store.commit('user/setChangeCookie', 1)
    } else {
      window.$nuxt.$store.commit('user/setChangeCookie', 2)
    }
    Token = sessionStorage.getItem('shopCookie')
  }
  if (method !== 'get' || url.search('getTradeStreamInfo') !== -1) {
    // 非get请求200毫秒内只能触发一次
    const actionName = url
    if (ActionManager[actionName] === url) {
      return
    } else {
      setTimeout(() => {
        for (const key in ActionManager) {
          delete ActionManager[key]
        }
      }, 200)
    }
    ActionManager[actionName] = url
  }
  if (url.search('mock') !== -1) {
    apiPre = '/mock'
  } else {
    apiPre = '/api'
  }
  if (process.env.NODE_ENV === 'development') {
    url = process.env.proxyUrl + url
  } else {
    url = apiPre + url
  }
  const obj = null
  const ajax = new AjaxObject()
  ajax.URL = url
  ajax.dataType = dataType
  ajax.Method = method
  ajax.Async = true
  ajax.Args = args
  ajax.onSuccess = function(xhr) {
    let text = xhr.responseText
    if (text.charCodeAt() === 65279) text = text.substring(1) // 处理utf8引导字节
    eval('obj=' + text)
    fn(obj)
  }
  ajax.onFailure = function(xhr) {
    eval("obj={Tag:'ERROR',Status:'" + xhr.status + "'}")
    fn(obj)
  }
  ajax.Connect()
  return obj
}

// Ajax标准类模块
function AjaxObject() {
  this.URL = ''
  this.Method = 'GET'
  this.Async = true
  this.Args = null
  this.onSuccess = function(x) {}
  this.onFailure = function(x) {}
  if (process.client) {
    this.Request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  }

  this.Connect = function() {
    this.Method = this.Method.toUpperCase()
    if ((this.Method === 'GET' || this.Method === 'DELETE') && this.Args) {
      let args = ''
      if (typeof this.Args === 'object') {
        const arr = []
        for (const k in this.Args) {
          const v = this.Args[k]
          arr.push(k + '=' + v)
        }
        args = arr.join('&')
      } else {
        args = this.Args // alert("string");
      }
      this.URL += (this.URL.indexOf('?') === -1 ? '?' : '&') + args
      this.Args = null
    }
    const q = this.Request
    const evt1 = this.onSuccess
    const evt2 = this.onFailure
    const evt3 = this.onLoadend
    if (process.client) {
      this.Request.onreadystatechange = function() {
        _onStateChange(q, evt1, evt2, evt3)
      }

      this.Request.open(this.Method, this.URL, this.Async)
      this.Request.setRequestHeader('source', 'admin')
      if (Token !== null) {
        setCookie(Token, 1, 1 / 24 * 4)
        this.Request.setRequestHeader('shopCookie', Token)
      }

      if (this.Method === 'POST') {
        if (this.dataType === 'json') {
          this.Request.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
        } else if (this.dataType === 'multipart') {
          console.log()
        } else {
          this.Request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;')
        }
        //
        let args = ''
        if (typeof this.Args === 'string') {
          args = this.Args
        } else if (this.dataType === 'multipart') {
          var formData = new FormData()
          for (const k in this.Args) {
            const v = this.Args[k]
            formData.append(k, v)
          }
          this.Args = formData
        } else if (typeof this.Args === 'object') {
          if (this.dataType === 'json') {
            this.Args = JSON.stringify(this.Args)
          } else {
            const arr = []
            for (const k in this.Args) {
              const v = this.Args[k]
              arr.push(k + '=' + v)
            }
            args = arr.join('&')
            this.Args = encodeURI(args)
          }
        }
      }
      try {
        this.Request.send(this.Args)
      } catch (e) {
        console.log('connect exception.')
      }
    }
  }

  function _onStateChange(xhr, success, failure) {
    if (xhr.readyState === 4) {
      const s = xhr.status
      if (process.client) {
        if (s === 403) {
          delCookie('wisdomCookie')
          window.localStorage.removeItem('wxId')
          window.location.href = '/login'
        } else {
          window.$nuxt.$store.commit('login/setLoginState', 1)
        }
      }
      if (s === 0) {
        console.log('connect to url failure.')
      } else if (s >= 200 && s < 400) {
        success(xhr)
      } else {
        failure(xhr)
      }
    }
  }
}

class http {
  originPost(obj, fn) {
    if (obj.json !== undefined) {
      AjaxJson(obj.url, 'post', obj.json, fn, 'json')
    } else if (obj.forData !== undefined) {
      AjaxJson(obj.url, 'post', obj.data, fn, 'multipart')
    } else {
      AjaxJson(obj.url, 'post', obj.data, fn)
    }
  }
  originGet(obj, fn) {
    if (obj.json !== undefined) {
      AjaxJson(obj.url, 'get', obj.json, fn, 'json')
    } else {
      AjaxJson(obj.url, 'get', obj.data, fn)
    }
  }
  originDelete(obj, fn) {
    if (obj.json !== undefined) {
      AjaxJson(obj.url, 'DELETE', obj.json, fn, 'json')
    } else {
      AjaxJson(obj.url, 'DELETE', obj.data, fn)
    }
  }
  wrongCodeTest(data) {
    try {
      // 未登录拦截
      if (data.code === 402) {
        console.log('您暂未登录或登录超时，请前往登录')
      }
    } catch (err) {
      console.log(err)
    }
  }
  post(obj) {
    return new Promise((resolve, reject) => {
      this.originPost(obj, (res) => {
        // this.wrongCodeTest(res)
        resolve(res)
      })
    })
  }
  get(obj) {
    return new Promise((resolve, reject) => {
      this.originGet(obj, (res) => {
        resolve(res)
      })
    })
  }
  delete(obj) {
    return new Promise((resolve, reject) => {
      this.originDelete(obj, (res) => {
        resolve(res)
      })
    })
  }
  msgPost(obj) {
    return new Promise((resolve, reject) => {
      this.originPost(obj, (res) => {
        this.wrongCodeTest(res)
        if (res.code === 200) {
          resolve(res.data)
        } else {
          reject()
        }
      })
    })
  }
  usualPost(obj) {
    return new Promise((resolve, reject) => {
      this.originPost(obj, (res) => {
        this.wrongCodeTest(res)
        if (res.code === 200) {
          resolve(res.data)
        } else {
          reject()
        }
      })
    })
  }
  matchPost(obj) {
    return new Promise((resolve, reject) => {
      this.originPost(obj, (res) => {
        this.wrongCodeTest(res)
        if (res.code === 200) {
          resolve(res.data)
        } else if (res.code === 40001) {
          resolve(res)
        } else {
          console.log('错误' + res)
        }
      })
    })
  }
}

export default new http()
