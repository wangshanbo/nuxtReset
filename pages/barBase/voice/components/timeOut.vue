<template>
  <el-card shadow="hover" class="mt10">
    <el-button class="mb20" type="primary" size="small" @click="addSetTime()">新增</el-button>
    <el-table
      class="table mb20"
      :data="tableData"
      size="small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="voiceName" label="语音名称" align="center" width="160"></el-table-column>
      <!-- <el-table-column prop="bgVoiceName" label="背景音乐" align="center"></el-table-column> -->
      <el-table-column prop="playTime" label="播放时间" align="center"></el-table-column>
      <el-table-column prop="typeName" label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="Audition(scope.row)">试听</el-button>
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :current-page.sync="current"
      background
      @size-change="changeSize"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-if="total>10"
      @current-change="currentChange"
    ></el-pagination>
    <el-button type="danger" size="small" @click="del">批量删除</el-button>
    <addTimeOut ref="addTimeOut" @addSuccess="getData(1)"/>
    <audio ref="bgVoiceUrl" class="hide" :src="bgVoiceUrl"></audio>
    <audio ref="voiceUrl" class="hide" :src="voiceUrl"></audio>
  </el-card>
</template>
<script>
import addTimeOut from './dialog/addTimeOut'
import { httpRequest, httpPostRequest } from '@/assets/request/voice'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      bgVoiceUrl: '',
      voiceUrl: '',
      playFlag: false
    }
  },
  components: {
    addTimeOut
  },
  created() {},
  mounted() {
    this.getData(1)
  },
  watch: {},
  methods: {
    async del(row) {
      let confirmText = ''
      if (row.id) {
        confirmText = '确定删除此条语音提示吗?'
      } else if (this.multipleSelection.length > 0) {
        confirmText = '确定删除已选中语音提示吗?'
      } else {
        this.$message({
          message: '请选择要删除的语音',
          type: 'error'
        })
        return false
      }
      this.$confirm(confirmText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        if (row.id) {
          ids.push(row.id)
        } else {
          this.multipleSelection.forEach(element => {
            ids.push(element.id)
          })
        }
        const parameter = {
          ids: ids
        }
        httpPostRequest.timeDel(parameter).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getData(1)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    },
    currentChange(val) {
      this.current = val
      this.getData()
    },
    changeSize(v) {
      this.size = v
      this.getData(1)
    },
    async getData(current) {
      if (current) {
        this.current = current
      }
      const parameter = {
        current: this.current,
        size: this.size
      }
      const res = await httpRequest.timePage(parameter)
      if (res.code === 200) {
        this.tableData = res.data.records
        this.total = res.data.total
      }
    },
    addSetTime() {
      this.$refs.addTimeOut.show()
    },
    edit(row) {
      this.$refs.addTimeOut.show(row)
    },
    Audition(row) {
      this.bgVoiceUrl = row.bgVoiceUrl
      this.voiceUrl = row.voiceUrl
      setTimeout(() => {
        if (this.playFlag) {
          this.$refs.bgVoiceUrl.pause()
          this.$refs.voiceUrl.pause()
        } else {
          this.$refs.bgVoiceUrl.play()
          this.$refs.voiceUrl.play()
        }
        this.playFlag = !this.playFlag
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.fromLabel {
  margin-right: 8px;
}
</style>



