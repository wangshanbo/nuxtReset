const payType = [{
  label: '微信支付',
  value: 0
},
{
  label: '原计费导入',
  value: 1
},
{
  label: '现金充值',
  value: 2
},
{
  label: '现金',
  value: 3
},
{
  label: '积分兑换',
  value: 4
},
{
  label: '卡券兑换',
  value: 5
},
{
  label: '支付宝支付',
  value: 6
},
{
  label: '卡扣支付',
  value: 7
},
{
  label: '活动赠送',
  value: 8
},
{
  label: '刷卡充值',
  value: 9
}
]
const paySource = [{
  label: '手机端',
  value: 0
},
{
  label: '客户端',
  value: 1
},
{
  label: '收银端',
  value: 2
},
{
  label: '系统',
  value: 3
},
{
  label: '卡券兑换网费',
  value: 4
},
{
  label: '上机卡扣',
  value: 5
},
{
  label: '营销奖励',
  value: 6
},
{
  label: '卡券兑换商品',
  value: 7
},
{
  label: '押金退款',
  value: 8
}
]
const tradeType = [{
  label: '原计费导入',
  value: -1
}, {
  label: '水吧现金支付',
  value: 0
},
{
  label: '水吧卡扣',
  value: 1
},
{
  label: '网费充值',
  value: 2
},
{
  label: '积分兑换',
  value: 3
},
{
  label: '卡券兑换网费',
  value: 4
},
{
  label: '上机卡扣',
  value: 5
},
{
  label: '营销奖励',
  value: 6
},
{
  label: '卡券兑换商品',
  value: 7
},
{
  label: '押金退款',
  value: 8
}
]
const payState = [{
  label: '未支付',
  value: -1
}, {
  label: '已支付',
  value: 0
},
{
  label: '已处理',
  value: 1
},
{
  label: '已取消',
  value: 2
},
{
  label: '已退款',
  value: 3
}, {
  label: '支付失败',
  value: 4
},
{
  label: '退款失败',
  value: 5
},
{
  label: '已取消待退款',
  value: 6
}
]
const logType = [{
  label: '转盘抽奖获得',
  value: 2
}, {
  label: '游戏活动奖励',
  value: 3
},
{
  label: '每日任务奖励',
  value: 4
},
{
  label: '生日营销奖励',
  value: 5
},
{
  label: '新会员奖励',
  value: 6
}, {
  label: '老带新--老会员奖励',
  value: 7
},
{
  label: '老带新--新会员奖励',
  value: 8
},
{
  label: '网费充值赠送',
  value: 21
},
{
  label: '网费充值消耗',
  value: 22
},
{
  label: '取消订单--赠送回退',
  value: 23
},
{
  label: '取消订单--消耗回退',
  value: 24
}
]

function forStr(params, val) {
  for (let index = 0; index < params.length; index++) {
    const element = params[index]
    if (val === element.value) {
      val = element.label
      break
    }
  }
  return val
}

export const memberMixin = {
  filters: {
    payType(val) {
      return forStr(payType, val)
    },
    tradeType(val) {
      return forStr(tradeType, val)
    },
    paySource(val) {
      return forStr(paySource, val)
    },
    payState(val) {
      return forStr(payState, val)
    },
    logType(val) {
      return forStr(logType, val)
    }
  }
}
