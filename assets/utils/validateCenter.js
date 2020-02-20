// jiaoyan
const validateWords = {
  account: {
    empty: '用户名不能为空',
    wrong: '用户名输入错误',
    used: '用户名已占用',
    bannedWord: '用户名不能含有特殊字符'
  },
  passportName_whds: {
    empty: '登录名不能为空',
    wrong: '登录名输入错误',
    used: '登录名已占用',
    bannedWord: '登录名不能含有特殊字符'
  },
  password_whds: {
    empty: '请输入密码',
    wrong: '密码输入长度不正确(6-16个字符)'
  },
  imgCode: {
    empty: '请输入验证码',
    wrong: '验证码不正确'
  },
  phone: {
    empty: '请填写手机号',
    wrong: '手机号格式不符'
  },
  smsCode: {
    empty: '请输入手机短信验证码',
    wrong: '手机短信验证码应该为6位数字'
  }
}

class validateCenter {
  constructor() {}
  sendRes(bool, str) { // 返回信息
    return {
      res: bool,
      msg: str
    }
  }
  checkEmpty(val) { // 校验空值
    if (val.toString().trim() === '') {
      return true
    } else {
      return false
    }
  }
  // 通行证校验
  passportNameWhds(val) {
    if (this.checkEmpty(val)) {
      return this.sendRes(false, validateWords.passportName_whds.empty)
    }
    val = val.toString().trim()
    if (val.length >= 4 && val.length <= 16) {
      return this.sendRes(true)
    } else {
      return this.sendRes(false, validateWords.passportName_whds.wrong)
    }
  }
  passwordWhds(val) {
    if (this.checkEmpty(val)) {
      return this.sendRes(false, validateWords.password_whds.empty)
    }
    val = val.toString().trim()
    if (val.length >= 6 && val.length <= 16) {
      const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}')
      if (!pwdRegex.test(val)) {
        return this.sendRes(false, '您的密码复杂度太低（密码中必须包含字母、数字）')
      } else {
        return this.sendRes(true)
      }
    } else {
      return this.sendRes(false, validateWords.password_whds.wrong)
    }
  }
  phoneNum(val) { // 手机号校验
    if (this.checkEmpty(val)) {
      return this.sendRes(false, validateWords.phone.empty)
    }
    if (/^1\d{10}$/.test(val.trim())) {
      return this.sendRes(true)
    } else {
      return this.sendRes(false, validateWords.phone.wrong)
    }
  }
  smsCode(val) {
    if (this.checkEmpty(val)) {
      return this.sendRes(false, validateWords.smsCode.empty)
    }
    if (/\d{6}/.test(val.trim())) {
      return this.sendRes(true)
    } else {
      return this.sendRes(false, validateWords.smsCode.wrong)
    }
  }
  imgCode(val) {
    if (this.checkEmpty(val)) {
      return this.sendRes(false, validateWords.imgCode.empty)
    }
    if (val.trim().length !== 4) {
      return this.sendRes(false, validateWords.imgCode.wrong)
    } else {
      return this.sendRes(true)
    }
  }
}
export default new validateCenter()
