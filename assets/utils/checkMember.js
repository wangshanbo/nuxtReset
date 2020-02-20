export const checkMember = {
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      memberList: [],
      memberLevelList: []
    }
  },
  watch: {
    '$store.state.user.MemberLevelList'() {
      this.setMember()
    }
  },
  mounted() {
    this.setMember()
  },
  methods: {
    setMember() {
      if (this.$store.state.user.MemberLevelList.length > 0) {
        this.memberList = []
        this.$store.state.user.MemberLevelList.forEach(element => {
          if (element.memberTypeId > 1) {
            this.memberList.push(element)
          }
        })
      }
    },
    handleCheckAllChange(v) {
      if (v) {
        this.memberList.forEach(element => {
          this.memberLevelList.push(element.memberTypeId)
        })
      } else {
        this.memberLevelList = []
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.memberList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.memberList.length
    }
  }
}
