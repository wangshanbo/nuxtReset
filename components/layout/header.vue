<template>
  <header>
    <div class="bartop">
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        size="mini"
        v-if="hasShop==1&&isChain"
        @click="goShopList"
      >公众号列表</el-button>
      <span v-if="!isChain">{{$store.state.user.userInfo.shopName}}, 欢迎您，</span>
      <div class="headerDropdown">
        <span>{{barName}}</span>
        <div class="dropdown-content">
          <div @click="dialogVisible = true">修改密码</div>
          <div @click="logout">退出系统</div>
        </div>
      </div>
      <ul class="navbar-right">
        <li class="fl">客服电话：400-800-6330</li>
        <li class="fr">
          <a href="http://www.aida58.com/help/list" target="_blank">帮助中心</a>
        </li>
      </ul>
    </div>
    <div class="menu-header">
      <el-menu
        v-if="showMenu"
        :default-active="routerActive"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          :index="item.url"
          v-for="(item,index) in routerList"
          :key="index"
          @click="menyClick(routerList,index)"
        >
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="passwordForm" label-width="100px">
        <el-form-item label="设置密码">
          <el-input type="password" v-model="passwordForm.setPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPassWord">确 定</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { logout } from '@/assets/request/user'
import { httpPostRequest } from '@/assets/request/netbarinfoPost'

import validateCenter from '@/assets/utils/validateCenter'
export default {
  props: {
    isChain: Boolean
  },
  data() {
    return {
      barName: '',
      routerActive: '',
      routerList: [],
      routerIndex: 0,
      passwordForm: {
        setPassword: '',
        confirmPassword: ''
      },
      showWeixin: false,
      dialogVisible: false,
      hasShop: 0,
      showMenu: true
    }
  },
  computed: {
    ...mapState({})
  },
  created() {},
  mounted() {
    window.addEventListener('popstate', this.goBack, false)
    this.routerActive = this.strSplit(this.$router.app.$route.path)
    if (this.$route.query.wxId) {
      window.localStorage.setItem('wxId', this.$route.query.wxId)
    }
  },
  watch: {
    '$router.app.$route.path'() {
      this.goBack()
    },
    '$store.state.user.routerList'() {
      this.routerList = this.$store.state.user.routerList
      if (this.routerList[0].id === null) {
        this.showMenu = false
      }
    },
    '$store.state.user.userInfo'() {
      this.barName = this.$store.state.user.userInfo.username
      this.hasShop = this.$store.state.user.userInfo.hasShop
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.passwordForm.setPassword = ''
        this.passwordForm.confirmPassword = ''
      }
    },
    routerList() {
      if (this.routerList.length > 0) {
        setTimeout(() => {
          this.showWeixin = true
        }, 100)
      }
    }
  },
  methods: {
    goShopList() {
      window.location.href = '/storeManagement'
    },
    goBack() {
      let _index
      this.routerList.forEach((element, index) => {
        if (this.$router.app.$route.path.indexOf(element.url) !== -1) {
          _index = index
        }
      })
      this.routerActive = this.strSplit(this.$router.app.$route.path)
      this.menyClick(this.routerList, _index)
    },
    strSplit(str) {
      const arr = str.split('/')
      return '/' + arr[1]
    },
    logout() {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(v => {
          if (v.code === 200) {
            window.localStorage.removeItem('wxId')
            window.location.href = '/login'
          } else {
            this.$message.error(v.msg)
          }
        })
      })
    },
    async editPassWord() {
      if (this.passwordForm.confirmPassword !== this.passwordForm.setPassword) {
        this.$message.error('两次输入的密码不一致')
        return false
      }
      const vdtObj = validateCenter.passwordWhds(
        this.passwordForm.confirmPassword
      )
      if (!vdtObj.res) {
        this.$message.error(vdtObj.msg)
        return false
      }
      const res = await httpPostRequest.changePwd({
        password: this.passwordForm.confirmPassword
      })
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg)
      }
    },
    handleSelect(key, keyPath) {
      if (key !== null) {
        this.$router.push(key)
      }
    },
    menyClick(data, i) {
      if (i > -1) {
        this.$store.commit('user/setAsideListList', data[i].submenu)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.bartop {
  height: 30px;
  line-height: 27px;
  color: #d5dbea;
  background-color: #0e2f5a;
  font-size: 14px;
  padding-left: 15px;
  .navbar-right {
    color: #fff;
    float: right;
    margin: 0;
    .fl {
      display: inline-block;
      padding: 0 15px;
    }
    .fr {
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 20px 0 0 20px;
      padding: 0 15px;
      > a {
        color: #fff;
      }
    }
  }
  .headerDropdown {
    display: inline-block;
    position: relative;
    color: #3dafff;
    &:hover {
      .dropdown-content {
        height: 90px;
        opacity: 1;
      }
    }
    .dropdown-content {
      width: 160px;
      height: 0;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      overflow: hidden;
      opacity: 0;
      transition: 0.3s;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      > div {
        color: #333;
        cursor: pointer;
        text-align: center;
        line-height: 45px;
        &:hover {
          background-color: #eee;
        }
        &:first-child {
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
<style>
.menu-header .el-menu {
  background: #23508c;
}
.menu-header .iconfont {
  color: #fff !important;
}
.menu-header .el-menu--horizontal > .el-menu-item {
  height: 51px;
  color: #fff;
  line-height: 51px;
}
.menu-header .el-menu-item.is-active,
.menu-header .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.menu-header .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.menu-header .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #1a3062;
  color: #fff;
}
</style>


