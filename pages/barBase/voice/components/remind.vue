<template>
  <el-card shadow="hover" class="mt10">
    <div class="mb20">
      <label class="fromLabel">启用功能:</label>
      <div class="inBlock textTop">
        <el-switch v-model="from.offlineEnable" active-text="开启下机清理提示"></el-switch>
        <p
          class="mt10"
          style="color: rgb(153, 153, 153); font-size: 12px; line-height: 1;"
        >非指定时间段时不会播报语音，但控制台还能收到提示</p>
      </div>
    </div>
    <div class="mb20">
      <label class="fromLabel">播报时间:</label>
      <el-radio-group v-model="from.playType">
        <el-radio
          :label="item.label"
          v-for="(item,index) in callTimeList"
          :key="index"
        >{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <transition name="el-zoom-in-top">
      <div class="mb20" v-show="from.playType==2">
        <el-time-select
          class="w150"
          placeholder="起始时间"
          v-model="from.startTime"
          :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:59',
          maxTime: from.endTime
        }"
          size="small"
        ></el-time-select>&nbsp;—
        <el-time-select
          class="w150"
          placeholder="结束时间"
          v-model="from.endTime"
          :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:59',
          minTime: from.startTime
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
      <label class="fromLabel">播报规则:</label>
      提示语音播报
      <el-select v-model="from.playTimes" placeholder="请选择播报次数">
        <el-option
          v-for="item in callNumOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="mb20">
      <label class="fromLabel">播报区域:</label>
      <el-checkbox-group class="inBlock" v-model="from.playRegion">
        <el-checkbox :label="item.id" v-for="(item,index) in RegionList" :key="index">{{item.title}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="mb20">
      <label class="fromLabel">提示音:</label>
      <el-select v-model="from.voiceId" placeholder="请选择" size="small">
        <el-option v-for="item in tipList" :key="item.voiceId" :label="item.voiceName" :value="item.voiceId"></el-option>
      </el-select>
      <audio ref="audio" class="hide" :src="from.voiceUrl"></audio>
      <div class="inBlock audio cp" @click="playAudio">
        <img
          :src="this.from.playFlag?bg2:bg1"
        />
      </div>
      <div class="inBlock audio">试听</div>
    </div>
    <div class="tac">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-card>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import { httpRequest, httpPostRequest } from '@/assets/request/voice'
import { netFeeHttpRequest } from '@/assets/request/netFee'
export default {
  data() {
    return {
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
      RegionList: [],
      tipList: [],
      from: {
        playType: 1,
        playTimes: 1,
        startTime: '',
        endTime: '',
        playFlag: false,
        offlineEnable: false,
        voiceId: '',
        voiceName: '',
        voiceUrl: '',
        playRegion: []
      },
      bg1: require('@/assets/images/playVoice.png'),
      bg2: require('@/assets/images/stopVoice.png')
    }
  },
  components: {
    layoutHeader
  },
  created() {},
  mounted() {
    this.getTipList()
    this.listRegions()
    this.getList()
  },
  watch: {
    'from.voiceId'() {
      this.tipList.forEach(element => {
        if (element.id === this.from.voiceId) {
          this.from.voiceName = element.voiceName
          this.from.voiceUrl = element.voiceUrl
        }
      })
    }
  },
  methods: {
    async getTipList() {
      const res = await httpRequest.listByType({ voiceType: 5 })
      if (res.code === 200) {
        this.tipList = res.data
      }
    },
    async getList() {
      const res = await httpRequest.remindQuery()
      if (res.code === 200) {
        const d = res.data
        this.from.offlineEnable = d.offlineEnable === 1
        this.from.playType = d.playType
        this.from.playTimes = d.playTimes
        this.from.voiceId = d.voiceId
        this.from.voiceUrl = d.voiceUrl
        this.from.voiceName = d.voiceName
        this.from.playRegion = []
        d.playPeriod = d.playPeriod.split('-')
        if (d.playPeriod.length > 0) {
          this.from.startTime = d.playPeriod[0]
          this.from.endTime = d.playPeriod[1]
        }
        if (d.playRegion !== '') {
          d.playRegion.split(',').forEach(element => {
            this.from.playRegion.push(parseInt(element))
          })
        }
      }
    },
    async save() {
      if (this.from.playType === 2) {
        this.from.playPeriod = `${this.from.startTime}-${this.from.endTime}`
      } else {
        this.from.playPeriod = ''
      }
      this.from.playRegion = this.from.playRegion
      this.from.offlineEnable ? this.from.offlineEnable = 1 : this.from.offlineEnable = 0
      const res = await httpPostRequest.remindSave(this.from)
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
    playAudio() {
      if (this.from.playFlag) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.from.playFlag = !this.from.playFlag
    },
    async listRegions() {
      const res = await netFeeHttpRequest.listRegions()
      if (res.data.length > 0) {
        this.RegionList = res.data
      }
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
</style>


