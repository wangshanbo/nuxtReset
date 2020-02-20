
const chainProvider = '/chain-provider/chain'

export const CHAIN_API = {
  admin: {
    getChainMemberOnlineList: `${chainProvider}/member/getChainMemberOnlineList`, // 上机明细
    login: `${chainProvider}/chainLogin`, // 后台登陆
    updateChainUserCache: `${chainProvider}/updateChainUserCache`, // 更新用户登录信息(管理员进入连锁门店前调用)
    logout: `${chainProvider}/chainLogout`, // 后台退出
    memberDataList: `${chainProvider}/member/list`, // 会员数据列表
    getChainMemberInfo: `${chainProvider}/member/getChainMemberInfo`, // 会员数据列表详情
    getChainMemberTradeList: `${chainProvider}/member/getChainMemberTradeList`, // 会员数据订单列表
    getShopsByMember: `${chainProvider}/member/getShopsByMember`, // 会员数据会员门店列表

    memberDel: `${chainProvider}/chainMemberLevel/del`, // 删除会员
    memberList: `${chainProvider}/chainMemberLevel/list`, // 会员列表
    memberSave: `${chainProvider}/chainMemberLevel/save`, // 新增、修改会员
    updateState: `${chainProvider}/chainMemberLevel/updateState`, // 修改启用状态
    getList: `${chainProvider}/chainUser/list`, // 员工列表
    save: `${chainProvider}/chainUser/save`, // 新增/修改员工
    listEmployee: `${chainProvider}/chainUser/listEmployee`, // 新增/修改员工
    statistic: `${chainProvider}/chainUser/statistic`, // 员工总数/在职数/离职数
    delStaff: `${chainProvider}/chainUser/del` // 员工删除
  },
  roamConsume: {
    totalAndRate: `${chainProvider}/roamSettle/totalAndRate`, // 查询漫游总额和漫游占比
    getSettleList: `${chainProvider}/roamSettle/page`, // 查询漫游结算记录
    getList: `${chainProvider}/roamConsume/page`, // 查询漫游记录
    pageConsume: `${chainProvider}/roamConsume/page`, // 查询漫游记录
    pageConsumeSource: `${chainProvider}/roamConsume/pageConsumeSource` // 查询漫游记录
  },
  yzChainRole: {
    getUserList: `${chainProvider}/chainUserRole/list`, // 用户角色list
    saveOrUpdate: `${chainProvider}/chainUserRole/saveOrUpdate`, // 修改用户角色
    del: `${chainProvider}/chainRole/del`, // 删除角色
    getOne: `${chainProvider}/chainRole/getOne`, // 获取指定角色
    save: `${chainProvider}/chainRole/save`, // 新增修改规则
    update: `${chainProvider}/chainRole/update`, // 新增角色
    getList: `${chainProvider}/chainRole/list`, // 修改角色
    getAuthList: `${chainProvider}/chainAuth/list`, // 查询角色权限列表
    getChainMenu: `${chainProvider}/chainRoleAuth/chainMenu`, // 查询所有权限列表
    pageConsume: `${chainProvider}/chainRoleAuth/getOne`, // 获取指定角色的权限
    RoleAuthList: `${chainProvider}/chainRoleAuth/list`, // 查询所有权限list
    updateAuth: `${chainProvider}/chainRoleAuth/update` // 修改角色权限
  },
  roamRule: {
    addRule: `${chainProvider}/roamRule/addRule`, // 新增规则
    alterRule: `${chainProvider}/roamRule/alterRule`, // 修改规则
    listRules: `${chainProvider}/roamRule/listRules`, // 查询连锁下的所有分账规则
    listRulesOptions: `${chainProvider}/roamRule/listRulesOptions`, // 查询连锁下的所有可选分账规则
    listShopOptions: `${chainProvider}/roamRule/listShopOptions`, // 查询连锁下的所有可选门店列表
    findUnGroupShopList: `${chainProvider}/shop/findUnGroupShopList`, // 查询所有未在分区中的门店列表
    RoleAaddZonethList: `${chainProvider}/zone/addZone`, // 增加分区
    listZone: `${chainProvider}/zone/listZone`, // 修改分区
    deleteZone: `${chainProvider}/zone/deleteZone`, // 删除分区
    deleteRule: `${chainProvider}/roamRule/deleteRule`, // 删除连锁下的分组规则
    alterZone: `${chainProvider}/zone/alterZone`, // 查询连锁下的所有分区
    pageLogs: `${chainProvider}/ruleOperateLog/pageLogs` // 查询操作分组规则的日志
  }
}
