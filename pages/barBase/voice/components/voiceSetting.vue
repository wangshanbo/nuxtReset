<template>
  <div class="otherSettings">
    <el-card shadow="hover" class="content">
      <p>语音设置</p>
      <div class="switch-wrap" v-for="(item,index) in dataList" :key="index">
        <label>{{item.title}}</label>
        <el-switch v-model="item.value" @change="upDate(item)"></el-switch>
      </div>
    </el-card>
  </div>
</template>
<script>
import { httpRequest } from '@/assets/request/netbarinfo'
import { httpPostRequest } from '@/assets/request/netbarinfoPost'
import { debounce } from '@/assets/utils/rx.js'
export default {
  components: {},
  data() {
    return {
      dataList: '',
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async updateState(id, state) {
      const res = await httpPostRequest.updateShowFlag({
        id: id,
        showFlag: state
      })
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getData()
      } else {
        this.$message.error(res.msg)
      }
    },
    async getData() {
      const res = await httpRequest.listByType({ type: 3 })
      res.data.forEach(element => {
        element.value = element.value === 'true'
      })
      this.dataList = res.data
    },
    debounce: debounce(
      function db(params) {
        if (params.value !== '') {
          this.upDate(params)
        } else {
          this.$message.error('请输入正确数值')
          this.getData()
        }
      },
      500,
      false
    ),
    async upDate(item) {
      const parameter = {
        id: item.id,
        value: item.value.toString()
      }
      const res = await httpPostRequest.updateSetting(parameter)
      if (res.code === 200) {
        this.switchChange(item)
        this.$message({
          message: res.msg,
          type: 'success'
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    switchChange(item) {
      if (item.switchModel) {
        item.activeText = '已开启'
      } else {
        item.activeText = '已关闭'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  min-width: 340px;
  min-height: 450px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .clearfix {
    width: 330px;
    max-height: 210px;
    overflow-y: auto;
  }
  .bannerContent {
    width: 140px;
    height: 73px;
    float: left;
    margin: 0 10px 30px 10px;
    position: relative;
    text-align: center;
    line-height: 73px;
    img {
      width: 100%;
      height: 100%;
    }
    .sort {
      width: 18px;
      height: 18px;
      background: rgba(255, 255, 255, 0.9);
      color: #111;
      font-size: 12px;
      line-height: 18px;
      position: absolute;
      z-index: 4;
    }
    .showFlag {
      height: 18px;
      background: rgba(255, 255, 255, 0.9);
      color: #111;
      font-size: 12px;
      line-height: 18px;
      padding: 0 5px;
      position: absolute;
      right: 0;
      z-index: 4;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.3s;
      opacity: 0;
    }
    .title {
      width: 100%;
      height: 16px;
      line-height: 16px;
      position: absolute;
      left: 0;
      bottom: -20px;
    }
    .edit {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: 0.3s;
      opacity: 0;
      z-index: 3;
      .btn {
        position: relative;
        &::after {
          content: " ";
          position: absolute;
          left: -15px;
          top: -15px;
          right: -15px;
          bottom: -15px;
        }
        &:hover {
          transition: 0.3s;
          transform: scale(1.3);
          margin: 0 15px;
        }
      }
    }
    &:hover {
      .edit {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      .mask {
        opacity: 1;
      }
    }
  }
}
.dialog-wrap {
  margin-bottom: 10px;
  > label {
    min-width: 100px;
    line-height: 40px;
    margin-right: 22px;
    text-align: right;
  }
  img {
    width: 140px;
    max-height: 140px;
  }
  .lineHeight {
    line-height: 40px;
  }
}
.switch-wrap {
  label {
    min-width: 250px;
    display: inline-block;
    text-align: left;
    margin-bottom: 15px;
  }
}
</style>
<style lang="scss">
.otherSettings {
  .el-switch__label.is-active {
    color: #13ce66;
  }
  .el-input {
    width: auto;
  }
}
</style>


