<template>
  <el-card shadow="hover" class="mt10">
    <div class="mb20">
      <label class="fromLabel">播报时间:</label>
      <el-radio-group v-model="callTime">
        <el-radio
          :label="item.label"
          v-for="(item,index) in callTimeList"
          :key="index"
        >{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <transition name="el-zoom-in-top">
      <div class="mb20" v-show="callTime==2">
        <el-time-select
          class="w150"
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:59',
          maxTime: endTime
        }"
          size="small"
        ></el-time-select>&nbsp;—
        <el-time-select
          class="w150"
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:59',
          minTime: startTime
        }"
          size="small"
        ></el-time-select>
        <p
          class="mt10"
          style="color: rgb(153, 153, 153); font-size: 12px; line-height: 1;"
        >非指定时间段时不会播报语音，但控制台还能收到提示</p>
      </div>
    </transition>

    <div class="mb20">
      <label class="fromLabel">连续播报:</label>
      <el-select class="w150" v-model="callNum" placeholder="请选择播报次数" size="small">
        <el-option
          v-for="item in callNumOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-table class="table mb20" :data="tableData" size="small">
      <el-table-column label="呼叫类型" align="center">
        <template slot-scope="scope">{{scope.row.type==1?'呼叫网管':''}}</template>
      </el-table-column>
      <el-table-column prop="productId" label="提示音" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.voiceId" placeholder="请选择">
            <el-option
              v-for="item in tipList"
              :key="item.voiceId"
              :label="item.voiceName"
              :value="item.voiceId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="快捷键" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.keyboard" placeholder="请选择">
            <el-option
              v-for="item in shortcutKeysList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="启用" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.enableState"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="playAudio(scope.row)">试听</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tac">
      <el-button type="primary" @click="save" size="small">保存</el-button>
    </div>
    <audio ref="audio" class="hide" :src="audioSrc"></audio>
  </el-card>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import { httpRequest, httpJsonRequest } from '@/assets/request/voice'
export default {
  data() {
    return {
      callTime: 0,
      callTimeList: [
        {
          name: '全天',
          label: 1
        },
        {
          name: '指定时间段',
          label: 2
        }
      ],
      callNum: 1,
      callNumOption: [
        {
          value: 1,
          label: '1次'
        },
        {
          value: 2,
          label: '2次'
        }
      ],
      shortcutKeys: '',
      shortcutKeysList: [
        {
          value: '',
          label: '不使用快捷键'
        },
        {
          value: 'Shift,F1',
          label: 'Shift+F1'
        },
        {
          value: 'Shift,F2',
          label: 'Shift+F2'
        },
        {
          value: 'Shift,F3',
          label: 'Shift+F3'
        },
        {
          value: 'Shift,F4',
          label: 'Shift+F4'
        },
        {
          value: 'Shift,F5',
          label: 'Shift+F5'
        },
        {
          value: 'Shift,F6',
          label: 'Shift+F6'
        },
        {
          value: 'Shift,F7',
          label: 'Shift+F7'
        },
        {
          value: 'Shift,F8',
          label: 'Shift+F8'
        },
        {
          value: 'Shift,F9',
          label: 'Shift+F9'
        },
        {
          value: 'Shift,F10',
          label: 'Shift+F10'
        },
        {
          value: 'Shift,F11',
          label: 'Shift+F11'
        },
        {
          value: 'Shift,F12',
          label: 'Shift+F12'
        },
        {
          value: 'Ctrl,Shift,F1',
          label: 'Ctrl+Shift+F1'
        },
        {
          value: 'Ctrl,Shift,F2',
          label: 'Ctrl+Shift+F2'
        },
        {
          value: 'Ctrl,Shift,F3',
          label: 'Ctrl+Shift+F3'
        }
      ],
      tipList: [],
      tableData: [],
      startTime: '',
      endTime: '',
      playFlag: false,
      audioSrc: ''
    }
  },
  components: {
    layoutHeader
  },
  created() {},
  mounted() {
    this.getTipList()
    this.getList()
  },
  watch: {},
  methods: {
    playAudio() {
      if (this.playFlag) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.playFlag = !this.playFlag
    },
    async save(m) {
      this.tableData.forEach(element => {
        element.enableState
          ? (element.enableState = 1)
          : (element.enableState = 0)
      })
      const parameter = {
        detailList: this.tableData,
        playType: this.callTime,
        playTimes: this.callNum
      }
      if (this.callTime === 2) {
        if (
          this.startTime === '' ||
          this.startTime === null ||
          this.endTime === '' ||
          this.endTime === null
        ) {
          this.$message({
            message: '请选择时间段',
            type: 'error'
          })
          return false
        } else {
          parameter.playPeriod = `${this.startTime}-${this.endTime}`
        }
      }
      const res = await httpJsonRequest.callSave(parameter)
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getList()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    async getList() {
      const res = await httpRequest.callQuery()
      if (res.code === 200) {
        const d = res.data
        this.tableData = d.detailList
        this.callTime = d.playType
        this.callNum = d.playTimes
        this.startTime = d.playPeriod.split('-')[0]
        this.endTime = d.playPeriod.split('-')[1]
        this.tableData.forEach(element => {
          this.audioSrc = element.voiceUrl
          element.enableState === 0
            ? (element.enableState = false)
            : (element.enableState = true)
        })
      }
    },
    async getTipList() {
      const res = await httpRequest.listByType({ voiceType: 4 })
      if (res.code === 200) {
        this.tipList = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fromLabel {
  margin-right: 8px;
}
</style>



