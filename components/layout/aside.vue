<template>
  <aside class="menu-aside noselect">
    <p class="tac">
      <i
        class="iconfont f24 cp"
        style="padding: 0 0 10px;"
        @click="isCollapse = !isCollapse"
      >&#xe610;</i>
    </p>
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :unique-opened="true"
    >
      <span v-for="(item,index) in asideList" :key="index">
        <el-menu-item
          class="aside-menu-item"
          :class="activeIndex===item.url?'is-active':''"
          :index="item.url"
          v-if="!item.submenu||item.submenu.length==0"
        >
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-submenu
          :index="item.name"
          v-if="item.submenu&&item.submenu.length>0"
        >
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span v-if="!isCollapse">{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="(val,i) in item.submenu"
            :key="i"
            :index="val.url"
            :default-active="activeIndex"
          >{{val.name}}</el-menu-item>
        </el-submenu>
      </span>
    </el-menu>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import { getCookie } from '@/assets/utils/getCookie'
export default {
  data() {
    return {
      barName: '',
      activeIndex: '',
      asideList: [],
      isCollapse: false
    }
  },
  computed: {
    ...mapState({})
  },
  created() {},
  mounted() {
    // this.activeIndex =
    //   this.strSplit(this.$router.app.$route.path) || this.$route.path
    // console.log(this.$route.path)\\\
    const that = this
    that.screenWidth()
    window.onresize = () => {
      return (() => {
        that.screenWidth()
      })()
    }
  },
  watch: {
    '$store.state.user.asideList'() {
      if (getCookie('wisdomCookie') === '') {
        window.location.href = '/login'
      }
      this.asideList = this.$store.state.user.asideList
      if (this.activeIndex === '') {
        this.activeIndex = this.$route.path
      } else {
        this.activeIndex = this.asideList[0].url
      }
    }
  },
  methods: {
    screenWidth() {
      window.screenWidth = document.body.clientWidth
      if (window.screenWidth <= 1200) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    },
    strSplit(str) {
      const arr = str.split('/')
      if (arr[1] === 'barCost') {
        return '/' + arr[1] + '/' + arr[2]
      } else {
        return this.$router.app.$route.path
      }
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss">
.menu-aside {
  height: calc(100vh - 46px);
  padding-top: 15px;
  .aside-menu-item {
    width: 100%;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item {
    border-left: 4px solid #fff;
  }
  .el-menu-item.is-active,
  .el-menu-item:not(.is-disabled):hover,
  .el-submenu .el-submenu__title:hover {
    background-color: #428bca;
    border-left: 4px solid #3dafff;
    border-bottom: 0;
    color: #fff;
    padding-right: 0;
    .iconfont {
      color: #fff !important;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}
</style>

