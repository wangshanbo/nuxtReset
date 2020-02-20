<template>
  <div>
    <div>
      <el-radio-group v-model="voiceType">
        <el-radio-button
          v-for="(item,index) in voiceGroup"
          :label="item.value"
          :key="index"
        >{{item.label}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="mt10">
      <voiceSetting v-if="voiceType==4"/>
      <callManage v-if="voiceType==1" />
      <remind v-if="voiceType==2" />
      <timeOut v-if="voiceType==3" />
    </div>
  </div>
</template>
<script>
import callManage from './components/callManage'
import remind from './components/remind'
import timeOut from './components/timeOut'
import voiceSetting from './components/voiceSetting'

export default {
  data() {
    return {
      voiceType: 4,
      voiceGroup: [
        {
          label: '语音设置',
          value: 4
        },
        {
          label: '呼叫网管',
          value: 1
        },
        {
          label: '下机提醒',
          value: 2
        },
        {
          label: '定时语音',
          value: 3
        }
      ]
    }
  },
  components: {
    callManage,
    remind,
    timeOut,
    voiceSetting
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
</style>





