<template>
  <div>
    <layoutHeader :isChain="isChain" />
    <el-container>
      <el-aside width="auto" style="min-width:64px;">
        <Aside />
      </el-aside>
      <el-main class="elMain" :class="{isChain:isChain}">
        <transition name="el-fade-in">
          <nuxt />
        </transition>
      </el-main>
    </el-container>
    <el-dialog
      :visible.sync="isIe"
      width="30%"
      class="tac"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      :fullscreen="true"
    >
      <h1 class="warning mb20 f22">不支持的浏览器</h1>
      <p class="f20">
        为保证您的数据安全本系统采用多重安全保障请使用谷歌浏览器
        <a href="https://www.google.cn/chrome/" target="_blank" rel="noopener noreferrer">chrome</a> 、
        <a href="http://www.firefox.com.cn/" target="_blank" rel="noopener noreferrer">firefox</a>、
        <a href="https://browser.360.cn/ee/" target="_blank" rel="noopener noreferrer">360</a>、
        <a href="https://browser.qq.com/" target="_blank" rel="noopener noreferrer">QQ</a>、
        safari和edge访问
      </p>
    </el-dialog>
  </div>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import Aside from '~/components/layout/aside'
import { getRouter } from '@/assets/request/user'
// import getCookie from '@@/assets/utils/getCookie'
import { getMemberLevelList } from '@/assets/request/member'
import { adminGetRequest } from '@/assets/request/chainRequest/admin'
import { roamRuleGetRequest } from '@/assets/request/chainRequest/roamRule'
import { yzChainRoleGetRequest } from '@/assets/request/chainRequest/yzChainRole'
import { httpRequest } from '@/assets/request/netbarinfo'
import { getCouponSetList } from '@/assets/request/marketing'
import { httpGetRequest } from '@/assets/request/waterProviderPost'
import Cookie from 'js-cookie'

export default {
  middleware: 'userMiddle',
  data() {
    return {
      isChain: false,
      isCookie: '',
      isIe: false
    }
  },
  components: {
    layoutHeader,
    Aside
  },
  created() {},
  mounted() {
    if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
      this.isIe = true
      return false
    } else {
      if (
        this.getQueryVariable('shopCookie') ||
        sessionStorage.getItem('shopCookie')
      ) {
        sessionStorage.setItem(
          'shopCookie',
          this.getQueryVariable('shopCookie') ||
            sessionStorage.getItem('shopCookie')
        )
        this.getUserInfo(1)
      } else {
        this.getUserInfo()
      }

      Cookie.set('source', 'admin', { expires: 1 })
      this.getCouponList()
    }
  },
  watch: {
    '$store.state.user.changeCookie'() {
      // console.log(this.$store.state.user.changeCookie)
      if (this.$store.state.user.changeCookie === 1) {
        this.getUserInfo()
      }
    }
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
          return pair[1]
        }
      }
      return false
    },
    async getCouponList() {
      const ress = await getCouponSetList({ current: 1, size: 1000 })
      if (ress.code === 200) {
        const obj = []
        ress.data.records.forEach(element => {
          obj.push({
            id: element.id,
            name: element.name,
            num: ''
          })
        })
        const data = JSON.stringify(obj)
        window.localStorage.couponList = data
      }
    },
    async getUserInfo(state) {
      const res = await httpRequest.userInfo()
      if (res.code === 200) {
        const arr = this.$router.app.$route.path.split('/')
        if (
          (arr[1] !== 'chainSystem' && res.data.hasShop === 0) ||
          state === 1
        ) {
          this.isChain = false
          setTimeout(() => {
            this.getRouter()
          }, 301)
        } else {
          // sessionStorage.removeItem('shopCookie')
          this.isChain = true
          this.getAuthList()
        }
        if (
          res.data.hasShop === 0 &&
          this.$route.path.indexOf('/chainSystem') !== -1
        ) {
          // window.location.href = '/'
          this.$router.push('/')
        }
        this.$store.commit('user/setUserInfo', res.data)
      } else {
        this.$message.error(res.msg)
      }
      const res4 = await roamRuleGetRequest.listShopOptions()
      if (res4.code === 200) {
        this.$store.commit('chainStore/setShopList', res4.data)
      }
      const res1 = await adminGetRequest.getList()
      if (res1.code === 200) {
        this.$store.commit('chainStore/setUserList', res1.data)
      }
      const res2 = await roamRuleGetRequest.listZone()
      if (res2.code === 200) {
        this.$store.commit('chainStore/setListZone', res2.data)
      }
      const res3 = await yzChainRoleGetRequest.getAuthList()
      if (res3.code === 200) {
        this.$store.commit('chainStore/setListRole', res3.data)
      }
      const res5 = await httpGetRequest.settingList()
      if (res5.code === 200 && res.data !== null) {
        this.$store.commit('waterBar/setTingList', res5.data)
      }
    },
    async getAuthList() {
      const res = await yzChainRoleGetRequest.getChainMenu()
      if (res.code === 200) {
        if (res.data.length === 0) {
          this.$message.error('该账户未配置后台权限,请联系管理员!')
        } else {
          this.$store.commit('login/setLoginState', 1)
          this.$store.commit('user/setRouterList', res.data)
          let i = 0
          res.data.forEach((element, index) => {
            if (element.url === this.strSplit(this.$route.path)) {
              i = index
            }
          })
          if (this.$route.path === '/') {
            this.$router.push(res.data[i].submenu[0].url)
          }
          this.$store.commit('user/setAsideListList', res.data[i].submenu)
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    async getRouter() {
      const memberRes = await getMemberLevelList()
      const res = await getRouter()
      if (memberRes.code === 200) {
        this.$store.commit('user/setMemberLevelList', memberRes.data)
      }
      if (res.code === 200) {
        if (res.data.length > 0) {
          this.$store.commit('login/setLoginState', 1)
          this.$store.commit('user/setRouterList', res.data)
          let i = 0
          res.data.forEach((element, index) => {
            if (element.url === this.strSplit(this.$route.path)) {
              i = index
            }
          })
          if (this.$route.path === '/') {
            this.$router.push(res.data[i].submenu[0].url)
          }
          this.$store.commit('user/setAsideListList', res.data[i].submenu)
        } else {
          this.$message.error('权限信息获取失败')
          // this.$router.push('/login')
          window.location.href = '/login'
        }
      } else {
        this.$message.error(res.msg)
        // this.$router.push('/login')
      }
    },
    strSplit(str) {
      const arr = str.split('/')
      return '/' + arr[1]
    }
  }
}
</script>

<style>
.elMain {
  height: calc(100vh - 30px);
  background: #f1f1f1;
  padding: 18px 30px 18px;
}
.isChain {
  height: calc(100vh - 30px);
}
.el-breadcrumb {
  padding-bottom: 20px;
}
.el-submenu__title {
  padding-left: 28px !important;
}
.el-submenu__title:hover {
  padding-left: 24px !important;
}
</style>




