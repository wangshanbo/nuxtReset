<template>
  <div class="public">
    <header>
      <div class="bartop">
        <div class="headerDropdown">
          <span>{{barName}}</span>
          <div class="dropdown-content">
            <div @click="dialogVisible=true">修改密码</div>
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
    </header>
    <el-container>
      <el-main class="elMain">
        <transition name="el-fade-in">
          <nuxt />
        </transition>
      </el-main>
    </el-container>
    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="passwordForm" label-width="100px">
        <el-form-item label="设置密码">
          <el-input type="password" v-model.trim="passwordForm.setPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model.trim="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPassWord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import Aside from '~/components/layout/aside'
import { httpPostRequest } from '@/assets/request/netbarinfoPost'
import { httpRequest } from '@/assets/request/netbarinfo'
import { logout } from '@/assets/request/user'
import validateCenter from '@/assets/utils/validateCenter'
export default {
  middleware: 'userMiddle',
  data() {
    return {
      barName: '',
      passwordForm: {
        setPassword: '',
        confirmPassword: ''
      },
      dialogVisible: false
    }
  },
  components: {
    layoutHeader,
    Aside
  },
  created() {},
  mounted() {
    this.getUserInfo()
  },
  watch: {
    '$store.state.user.userInfo'() {
      this.barName = this.$store.state.user.userInfo.username
    }
  },
  methods: {
    async getUserInfo() {
      const res = await httpRequest.userInfo()
      if (res.code === 200) {
        this.$store.commit('user/setUserInfo', res.data)
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.bartop {
  height: 30px;
  line-height: 30px;
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
    color: #68c1ff;
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

<style lang="scss">
.public {
  .elMain {
    height: calc(100vh - 30px);
    background: #f1f1f1;
    padding: 18px 30px 18px;
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
}
</style>




