import classifyList from '~/components/waterbar/classifyList'
import {
  httpPostRequest
} from '@/assets/request/waterProviderPost'
export const classMixin = {
  data() {
    return {
      resetData: [], // 原始数据
      classify: '', // 原料分类
      typeClassify: '', // 商品分类
      newData: [], // 临时数据集合
      goodsList: [], // 外层临时数据集合
      showSupplier: false
    }
  },
  components: {
    classifyList
  },
  watch: {
    typeClassify() {
      this.changeType()
    },
    classify() {
      this.changeType()
    }
  },
  mounted() {
    this.getClassify()
  },

  methods: {
    resetList() {
      // 重置进、退、报废单数据
      // this.handleType = ''
      this.newData = []
      this.tableData = []
      this.goodsList = []
      this.resetData.forEach(element => {
        this.tableData.push(element)
        this.newData.push(element)
      })
      console.log(this.$refs.goodListRef)
      if (this.$refs.goodListRef) {
        this.$refs.goodListRef.dataList = []
      }
      // this.$refs.goodListRef.dataList = []
      this.changeType()
      this.getData()
    },
    async getData() {
      const paramter = {
        current: this.current,
        type: '',
        storageType: 1,
        productType: '',
        size: 100
      }
      const res = await httpPostRequest.listNopage(paramter)
      if (res.code === 200) {
        this.newData = []
        this.resetData = []
        res.data.forEach((element, index) => {
          element.index = index
          this.newData.push(element)
          this.resetData.push(element)
        })
        this.tableData = res.data
      }
    },
    async getClassify() {
      const res = await httpPostRequest.typeList()
      if (res.code === 200) {
        this.$store.commit('waterBar/setClassifyList', res.data)
        this.classifyLst = res.data
      }
    },
    changeType() {
      // 每次状态更新，newData初始化，按照商品、原理分组，重新匹配数据
      this.newData.length = 0
      this.tableData.forEach(element => {
        if (element.productClass === 1) {
          if (element.productType === this.typeClassify || this.typeClassify === '') {
            this.newData.push(element)
          }
        } else {
          if (element.productType === this.classify || this.classify === '') {
            this.newData.push(element)
          }
        }
      })
    },
    setClass(val) {
      this.classify = val
    },
    setTypeClass(val) {
      this.typeClassify = val
    },
    async del(row) {
      console.log(row)
      if (row.productId && row.supplierId) {
        const paramer = {
          productId: row.productId,
          supplierId: row.supplierId
        }
        const res = await httpPostRequest.supplierUpdate(paramer)
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.goodsList.forEach((element, index) => {
            if (row.productId === element.productId) {
              this.tableData.push(element)
              this.tableData.sort((a, b) => {
                return a.index - b.index
              })
              this.goodsList.splice(index, 1)
            }
          })
          this.changeType()
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      } else {
        this.goodsList.forEach((element, index) => {
          if (row === element.id || row.id === element.id) {
            this.tableData.push(element)
            this.tableData.sort((a, b) => {
              return a.index - b.index
            })
            this.goodsList.splice(index, 1)
          }
        })
        this.changeType()
      }
    },
    setTableData(val, productNum) {
      this.changeType()
      val.forEach((element, index) => {
        if (productNum === 1) {
          element.shelfNum = element.num
          // element.shelfNum = element.productNum
        }
        this.goodsList.push(element)
        this.tableData.forEach((el, i) => {
          if (el.id === element.id || element.productId === el.productId) {
            this.tableData.splice(i, 1)
          }
        })
        if (this.goodsList instanceof Array) {
          if (this.$refs.goodListRef) {
            this.$refs.goodListRef.dataList = this.goodsList
          }
        }
      })
    },
    toggleCargo(val) {
      this.changeType()
      this.toggleAddCargo = val
    },
    setClassify(bl) {
      this.changeType()
      this.classifyManageVisible = bl
    },
    toggleAdd(val) {
      this.changeType()
      this.addGoodsVisible = val
    }
  }
}
