<template>
  <el-dialog
    class="waterbar-wrap"
    :close-on-click-modal="false"
    title="语音编辑"
    :visible.sync="showDialog"
    width="900px"
  >
    <div class="mb20">
      <label class="fromLabel">语音名称:</label>
      <!-- <div v-for="(group,index) in listTimedVoiceList" :key="index">
        {{group.label}}
        <div v-for="item in group.options" :key="item.id">{{item.voiceName}}</div>
      </div> -->
      <el-select v-model="listTimedVoice" placeholder="请选择语音名称">
        <el-option-group
          v-for="(group,index) in listTimedVoiceList"
          :key="index"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.voiceId"
            :label="item.voiceName"
            :value="item.voiceId"
          ></el-option>
        </el-option-group>
      </el-select>
      <!-- <el-button type="primary" @click="$refs.addCustom.show()">添加自定义语音</el-button> -->
    </div>
    <div class="mb20" v-if="false">
      <label class="fromLabel">背景音乐:</label>
      <el-select v-model="voiceBg" placeholder="请选择背景音乐">
        <el-option
          v-for="item in voiceBgList"
          :key="item.id"
          :label="item.voiceName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="mb20">
      <label class="fromLabel">播放时间:</label>
      <div class="inBlock textTop">
        <div class="timeView mb20 noSelect">
          <span
            class="timeText"
            :class="{'vbHide':index==active}"
            v-for="(item,index) in timeText"
            :key="index"
          >
            {{item}}
            <i class="el-icon-close" @click="delTime(index)"></i>
          </span>
        </div>
        <div>
          快速添加
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
          ></el-time-select>&nbsp;每隔
          <div class="inBlock" style="width:90px;">
            <el-input
              v-model.trim="timeValue"
              size="small"
              maxlength="3"
              oninput="value=value.replace(/[^\d^\.]+/g,'')"
            ></el-input>
          </div>分钟播报一次
          <el-button type="primary" size="small" @click="setTime">生成时间</el-button>
        </div>
      </div>
      <div class="mt20 tac">
        <el-button size="small" @click="showDialog = false">&emsp;取消&emsp;</el-button>
        <el-button type="primary" size="small" @click="save">&emsp;保存&emsp;</el-button>
      </div>
    </div>
  <addCustom ref="addCustom" @customSave="customSave" />
  </el-dialog>
</template>
<script>
import addCustom from './addCustom'
import { httpRequest, httpPostRequest } from '@/assets/request/voice'
export default {
  data() {
    return {
      showDialog: false,
      timeValue: 60,
      voiceBg: '',
      voiceBgList: [],
      listTimedVoice: '',
      listTimedVoiceList: [],
      startTime: '',
      endTime: '',
      timeText: [],
      active: -1,
      id: '',
      allVoiceList: []
    }
  },
  components: {
    addCustom
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    customSave() {
      this.getList()
    },
    async save() {
      const parameter = {
        playTime: this.timeText
      }
      if (this.id !== '') {
        parameter.id = this.id
      }
      // this.voiceBgList.forEach(element => {
      //   if (element.id === this.voiceBg) {
      //     parameter.bgVoiceId = element.id
      //     parameter.bgVoiceName = element.voiceName
      //     parameter.bgVoiceUrl = element.voiceUrl
      //   }
      // })
      this.allVoiceList.forEach(element => {
        if (this.listTimedVoice === element.voiceId) {
          parameter.voiceId = element.voiceId
          parameter.voiceName = element.voiceName
          parameter.voiceUrl = element.voiceUrl
        }
      })
      const res = await httpPostRequest.timeSave(parameter)
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('addSuccess', true)
        this.showDialog = false
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    delTime(i) {
      this.active = i
      setTimeout(() => {
        this.timeText.splice(i, 1)
        this.active = -1
      }, 200)
    },
    show(row) {
      if (row) {
        this.id = row.id
        const time = row.playTime.split(',')
        this.timeText = time
        this.voiceBg = row.bgVoiceId
        this.listTimedVoice = row.voiceId
        this.startTime = '00:00'
        this.endTime = '01:00'
        this.timeValue = 60
      } else {
        this.id = ''
        this.timeText = []
        this.timeValue = 60
        this.voiceBg = ''
        this.listTimedVoice = ''
        this.startTime = ''
        this.endTime = ''
      }
      this.showDialog = true
      this.getList()
    },
    async getList() {
      // const res = await httpRequest.listByType({ voiceType: 3 })
      const res1 = await httpRequest.listTimedVoice()
      // if (res.code === 200) {
      //   this.voiceBgList = res.data
      // }
      if (res1.code === 200) {
        this.listTimedVoiceList = []
        this.allVoiceList = []
        for (const key in res1.data) {
          if (res1.data.hasOwnProperty(key)) {
            const element = res1.data[key]
            this.listTimedVoiceList.push({
              label: key,
              options: element
            })
            this.allVoiceList.push(element)
          }
        }
        this.allVoiceList = this.allVoiceList[0].concat(this.allVoiceList[1])
      }
    },
    playAudio() {
      if (this.playFlag) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.playFlag = !this.playFlag
    },
    setTime() {
      this.startTime
      this.endTime
      if (this.endTime === '' || this.startTime === '') {
        this.$message({
          message: '请选择播放时间',
          type: 'error'
        })
        return false
      }
      if (this.timeValue < 1) {
        this.$message({
          message: '请输入间隔时间 (不得小于1分钟)',
          type: 'error'
        })
        return false
      }
      this.timeText = this.splitTime(
        this.startTime,
        this.endTime,
        this.timeValue * 60 * 1000
      )
    },
    splitTime(startDate, endDate, amount) {
      var startTime = new Date('2019/01/01 ' + startDate)
      var endTime = new Date('2019/01/01 ' + endDate)
      var gap = (endTime - startTime) / amount

      var temp = []
      // for (var i = 0; i <= gap; i++) {
      for (var i = 0; i < gap; i++) {
        const setDate = new Date(startTime.getTime())
        const h = setDate.getHours()
        const mm = setDate.getMinutes()
        temp[i] = `${h > 9 ? h : '0' + h}:${mm > 9 ? mm : '0' + mm}`
        startTime.setMilliseconds(startTime.getMilliseconds() + amount)
      }
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
.fromLabel {
  margin-right: 8px;
}
.audio {
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
}
.textTop {
  width: 90%;
}
.vbHide {
  transform: scale(0);
}
.timeView {
  width: 97%;
  border: 1px solid #dcdfe6;
  height: 300px;
  position: relative;
  padding-bottom: 10px;
  overflow-y: auto;
  .timeText {
    width: 71.33px;
    height: 32px;
    background-color: rgba(64, 158, 255, 0.1);
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, 0.2);
    white-space: nowrap;
    transition: 0.2s;
    i {
      cursor: pointer;
      display: inline-block;
      font-size: 13px;
      transition: 0.2s;
      margin-left: 8px;
      &:hover {
        color: rgb(228, 98, 99);
        transform: scale(1.2);
      }
    }
  }
}
</style>


