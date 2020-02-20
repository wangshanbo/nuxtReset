// 服务区分
const netBarServe = '/netbar-provider/admin'
const authServe = '/auth-provider/admin'
const gameServe = '/game-provider/admin'
const marketingServe = '/marketing-provider/admin'
const waterProvider = '/water-provider/water'
export const WEB_API = {
  specialMember: {
    countByLevel: `/netbar-provider/admin/member/countByLevel`,
    findPage: `/netbar-provider/bar/memberAccountLog/findPage`, // 分页查询操作日志
    addOrSubtract: `/netbar-provider/admin/member/addOrSubtract` // 分页查询操作日志
  },
  login: {
    login: `${authServe}/login`, // 后台登陆
    logout: `${authServe}/logout` // 后台退出
  },
  user: {
    listEmployee: `${authServe}/user/listEmployee`, // 查询连锁操作日志列表
    listChainLog: `${authServe}/operateLog/listChainLog`, // 查询连锁操作日志列表
    listOperateSource: `${authServe}/operateLog/listOperateSource`, // 操作来源列表
    listOperateType: `${authServe}/operateLog/listOperateType`, // 操作类型列表
    listShopLog: `${authServe}/operateLog/listShopLog`, // 查询门店操作日志列表
    getRouter: `${authServe}/index/menus`, // 获取路由权限
    updateCachUser: `${authServe}/index/updateCachUser` // 从门店列表进入门店前需要调用
  },
  voice: { // 语音模块
    callQuery: `${netBarServe}/callManagement/query`, // 查询呼叫网管
    timePage: `${netBarServe}/timedSpeech/page`, // 定时语音列表
    listByType: `${netBarServe}/shopVoice/listByType`, // 根据类型查询语音列表
    listTimedVoice: `${netBarServe}/shopVoice/listTimedVoice`, // 获取定时语音列表
    settingQuery: `/netbar-provider/bar/yz-voice-setting/query`, // 查询语音设置
    remindQuery: `${netBarServe}/offlineRemind/query`, // 查询下机提醒

    compose: `${netBarServe}/shopVoice/compose`, // 合成语音
    composeUpload: `${netBarServe}/shopVoice/upload`, // 添加自定义语音
    callSave: `${netBarServe}/callManagement/save`, // 新增/保存呼叫网管
    timeDel: `${netBarServe}/timedSpeech/del`, // 删除定时语音
    timeSave: `${netBarServe}/timedSpeech/save`, // 新增/保存定时语音
    uploadVoice: `${netBarServe}/voice/uploadVoice`, // 上传语音
    remindSave: `${netBarServe}/offlineRemind/save`, // 保存下机提醒
    settingSave: `/netbar-provider/bar/yz-voice-setting/save` // 新增/修改语音设置
  },
  storeManagement: {
    paykeys: `/online-provider/paykeys/query`, // 获取密钥
    wechatList: `${netBarServe}/bar/wechat/list`, // 获取后台首页微信公众号首页列表
    setWxShopMaxCount: `${netBarServe}/bar/wechat/setWxShopMaxCount`, // 设置最大门店数量
    putWxSetting: `${netBarServe}/bar/wechat/putWxSetting`, // 设置微信公众号参数
    shopList: `${netBarServe}/bar/shop/list`, // 门店列表
    shopEdit: `${netBarServe}/bar/shop/edit`, // 网吧配置修改门店
    editShopDetail: `${netBarServe}/bar/shop/editShopDetail`, // 网吧配置基本资料/修改门店
    setShopSubAccount: `${netBarServe}/bar/shop/setShopSubAccount`, // 设置分账(只有连锁店才能分账)
    shopAdd: `${netBarServe}/bar/shop/add`, // 添加门店
    setShopChain: `${netBarServe}/bar/shop/setShopChain`, // 连锁/单店
    shopDelete: `${netBarServe}/bar/shop/delete`, // 删除门店
    // dutyList: `${netBarServe}/shop/duty/list`, // 交班明细
    // dutyList: `/netbar-provider/bar/dutyBak/findPage`, // 交班明细
    dutyList: `${netBarServe}/bar/dutyBak/findPage`, // 交班明细

    goodsSalesDetail: `${netBarServe}/shop/duty/goodsSalesDetail`, // 交班水吧商品销售明细
    dutyListExcel: `${netBarServe}/shop/duty/dutyListExcel`, // 后台导出交班明细excel
    dutyDetailExcel: `${netBarServe}/shop/duty/dutyDetailExcel`, // 后台导出交班详情excel
    shopRoamBill: `${netBarServe}/bar/shop/shopRoamBill`, // 本月账单，计算漫游金额
    getShopListByWxId: `${netBarServe}/bar/shop/getShopListByWxId`, // 分账列表，查询连锁门店列表
    uploadWxImg: `${netBarServe}/bar/wechat/uploadWxImg`, // 上传微信图片
    createMemberCard: `${netBarServe}/bar/wechat/createMemberCard` // 创建会员卡
  },
  waterProvider: {
    salePropDel: `${waterProvider}/saleProp/del`, // 口味分页
    salePropSave: `${waterProvider}/saleProp/save`, // 口味分页
    salePropPage: `${waterProvider}/saleProp/page`, // 口味分页
    salePropList: `${waterProvider}/saleProp/list`, // 口味列表
    importExcel: `${waterProvider}/Excel/importExcel`, // 导入商品
    importMaterial: `${waterProvider}/Excel/importMaterial`, // 导入原料
    materialList: `${waterProvider}/yz-material/list`, // 原料列表
    productTypeSave: `${waterProvider}/yz-product-type/save`, // 添加商品分类
    productMaterial: `${waterProvider}/yz-product-material/list`, // 查询材料合成商品list
    productList: `${waterProvider}/yz-product/list`, // 查询商品list
    queryById: `${waterProvider}/yz-product/queryById`, // 查询单个商品
    materialTypeList: `${waterProvider}/yz-material-type/list`, // 原料分类list
    materialTypeSave: `${waterProvider}/yz-material-type/save`, // 添加/修改原料分类
    materialTypeDel: `${waterProvider}/yz-material-type/del`, // 删除原料分类
    baseTypelist: `${waterProvider}/yz-base-product/list`, // 基础商品查询

    materialProductSave: `${waterProvider}/yz-product-material/save`, // 删除原料分类
    materialProductUpdate: `${waterProvider}/yz-product-material/update`, // 删除原料分类
    materialProductDel: `${waterProvider}/yz-product-material/del`, // 删除自制商品

    listNopage: `${waterProvider}/yz-storage/listNopage`, // 库存无分页

    syncTrade: `/netbar-provider/admin/trade/syncTrade`,
    syncMemberAccount: `/netbar-provider/admin/netbarMember/syncMemberAccount`,

    recordSave: `${waterProvider}/yz-change-record/save`,
    recordList: `${waterProvider}/yz-change-record/list`,
    queryCodes: `${waterProvider}/yz-change-record/queryCodes`,

    typeList: `${waterProvider}/yz-type/list`, // 商品分类List
    typeSave: `${waterProvider}/yz-type/save`, // 新增/修改商品分类
    typeDel: `${waterProvider}/yz-type/del`, // 删除商品分类
    materialAdd: `${waterProvider}/yz-material/save`, // 添加原料
    materialDel: `${waterProvider}/yz-material/del`, // 删除列表
    productSave: `${waterProvider}/yz-product/save`, // 添加商品
    productDel: `${waterProvider}/yz-product/del`, // 删除商品
    storageList: `${waterProvider}/yz-storage/list`, // 查看库存
    updateState: `${waterProvider}/yz-storage/updateState`, // 商品上下架
    stockList: `${waterProvider}/yz-change-record/queryLists`, // 查看单据List
    stockDetailList: `${waterProvider}/yz-change-record/detail`, // 查看单据详情
    stockSave: `${waterProvider}/yz-stock-order/save`, // 进货 /出货
    saveStorage: `${waterProvider}/yz-stock-order/saveStorage`, // 上架 下架

    // 1.1.3新增接口
    // post
    inventorySave: `${waterProvider}/inventory/save`, // 进销存保存/提交
    confirmReceive: `${waterProvider}/inventory/confirmReceive`, // 进销存-进货-确认收货
    waterCheckSave: `${waterProvider}/waterCheck/save`, // 进销存盘点
    getStorageData: `${waterProvider}/yz-storage/getStorageData`, // 查询商品总库存 -1.1.3
    settingUpdate: `${waterProvider}/yz-product-setting/update`, // 分仓设置修改
    supplierSave: `${waterProvider}/yz-supplier/save`, // 新增或者修改供应商--贺小洋
    supplierUpdate: `${waterProvider}/yz-supplier-product/update`, // 新增或者修改供应商--贺小洋

    // get
    queryGroupData: `${waterProvider}/yz-storage/queryGroupData`, // 商品按照类型分类成本图 -1.1.3
    queryProMaterProduct: `${waterProvider}/yz-storage/queryProMaterProduct`, // 查询自制商品的库存 -1.1.3
    queryPurchaseData: `${waterProvider}/yz-storage/queryPurchaseData`, // 商品近12月的进货出货图 -1.1.3
    settingList: `${waterProvider}/yz-product-setting/list`, // 分仓设置list
    supplierProductList: `${waterProvider}/yz-supplier-product/list`, // 商品按照类型分类计算成本 -1.1.3 -贺小洋
    supplierDel: `${waterProvider}/yz-supplier/del`, // 删除供应商--贺小洋
    supplierGetOne: `${waterProvider}/yz-supplier/getOne`, // 查询供应商以及下面的商品信息--贺小洋
    supplierList: `${waterProvider}/yz-supplier/list`, // 商查询供应商List --贺小洋

    inventoryPage: `${waterProvider}/inventory/page`, // 进销存流水记录
    waterCheckList: `${waterProvider}/waterCheck/list`, // 查询盘点明细
    inventoryDel: `${waterProvider}/inventory/del`, // 查询盘点明细
    pageInventoryDay: `${waterProvider}/statisticInventoryDay/pageInventoryDay`, // 进销存盘点
    listInventoryDetail: `${waterProvider}/inventoryDetail/listInventoryDetail`, // 查询进销存明细
    pageInventoryMonth: `${waterProvider}/statisticInventoryMonth/pageInventoryMonth`, // 进货/退货/报废统计
    RechargeRuleUpdateState: `${netBarServe}/netbarRechargeRule/updateState` // 网费充值规则状态修改
  },
  regionPost: {
    delRegion: `${netBarServe}/region/delRegion`, // 删除区域
    alterRegion: `${netBarServe}/region/alterRegion`, // 修改区域
    addRegion: `${netBarServe}/region/addRegion` // 增加区域
  },
  region: {
    listRegions: `${netBarServe}/region/listRegions`, // 根据id查询区域列表
    getRegionSetting: `${netBarServe}/regionSetting/getRegionSetting`, // 查询区域对不同等级会员的费率
    getRegionExtra: `${netBarServe}/regionSetting/getRegionExtra`, // 查询区域附加费
    listMemberLevel: `${netBarServe}/regionSetting/listMemberLevel`, // 查询区域关联的会员等级
    memberList: `${netBarServe}/memberLevel/list`, // 查询门店所有会员等级列表

    findMachine: `${netBarServe}/machine/findMachine`, // 根据机器名称查询机器
    pageRegionPeriods: `${netBarServe}/regionPeriod/pageRegionPeriods`, // 查询区域包时长信息
    listRegionDurations: `${netBarServe}/regionDuration/listRegionDurations`, // 查询区域包时段信息
    findAssociateMachine: `${netBarServe}/machine/findAssociateMachine`, // 查询区域包时段信息

    findCount: `${netBarServe}/netbarOnline/findCount`, // 查询上机流水总数信息
    findPage: `${netBarServe}/netbarOnline/findPage` // 查询上机流水
  },
  barConfig: {
    permissionList: `${netBarServe}/rolePremission/adminPermissions`, // 获取后台权限配置列表
    cashierPermissions: `${netBarServe}/rolePremission/cashierPermissions`, // 收银端权限配置列表
    modelList: `${netBarServe}/shop/config/modelList`, // 客户端模块菜单配置列表
    saveOrUpdate: `${netBarServe}/shop/config/saveOrUpdate`, // 保存客户端模块菜单配置
    // empRoles: `${netBarServe}/role/empRoles` // 获取角色列表
    empRoles: `${netBarServe}/shopRole/list` // 获取角色列表
  },
  barConfigPost: {
    saveAdminPermission: `${netBarServe}/rolePremission/saveAdminPermission`, // 保存后台权限
    saveOrUpdate: `${netBarServe}/shop/config/saveOrUpdate`, // 保存后台权限
    saveCashierPermission: `${netBarServe}/rolePremission/saveCashierPermission` // 保存收银端权限
  },
  barBase: {
    barseat: `/barBase/barseat` // 网咖座位列表
  },
  barGame: {
    // activeTable: `gameServe/gameActivity/activityList`// 游戏活动页面列表数据
    activeTable: `${gameServe}/gameActivity/activityList`, // 游戏活动页面列表数据
    lolTaskList: `${gameServe}/gameActivity/lolTaskList`, // lol任务指标列表
    pubgGameModeList: `${gameServe}/gameActivity/pubgGameModeList`, // pubg游戏模式列表
    awardTypeList: `${gameServe}/gameActivity/awardTypeList`, // 活动奖励列表
    lolRankList: `${gameServe}/gameActivity/lolRankList`, // lol段位列表
    lolModeList: `${gameServe}/gameActivity/lolModeList`, // lol游戏模式列表
    gameByType: `${netBarServe}/shopSetting/listByType`, // 语音列表
    activityAwardList: `${gameServe}/gameActivity/activityAwardList`, // 活动分发奖励列表
    gameAwardList: `${gameServe}/gameActivity/gameAwardList` // 活动分发奖励列表
  },
  barGamePost: {
    savePubgActivity: `${gameServe}/gameActivity/savePubgActivity`, // 保存pubg活动
    saveLolActivity: `${gameServe}/gameActivity/saveLolActivity`, // 保存lol活动
    updateActivityState: `${gameServe}/gameActivity/updateActivityState`, // 更新活动状态
    delActivity: `${gameServe}/gameActivity/delActivity` // 删除活动
  },
  netbarinfo: {

    listRegionWithMachineAndTheme: `${netBarServe}/shopThemeMachine/listRegionWithMachineAndTheme`, // 查询区域机器列表及应用的主题
    shopThemeList: `${netBarServe}/shopTheme/list`, // 主题列表
    shopThemeWallpaperList: `${netBarServe}/shopThemeWallpaper/list`, // 查询壁纸列表
    wallpaperTypeList: `${netBarServe}/wallpaperType/list`, // 壁纸类型列表
    systemOff: `${netBarServe}/member/systemOff`, // 系统集体下机用户
    getOrderStatueForJd: `${netBarServe}/trade/getOrderStatueForJd`, // 充值修正
    getOnlineInfo: `${netBarServe}/netbarOnline/getOnlineInfo`, // 上机明细详情查询
    createHistoryDate: `${netBarServe}/trade/createHistoryDate`, // 创建历史订单统计数据
    guideListAll: `${netBarServe}/settingGuide/listAll`, // 根据几种类型查找网吧设置
    modelList: `${netBarServe}/shop/config/modelList`, // 客户端模块菜单配置列表
    // netbar服务下接口过多，后期分类修改
    dutyStatistics: `${netBarServe}/trade/dutyStatistics`, // 查询交班信息
    netGiftList: `${netBarServe}/trade/netGiftList`, // 查询网费赠送信息
    commodityGiftList: `${netBarServe}/trade/commodityGiftList`, // 查询商品赠送信息
    getDutyInfo: `${netBarServe}/trade/getDutyInfo`, // 网费交班信息
    // <<< 1.1.3新增页面
    findPage: `${netBarServe}/bar/dutyBak/findPage`, // 分页查询交班详细
    findStatistic: `${netBarServe}/bar/dutyBak/findStatistic`, // 查询交班统计报表
    exportTradeStreamInfoList: `${netBarServe}/trade/exportTradeStreamInfoList`, // 导出订单统计明细
    getTradeStream: `${netBarServe}/trade/getTradeStream`, // 订单统计折线图
    getTradeStreamInfoList: `${netBarServe}/trade/getTradeStreamInfoList`, // 订单统计明细
    getTradeStreamInfo: `${netBarServe}/trade/getTradeStreamInfo`, // 根据月或日获取订单统计结果

    chainMemberInfo: `${netBarServe}/memberStatisticInfo/chainMemberInfo`, // 获取连锁会员信息，及卡劵列表
    Chart24Hours: `${netBarServe}/memberStatisticInfo/Chart24Hours`, // 分时在线图表
    countByLevelChart: `${netBarServe}/memberStatisticInfo/countByLevelChart`, // 会员等级计数图
    countClassify: `${netBarServe}/memberStatisticInfo/countClassify`, // 会员分类计数
    pageByShop: `${netBarServe}/memberStatisticInfo/pageByShop`, // 会员信息查询--分页
    shopMemberStatistics: `${netBarServe}/memberStatisticInfo/shopMemberStatistics`, // 会员信息查询--分页

    // 1.1.3新增页面>>>
    selectbasedata: `${netBarServe}/member/todaySeat`, // 获取交班数据
    profitcurvestatistic: `${netBarServe}/statistic/profitcurvestatistic`, // 盈利曲线图表
    waterbarsales: `${netBarServe}/statistic/waterbarsales`, // 订单流水图表
    salesoverview: `${netBarServe}/statistic/salesoverview`, // 经营概览图表
    netbarsales: `${netBarServe}/statistic/netbarsales`, // 网费收支图表
    seatstatistic: `${netBarServe}/statistic/seatstatistic`, // 任务大厅图表
    memberstatistic: `${netBarServe}/statistic/memberstatistic`, // 经营获益图表
    pointcardstatistic: `${netBarServe}/statistic/cardAndPointstatistic`, // 卡劵积分增费统计
    IncomeTrend: `${netBarServe}/statistic/incomeTrend`, // 收入走势
    consumeTotalRank: `${netBarServe}/statisticMemberMonth/consumeRank`, // 消费排行表格数据
    consumeAnalysisData: `${netBarServe}/statistic/consumeAnalysis`, // 消费分析表格数据
    goodsSaleList: `${netBarServe}/statistic/goodsSaleList`, // 消费分析表格数据
    seatTrend: `${netBarServe}/statistic/seatTrend`, // 上座率分析
    membertrend: `${netBarServe}/statistic/membertrend`, // 会员分析

    shiftlogData: `${netBarServe}/statistic/shiftlogData`, // 交班明细数据
    changeShiftsDetails: `${netBarServe}/statistic/changeShiftsDetails`, // 交接班详情
    changeShiftsGoodsDetails: `${netBarServe}/statistic/changeShiftsGoodsDetails`, // 销售详情
    orderlistDataList: `${netBarServe}/trade/list`, // 网吧订单流水列表
    orderlistDataNetList: `${netBarServe}/trade/netList`, // 网费充值流水
    orderlistSelect: `${netBarServe}/member/getSelectList`, // 网咖订单流水查询面板下拉列表数据
    getTradeSelectList: `${netBarServe}/trade/getSelectList`, // 网咖订单流水查询面板下拉列表数据

    downloadQr: `${netBarServe}/bar/file/downloadQr`, // 删除区域包时长信息

    financeData: `${netBarServe}/statistic/financeData`, // 财务报表table数据
    listByType: `${netBarServe}/shopSetting/listByType`, // 根据类型查找网吧设置
    listBySeveralType: `${netBarServe}/shopSetting/listBySeveralType`, // 根据类型查找网吧设置
    findByName: `${netBarServe}/shopSetting/findByName`, // 根据name查找网吧设置
    getOperatelog: `${netBarServe}/userOperatelog/findPage`, // 操作日志查询接口

    employeeList: `${netBarServe}/employee/list`, // 上传员工头像
    employeeGetEmp: `${netBarServe}/employee/getEmp`, // 员工详情
    userInfo: `${netBarServe}/employee/info`, // 获取用户详情
    // employeeUploadImg: `${netBarServe}/employee/list` // 上传员工头像
    getShop: `${netBarServe}/bar/shop/getShop`, // 获取门店信息

    comfirmTrade: `${netBarServe}/trade/comfirmTrade`, // 确认订单接口
    cancelTrade: `${netBarServe}/trade/cancelTrade`, // 取消订单接口
    getInfoById: `${netBarServe}/trade/getInfoById`, // 获取订单详情接口
    getUserList: `${netBarServe}/trade/getUserList`, // 获取推荐人信息

    ScreenBannerList: `${netBarServe}/guestScreenBanner/list`, // 客显屏列表

    // empRoles: `${netBarServe}/role/empRoles`, // 获取角色列表
    empRoles: `${netBarServe}/shopRole/list`, // 获取角色列表

    RechargeRuleList: `${netBarServe}/netbarRechargeRule/list` // 网费充值规则列表
  },
  netbarinfoPost: {

    shopThemeMachineSave: `${netBarServe}/shopThemeMachine/save`, // 保存主题机器配置
    shopThemeWallpaperSave: `${netBarServe}/shopThemeWallpaper/save`, // 保存壁纸列表

    updateSettingByType: `${netBarServe}/settingGuide/updateSettingByType`, // 批量更新指引
    updateGuideSetting: `${netBarServe}/settingGuide/updateSetting`, // 更新指引
    roleDel: `${netBarServe}/shopRole/del`, // 更新保存/新增门店角色设置
    roleSave: `${netBarServe}/shopRole/save`, // 更新保存/新增门店角色设置
    updateSetting: `${netBarServe}/shopSetting/updateSetting`, // 更新设置
    setPrice: `${netBarServe}/regionSetting/setPrice`, // 设置区域对不同等级会员的单价
    setMemberLevel: `${netBarServe}/regionSetting/setMemberLevel`, // 设置区域允许的会员等级
    addExtraPrice: `${netBarServe}/regionSetting/addExtraPrice`, // 添加区域附加费

    addMachine: `${netBarServe}/machine/addMachine`, // 新增机器
    delMachine: `${netBarServe}/machine/delMachine`, // 删除机器
    associateMachineAndRegion: `${netBarServe}/machine/associateMachineAndRegion`, // 新增机器
    saveRegionPeriod: `${netBarServe}/regionPeriod/saveRegionPeriod`, // 新增区域包时长信息
    alterRegionPeriod: `${netBarServe}/regionPeriod/alterRegionPeriod`, // 编辑区域包时长信息
    delRegionPeriod: `${netBarServe}/regionPeriod/delRegionPeriod`, // 删除区域包时长信息

    saveRegionDuration: `${netBarServe}/regionDuration/saveRegionDuration`, // 新增区域包时段信息
    delRegionDuration: `${netBarServe}/regionDuration/delRegionDuration`, // 删除区域包时段信息
    alterRegionDuration: `${netBarServe}/regionDuration/alterRegionDuration`, // 新增区域包时段信息

    employeeUploadImg: `${netBarServe}/employee/uploadImg`, // 上传员工头像
    employeeAdd: `${netBarServe}/employee/add`, // 添加员工
    employeeRemoveEmp: `${netBarServe}/employee/removeEmp`, // 删除员工
    employeeEdit: `${netBarServe}/employee/edit`, // 编辑员工
    changePwd: `${netBarServe}/employee/changePwd`, // 编辑员工

    saveScreenBanner: `${netBarServe}/guestScreenBanner/save`, // 新增或修改客显屏
    updateShowFlag: `${netBarServe}/guestScreenBanner/updateShowFlag`, // 更新客显屏显示状态
    delScreenBanner: `${netBarServe}/guestScreenBanner/del`, // 删除客显屏

    RechargeRuleSave: `${netBarServe}/netbarRechargeRule/save`, // 添加或修改网费充值规则
    RechargeRuleDel: `${netBarServe}/netbarRechargeRule/del`, // 删除网费充值规则
    RechargeRuleUpdateState: `${netBarServe}/netbarRechargeRule/updateState` // 网费充值规则状态修改
  },
  marketingGet: {
    couponList: `${marketingServe}/coupon/list`, // 获取网吧卡劵设置列表
    getShopList: `${marketingServe}/couponMember/listByMember` // 查询会员的全部卡劵
  },
  marketingPost: {
    cancelByCondition: `${marketingServe}/couponMember/cancelByCondition`, // 批量撤销已发放的卡劵，按检索条件
    cancelByIds: `${marketingServe}/couponMember/cancelByIds` // 批量撤销已发放的卡劵，按id
  },
  marketing: {
    // 获取门店列表
    pointLogListType: `${marketingServe}/pointLog/listType`,
    // 获取门店列表
    getShopList: `${marketingServe}/marketing/getShopList`,
    // 获取积分情况
    getIntegralSituation: `${marketingServe}/pointLog/pointStatistic`,
    // 获取积分赠送明细列表
    getGiveDetialList: `${marketingServe}/pointLog/pageByShop`,
    // 获取卡劵统计信息
    getCouponStatistic: `${marketingServe}/couponMember/couponStatistic`,
    // 获取卡券设置列表
    getCouponSetList: `${marketingServe}/coupon/page`,
    // 修改网吧的卡劵设置
    saveCouponSetList: `${marketingServe}/coupon/save`,
    // 删除网吧的卡劵设置
    delCouponSetList: `${marketingServe}/coupon/del`,
    // 网吧后台批量发送卡劵
    sendCouponBatch: `${marketingServe}/couponMember/sendCouponBatch`,
    // 获取卡券活动列表
    getCouponActivityList: `${marketingServe}/couponActivity/page`,
    // 增加/修改网吧卡劵活动
    saveCouponActivityList: `${marketingServe}/couponActivity/save`,
    // 删除网吧卡劵活动
    delCouponActivityList: `${marketingServe}/couponActivity/del`,
    // 获取连锁网吧列表
    chainShopList: `${marketingServe}/marketing/chainShopList`,
    // 获取卡券流水列表
    getCouponWaterList: `${marketingServe}/couponMember/pageByShop`,
    // 获取积分基本设置
    getIntegralSet: `${marketingServe}/baseAward/basicSetting/info`,
    // 保存积分基本设置
    saveIntegralSet: `${marketingServe}/baseAward/basicSetting/save`,
    // 获取钱包设置
    getWalletSet: `${marketingServe}/marketing/getWalletSet`,
    // 保存钱包设置
    saveWalletSet: `${marketingServe}/marketing/saveWalletSet`,
    // 获取每日任务设置
    getDailyActivitiesSet: `${marketingServe}/taskBasic/list`,
    // 获取网吧每日任务设置/总体状态
    settingState: `${marketingServe}/taskBasic/settingState`,
    // 关闭/开启网吧每日基本任务配置/总体
    switchSettingState: `${marketingServe}/taskBasic/switchSettingState`,
    // 关闭/开启网吧每日基本任务配置/单个
    switchState: `${marketingServe}/taskBasic/switchState`,
    // 修改网吧每日基本任务
    saveDailyActivitiesSet: `${marketingServe}/taskBasic/save`,
    // 获取网吧每日累计任务列表
    getTaskSumList: `${marketingServe}/taskSum/list`,
    // 修改网吧每日累计任务
    saveTaskSumList: `${marketingServe}/taskSum/save`,
    // 获取每日任务奖励发放记录
    getTaskAwardLog: `${marketingServe}/taskAwardLog/list`,
    // 获取网吧转盘信息
    getTurntable: `${marketingServe}/turntable/info`,
    // 获取网吧转盘奖励设置
    getTurntableList: `${marketingServe}/turntableAward/list`,
    // 修改网吧转盘信息
    saveTurnrableInfo: `${marketingServe}/turntable/save`,
    // 修改网吧转盘奖励设置
    saveTurnrableAward: `${marketingServe}/turntableAward/save`,
    // 获取网吧转盘奖励发放记录
    getTurntableLog: `${marketingServe}/turntableLog/list`,
    // 获取网吧促销活动列表
    getPromotionList: `${marketingServe}/promotion/page`,
    // 新增网吧促销活动
    addPromotion: `${marketingServe}/promotion/add`,
    // 修改网吧促销活动
    editPromotion: `${marketingServe}/promotion/edit`,
    // 开启/关闭网吧促销活动
    updatePromotionState: `${marketingServe}/promotion/switchState`,
    // 删除网吧促销活动
    delPromotion: `${marketingServe}/promotion/del`,
    // 获取生日营销详细信息
    getBirthdayInfo: `${marketingServe}/baseAward/birthday/info`,
    // 保存生日营销详细信息
    saveBirthdayInfo: `${marketingServe}/baseAward/birthday/save`,
    // 开启/关闭生日营销活动
    birthdaySwitchState: `${marketingServe}/baseAward/birthday/switchState`,
    // 获取新手礼包详细信息
    getNewMemberInfo: `${marketingServe}/baseAward/newMember/info`,
    // 保存新手礼包详细信息
    saveNewMemberInfo: `${marketingServe}/baseAward/newMember/save`,
    // 开启/关闭新手礼包
    newMemberSwitchState: `${marketingServe}/baseAward/newMember/switchState`,
    // 获取老带新活动-新会员奖励详细信息
    getOldBringNewNewInfo: `${marketingServe}/baseAward/shareNew/info`,
    // 保存老带新活动-新会员奖励详细信息
    saveOldBringNewNewInfo: `${marketingServe}/baseAward/shareNew/save`,
    // 开启/关闭老带新活动-新会员奖励
    oldBringNewNewSwitchState: `${marketingServe}/baseAward/shareNew/switchState`,
    // 获取老带新活动-老会员奖励详细信息
    getOldBringNewOldInfo: `${marketingServe}/baseAward/shareOld/info`,
    // 保存老带新活动-老会员奖励详细信息
    saveOldBringNewOldInfo: `${marketingServe}/baseAward/shareOld/save`,
    // 开启/关闭老带新活动-老会员奖励
    oldBringNewOldSwitchState: `${marketingServe}/baseAward/shareOld/switchState`,
    // 获取老带新活动中新会员首充最低金额
    getMinFirstChargeInfo: `${marketingServe}/baseAward/minFirstCharge/info`,
    // 修改老带新活动-老会员奖励详细信息
    saveMinFirstChargeInfo: `${marketingServe}/baseAward/minFirstCharge/save`,
    // 获取商品分类List
    getWaterType: `${waterProvider}/yz-type/list`,
    // 获取商品List
    getWaterList: `${waterProvider}/yz-product/list`
  },
  member: {
    // 会员等级列表
    getMemberLevelList: `${netBarServe}/memberLevel/list`,
    // 会员等级编辑接口
    editMemberLevel: `${netBarServe}/memberLevel/edit`,
    // 会员等级状态更改接口
    updataStates: `${netBarServe}/memberLevel/update`,
    // 网吧会员留言列表
    getMessageList: `${netBarServe}/comment/list`,
    // 会员留言删除接口
    delMessage: `${netBarServe}/comment/delete`,
    // 会员留言回复接口
    replyMessage: `${netBarServe}/comment/reply`,
    // 获取会员查询条件枚举
    getSelectList: `${netBarServe}/member/getSelectList`,
    // 获取会员等级枚举
    getMapMemberLevel: `${netBarServe}/memberLevel/mapMemberLevel`,
    // 会员列表接口
    getMemberList: `${netBarServe}/member/list`,
    // 获取会员详情
    getMemberInfo: `${netBarServe}/member/getInfo`,
    // 查询门店内所有开启的会员等级列表
    memberListLevel: `${netBarServe}/memberLevel/listMemberLevel`
  }
}
