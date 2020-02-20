<template>
  <div class="login-wrap">
    <div class="login-content">
      <h1>
        <img src="~assets/images/logo_smart.png" />
      </h1>
      <div class="flex">
        <div
          class="changeChain"
          v-for="(item,index) in changeList"
          :key="index"
          @click="changeChain(index)"
          :class="{'active':index==active}"
        >{{item}}</div>
      </div>
      <div
        class="input-group"
        :class="{'slide-in-blurred-right':slideRight,'slide-in-blurred-left':slideLeft}"
      >
        <i class="iconfont iconyonghu1"></i>
        <input
          type="text"
          name="loginname"
          class="form-control"
          placeholder="请输入您的登录账号"
          autofocus
          v-model="userName"
        />
      </div>
      <div
        class="input-group"
        :class="{'slide-in-blurred-right':slideRight,'slide-in-blurred-left':slideLeft}"
      >
        <i class="iconfont iconsuo"></i>
        <input
          type="password"
          name="loginname"
          class="form-control"
          placeholder="请输入您的登录密码"
          autofocus
          v-model.trim="passWord"
        />
      </div>
      <button class="btn_login" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import validateCenter from '@/assets/utils/validateCenter'
import { getRouter } from '@/assets/request/user'
import { login } from '@/assets/request/user'
import { adminPostRequest } from '@/assets/request/chainRequest/admin'
import { yzChainRoleGetRequest } from '@/assets/request/chainRequest/yzChainRole'
// import { getCookie } from '@/assets/utils/getCookie'
export default {
  layout: 'login',
  data() {
    return {
      barName: '',
      userName: '',
      passWord: '',
      isChain: false,
      changeList: ['老板登录', '员工登录'],
      active: 0,
      slideRight: true,
      slideLeft: false
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {
    // this.getRouter()
    // if (getCookie('wisdomCookie') !== '') {
    //   if (sessionStorage.getItem('shopCookie') !== '') {
    //     this.getAuthList()
    //   } else {
    //     this.getRouter()
    //   }
    // }
    sessionStorage.removeItem('shopCookie')
    window.addEventListener('keyup', this.keyUp)
    this.changeChain(0)
  },
  watch: {},
  methods: {
    changeChain(i) {
      if (i === 0) {
        this.slideLeft = false
        setTimeout(() => {
          this.slideRight = true
        }, 100)
      } else {
        this.slideRight = false
        setTimeout(() => {
          this.slideLeft = true
        }, 100)
      }
      this.active = i
    },
    keyUp(e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    async getRouter(data) {
      if (data === '1') {
        window.removeEventListener('keyup', this.keyUp)
        window.location.href = '/storeManagement'
      } else {
        const res = await getRouter()
        if (res.data.length === 0) {
          this.$message.error('该账户未配置后台权限,请联系管理员!')
        } else {
          window.removeEventListener('keyup', this.keyUp)
          window.location.href = res.data[0].submenu[0].url
        }
      }
    },
    async login() {
      // 校验通行证账号
      const vdtObj = validateCenter.passportNameWhds(this.userName)
      if (!vdtObj.res) {
        this.$message.error(vdtObj.msg)
        return false
      }
      // 校验密码
      // vdtObj = validateCenter.passwordWhds(this.passWord)
      // if (!vdtObj.res) {
      //   this.$message.error(vdtObj.msg)
      //   return false
      // }
      const param = {
        loginname: this.userName,
        password: this.passWord
      }

      let res
      let goChain = false
      if (this.active === 1) {
        res = await login(param)
      } else {
        goChain = true
        res = await adminPostRequest.login(param)
      }

      if (res.code === 200) {
        // 校验通过
        window.removeEventListener('keyup', this.keyUp)
        if (goChain) {
          this.getAuthList(res.data)
        } else {
          this.getRouter(res.data)
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    async getAuthList(data) {
      if (data === '1') {
        window.location.href = '/storeManagement'
      } else {
        const res = await yzChainRoleGetRequest.getAuthList()
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.$message.error('该账户未配置后台权限,请联系管理员!')
          } else {
            window.location.href = res.data[0].url
          }
        } else {
          this.$message.error(res.msg)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$px35: 35px;
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: url("~static/img/login-bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-content {
    width: 280px;
    max-height: 310px;
    background-color: rgba(13, 26, 48, 0.6);
    border-radius: 8px;
    margin: auto;
    padding: 34px 60px 0;
    position: absolute;
    left: 0%;
    top: 0;
    right: 0;
    bottom: 0;
    .iconfont {
      text-align: center;
    }
    h1 {
      text-align: center;
      img {
        vertical-align: middle;
        padding-bottom: 34px;
      }
      .sys_name {
        color: #fff;
        font-size: 20px;
        height: 30px;
        border-left: 1px solid #fff;
        line-height: 30px;
        padding-left: 15px;
        margin-left: 15px;
      }
    }
    .changeChain {
      width: 72px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 25px;
      margin-right: 15px;
      position: relative;
      &.active {
        color: rgba(94, 158, 248, 1);
      }
      &.active::after {
        content: "";
        width: 72px;
        height: 2px;
        background: rgba(94, 158, 248, 1);
        position: absolute;
        left: calc(50% - 36px);
        bottom: -10px;
      }
    }
    .input-group {
      height: $px35;
      background: #fff;
      border-radius: $px35;
      line-height: $px35;
      margin-bottom: 15px;
      i {
        width: 40px;
        height: $px35;
      }
      input {
        width: calc(100% - 50px);
        height: $px35;
        border-top-right-radius: $px35;
        border-bottom-right-radius: $px35;
        color: #555;
        font-size: 16px;
        padding: 0;
      }
    }
    .btn_login {
      width: 100%;
      height: $px35;
      background: #4a95e8;
      border: 0;
      border-radius: 40px;
      color: #fff;
      font-size: 16px;
      padding: 5px;
    }
  }
}
</style>
<style lang="scss">
.slide-in-blurred-right {
  animation: slide-in-right 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@keyframes slide-in-right {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-blurred-left {
  animation: slide-in-left 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@keyframes slide-in-left {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

