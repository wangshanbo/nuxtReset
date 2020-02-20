<template>
  <el-dialog
    class="waterbar-wrap"
    :close-on-click-modal="false"
    title="语音编辑"
    :visible.sync="showDialog"
    :append-to-body="true"
    width="720px"
  >
    <div class="mb20">
      <label class="fromLabel">语音类型:</label>
      <el-radio-group v-model="voiceType">
        <el-radio v-for="(item,index) in voiceGroup" :label="item.value" :key="index">{{item.label}}</el-radio>
      </el-radio-group>
    </div>
    <div class="mb20">
      <label class="fromLabel">
        <span class="red">*</span> 语音名称:
      </label>
      <el-input
        class="w200"
        v-model.trim="voiceName"
        size="small"
        maxlength="10"
        placeholder="汉字、字母、数字1~10位"
      ></el-input>
    </div>
    <div class="mb20" v-if="voiceType==2">
      <label class="fromLabel">
        <span class="red">*</span> 文件路径:
      </label>
      <div class="inBlock">
        <el-upload
          class="upload-demo"
          action="/api/water-provider/water/yz-base-product/list"
          :before-upload="beforeAvatarUpload"
          multiple
          :limit="1"
          :file-list="fileList"
          accept=".mp3,.wav"
        >
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip warning">请选择大小不超过3M的mp3、wav文件</div>
        </el-upload>
      </div>
    </div>

    <div class="mb20" v-if="voiceType==1">
      <label class="fromLabel">
        <span class="red">*</span> 播放内容:
      </label>
      <div class="inBlock">
        <el-input
          class="w400"
          type="textarea"
          :rows="5"
          placeholder="汉字、字母、数字1~200位"
          v-model="voiceContent"
          maxlength="200"
        ></el-input>
        <el-button type="primary" size="medium" @click="composeAudio">合成并试听</el-button>
        <audio ref="customAudio" class="hide" :src="customAudioUrl"></audio>
      </div>
    </div>
    <div class="mt20 tac">
      <el-button size="small" @click="showDialog = false">&emsp;取消&emsp;</el-button>
      <el-button type="primary" size="small" @click="save">&emsp;保存&emsp;</el-button>
    </div>
  </el-dialog>
</template>
<script>
import layoutHeader from '~/components/layout/header'
import { httpRequest, httpPostRequest, composeUpload } from '@/assets/request/voice'
export default {
  data() {
    return {
      showDialog: false,
      voiceType: 1,
      voiceGroup: [
        {
          value: 1,
          label: '自定义语音'
        },
        {
          value: 2,
          label: '上传语音'
        }
      ],
      voiceName: '',
      voiceContent: '',
      id: '',
      uploadFile: '',
      customAudioUrl: '',
      playFlag: false,
      fileList: []
    }
  },
  components: {
    layoutHeader
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    audioPlay() {
      if (this.customAudioUrl !== '') {
        if (this.playFlag) {
          this.$refs.customAudio.pause()
        } else {
          this.$refs.customAudio.play()
        }
        this.playFlag = !this.playFlag
      }
    },
    async composeAudio() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)'
      })
      const parameter = {
        voiceContent: this.voiceContent
      }
      const res = await httpPostRequest.compose(parameter)
      loading.close()
      if (res.code === 200) {
        this.customAudioUrl = res.data
        setTimeout(() => {
          this.$refs.customAudio.play()
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 3
      if (!isLt2M) {
        this.$message.error('上传文件不能超过3MB!')
        return isLt2M
      }
      if (window.createObjectURL !== undefined) {
        this.imageUrl = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        this.imageUrl = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        this.imageUrl = window.webkitURL.createObjectURL(file)
      }
      this.uploadFile = file
      return file
    },
    async save() {
      const parameter = {
        type: this.voiceType,
        voiceName: this.voiceName
      }
      let num = 0
      if (this.voiceType === 1) {
        if (this.customAudioUrl !== '') {
          parameter.voiceUrl = this.customAudioUrl
        } else {
          this.$message({
            message: '请填写播放内容',
            type: 'error'
          })
          num++
        }
      } else {
        if (this.uploadFile !== '') {
          parameter.file = this.uploadFile
        } else {
          this.$message({
            message: '请选择上传文件',
            type: 'error'
          })
          num++
        }
      }
      if (num > 0) {
        return false
      }
      const res = await composeUpload(parameter)
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('customSave', true)
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
      this.voiceName = ''
      this.voiceContent = ''
      this.id = ''
      this.uploadFile = ''
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
.inBlock {
  vertical-align: top;
}
</style>


