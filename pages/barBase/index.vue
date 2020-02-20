<template>
  <div class="baseInfo">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>基本资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <setTag>基本设置</setTag>
    <div class="fromView">
      <div class="inputWrap">
        <label>网咖名称</label>
        <el-input
          v-model.trim="barName"
          placeholder="网咖名字"
        ></el-input>
      </div>
      <div class="inputWrap">
        <label>公司名称</label>
        <el-input
          v-model.trim="firmNmae"
          placeholder="公司名称"
        ></el-input>
      </div>
      <div class="inputWrap">
        <label>联系电话</label>
        <el-input
          v-model.trim="firmPhone"
          placeholder="联系电话"
          oninput="value=value.replace(/[^0-9]/g,'')"
        ></el-input>
      </div>
      <div class="inputWrap">
        <label>公告</label>
        <el-input
          v-model.trim="Notice"
          placeholder="公告"
        ></el-input>
      </div>
      <div class="inputWrap">
        <label>网咖地址</label>
        <el-input
          v-model.trim="barAddress"
          placeholder="网咖地址"
          :disabled="true"
        ></el-input>
      </div>
    </div>
    <setTag>网咖地图</setTag>
    <div class="fromView">
      <div class="inputWrap">
        <label>搜索网咖地址:</label>
        <el-input
          v-model.trim="keyword"
          @focus="searchChange"
          @blur="searchBlur"
          placeholder="网咖地址为地图坐标设定，可手动修改地点"
        ></el-input>
      </div>
      <baidu-map
        class="bm-view"
        ak="0S16sF0YrSj15QOovMcKebdcH3RerrsV"
        :center="center"
        :zoom="zoom"
        :anchor="anchor"
        :scroll-wheel-zoom="true"
        @ready="handler"
      >
        <bm-local-search
          v-show="searchState"
          class="local-search"
          :keyword="keyword"
          :auto-viewport="true"
          @infohtmlset="infohtmlset"
        ></bm-local-search>
      </baidu-map>
    </div>
    <div class="tac">
      <el-button>取 消</el-button>
      <el-button
        type="primary mt20"
        @click="saveShop"
      >确 定</el-button>
    </div>
  </div>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import BaiduMap from '~/components/vue-baidu-map/components/map/Map.vue'
import BmLocalSearch from '~/components/vue-baidu-map/components/search/LocalSearch.vue'
import setTag from '~/components/tag'
import { httpRequest } from '@/assets/request/netbarinfo'
import { storeManagementPostRequest } from '@/assets/request/storeManagementPost'

export default {
  middleware: 'userMiddle',
  data() {
    return {
      barName: '',
      firmNmae: '',
      firmPhone: '',
      Notice: '',
      barAddress: '',
      center: { lng: '', lat: '' },
      zoom: 15,
      anchor: 'BMAP_ANCHOR_TOP_RIGHT',
      keyword: '',
      searchState: false,
      mapLng: '', // 地图经度
      mapLat: '', // 地图纬度
      errorList: [
        {
          key: 'barName',
          val: '网咖名称不能为空'
        },
        {
          key: 'firmNmae',
          val: '公司名称不能为空'
        },
        {
          key: 'firmPhone',
          val: '联系电话不能为空'
        },
        {
          key: 'Notice',
          val: '公告不能为空'
        },
        {
          key: 'barAddress',
          val: '网咖地址不能为空'
        }
      ],
      shopData: '',
      isReady: false
    }
  },
  components: {
    layoutHeader,
    BaiduMap,
    BmLocalSearch,
    setTag
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
    // this.getData()
  },
  watch: {
    isReady() {
      this.keyword = this.shopData.address
      this.zoom = 15
    }
  },
  methods: {
    async saveShop() {
      let noError = 0
      this.errorList.forEach(element => {
        if (this[element.key] === '') {
          this.$message({
            message: element.val,
            type: 'error'
          })
          noError++
        }
      })
      // console.log(this.mapLat)
      // console.log(noError)
      if (noError > 0 || this.mapLat === '') {
        return false
      }
      const paramter = {
        shopName: this.barName,
        company: this.firmNmae,
        phone: this.firmPhone,
        notice: this.Notice,
        address: this.barAddress,
        locationx: this.mapLat,
        locationy: this.mapLng
      }
      const res = await storeManagementPostRequest.editShopDetail(paramter)
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    async getData() {
      const res = await httpRequest.getShop()
      const _d = res.data
      if (res.code === 200) {
        this.barName = _d.shopName
        this.firmNmae = _d.company
        this.firmPhone = _d.phone
        this.Notice = _d.notice
        this.barAddress = _d.address
        this.shopData = _d
        this.mapLng = _d.locationy
        this.mapLat = _d.locationx
      }
    },
    handler({ BMap, map }) {
      setTimeout(() => {
        this.isReady = true
      }, 300)
    },
    infohtmlset(poi) {
      this.barAddress = poi.address
      this.mapLng = poi.point.lng
      this.mapLat = poi.point.lat
      // console.log(poi.point.lat)
      this.searchState = false
    },
    searchChange() {
      this.searchState = true
    },
    searchBlur() {
      setTimeout(() => {
        this.searchState = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfo {
  padding-bottom: 20px;
  .inputWrap {
    display: flex;
    margin-bottom: 15px;
    > label {
      width: 300px;
      line-height: 40px;
      margin-right: 20px;
      text-align: right;
    }
    > .el-input {
      flex: 5;
    }
  }
  .fromView {
    background-color: #f8f8f8;
    border-top: 2px solid #d5dbea;
    padding: 10px 20px;
    margin-top: 15px;
    position: relative;
    .bm-view {
      width: 100%;
      height: 400px;
      padding-bottom: 20px;
    }
    .searchInput {
      margin-bottom: 15px;
    }
    .local-search {
      min-width: 300px;
      position: absolute;
      top: 50px;
      left: 340px;
    }
  }
}
</style>
<style lang="scss">
.baseInfo {
  .el-input {
    width: 50%;
  }
}
</style>




