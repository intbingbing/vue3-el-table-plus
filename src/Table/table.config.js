// 集成需求表预填参数列表页面
export const PrefilledParameter = {
  columns: [
    {
      title: "项目名称",
      dataIndex: "projectName",
    },
    {
      title: "系统名称",
      dataIndex: "systemName",
    },
    {
      title: "应用负责人",
      dataIndex: "applyPerson",
    },
    {
      title: "系统负责人",
      dataIndex: "systemPerson",
    },
    {
      title: "网卡数量",
      dataIndex: "networkCardNumStr",
    },
    {
      title: "创建时间",
      dataIndex: "gmtModify",
    },
    {
      title: "修改时间",
      dataIndex: "gmtCreate",
    },
    {
      title: "操作",
      dataIndex: "action",
      scopedSlots: { customRender: "action" },
    },
  ],
  condition: [],
}

// 纳管资源/VC管理/vCenter/虚拟中心 同步日志
export const SyncLog = {
  columns: [
    {
      title: "资源名称",
      dataIndex: "resourceName",
      width: "160px"
    },
    {
      title: "同步模式",
      dataIndex: "syncMode",
      width: "80px"
    },
    {
      title: "同步类型",
      dataIndex: "syncType",
      width: "80px"
    },
    {
      title: "同步结果",
      dataIndex: "syncResult",
    },
    {
      title: "同步时间",
      dataIndex: "gmtCreate",
      width: "150px"
    },
  ],
  condition: [
    {
      title: "同步模式",
      dataIndex: "syncMode",
      type: "select",
      defaultValue: null,
      options: [],
    },
    {
      title: "同步类型",
      dataIndex: "syncType",
      type: "select",
      defaultValue: null,
      options: [],
    },
  ]
}

// 纳管资源/SDN管理/业务处理/SN码管理 待部署 外层
export const SnCodeWaitingForDeployment = {
  columns: [
    {
      title: null,
      dataIndex: null,
      type: "expand",
      scopedSlots: { customRender: "expand" },
    },
    {
      title: "机柜名称",
      dataIndex: "name",
    },
  ],
  condition: [
    {
      title: "设备序列号",
      dataIndex: "snCode",
      type: "input",
    },
    {
      title: "机柜名称",
      dataIndex: "cabinetName",
      type: "input",
    },
  ]
}

// 纳管资源/SDN管理/业务处理/SN码管理 待部署 展开
export const SnCodeWaitingForDeploymentDetail = {
  columns: [
    {
      title: "设备序列号",
      dataIndex: "snCode",
    },
    {
      title: "机柜名称",
      dataIndex: "cabinetName",
    },
    {
      title: "U位",
      dataIndex: "cabinetUlocation",
      width: 120
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
    },
  ],
  condition: []
}


// 纳管资源/SDN管理/业务处理/SN码管理 待投产 外层
export const SnCodeWaitingForProduction = {
  columns: [
    {
      title: null,
      dataIndex: null,
      type: "checkbox",
      width: 50,
      scopedSlots: { customRender: "checkbox" },
    },
    {
      title: null,
      dataIndex: null,
      type: "expand",
      scopedSlots: { customRender: "expand" },
    },
    {
      title: "机柜名称",
      dataIndex: "name",
    },
    {
      title: "端口规则",
      scopedSlots: { customRender: (label, row, index) => `${row.beginNum} - ${row.endNum}` },
    },
    {
      title: "所属机柜组",
      dataIndex: "cabinetGroupName",
    },
    {
      title: "操作",
      dataIndex: "action",
      scopedSlots: { customRender: "action" },
    },
  ],
  condition: [
    {
      title: "设备序列号",
      dataIndex: "snCode",
      type: "input",
    },
    {
      title: "机柜名称",
      dataIndex: "cabinetName",
      type: "input",
    },
  ]
}

// 纳管资源/SDN管理/业务处理/SN码管理 待投产 展开
export const SnCodeWaitingForProductionDetail = {
  columns: [
    {
      title: "设备序列号",
      dataIndex: "snCode",
    },
    {
      title: "机柜名称",
      dataIndex: "cabinetName",
    },
    {
      title: "U位",
      dataIndex: "cabinetUlocation",
      width: 80,
    },
    {
      title: "业务接线信息",
      ['show-overflow-tooltip']: true,
      scopedSlots: {
        customRender: (label, row, index) => `${JSON.parse(row.variable)
          .portResult.mainDevicePorts
          .map(v => v.information)
          .join(' ')}`
      },
    },
    {
      title: "iLo IP",
      scopedSlots: {
        customRender: (label, row, index) => `${JSON.parse(row.variable).ipResult.iloIp.ip}`
      },
      width: 110,
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
      width: 150
    },
  ],
  condition: []
}


// 纳管资源/SDN管理/业务处理/SN码管理 已投产 外层
export const SnCodeProduced = {
  columns: [
    {
      title: null,
      dataIndex: null,
      type: "expand",
      scopedSlots: { customRender: "expand" },
    },
    {
      title: "机柜名称",
      dataIndex: "name",
    },
    {
      title: "端口规则",
      scopedSlots: { customRender: (label, row, index) => `${row.beginNum} - ${row.endNum}` },
    },
    {
      title: "所属机柜组",
      dataIndex: "cabinetGroupName",
    },
  ],
  condition: [
    {
      title: "设备序列号",
      dataIndex: "snCode",
      type: "input",
    },
    {
      title: "机柜名称",
      dataIndex: "cabinetName",
      type: "input",
    },
  ]
}
