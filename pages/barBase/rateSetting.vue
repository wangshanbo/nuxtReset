<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>费率设置</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="breadcrumbList">
      <el-radio-group v-model="breadcrumbRadio" size="small">
        <el-radio-button
          :label="item.key"
          v-for="(item,index) in breadcrumbList"
          :key="index"
        >{{item.val}}</el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <nuxt-child keep-alive :key="key"/>
    </div>
  </div>
</template>
<script>
import layoutHeader from '~/components/layout/header'
export default {
  data() {
    return {
      breadcrumb: '费率设置',
      RegionList: [],
      breadcrumbRadio: 2,
      breadcrumbList: [
        {
          key: 2,
          val: '区域设置',
          path: '/barBase/rateSetting/barregion'
        },
        {
          key: 1,
          val: '费率设置',
          path: '/barBase/rateSetting/rateSetting'
        },
        {
          key: 3,
          val: '包时长/段',
          path: '/barBase/rateSetting/periodDuration'
        },
        {
          key: 5,
          val: '附加费',
          path: '/barBase/rateSetting/extra'
        },
        {
          key: 6,
          val: '扣费设置',
          path: '/barBase/rateSetting/feededuction'
        },
        {
          key: 7,
          val: '特定费率',
          path: '/barBase/rateSetting/special'
        },
        {
          key: 8,
          val: '网费设置',
          path: '/barBase/rateSetting/netfeeSetting'
        }
      ]
    }
  },
  components: {
    layoutHeader
  },
  computed: {
    key() {
      return this.$route.path + Math.random()
    }
  },
  created() {},
  mounted() {
    if (this.$route.path === '/barBase/rateSetting') {
      this.$router.push({
        path: '/barBase/rateSetting/barregion'
      })
    }
    this.breadcrumbList.forEach(element => {
      if (this.$route.path === element.path || this.$route.path === element.path + '/') {
        this.breadcrumb = element.val
        this.breadcrumbRadio = element.key
      }
    })
  },
  watch: {
    breadcrumbRadio() {
      this.breadcrumbList.forEach(element => {
        if (this.breadcrumbRadio === element.key) {
          this.breadcrumb = element.val
          this.$router.push({
            path: element.path
          })
        }
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.search {
  p {
    background-color: #d5dbea;
    padding: 8px 0 8px 15px;
    margin-top: 15px;
  }
  .el-range-editor.el-input__inner {
    min-width: 600px;
  }
}
.breadcrumbList {
  margin-bottom: 20px;
}
</style>






