<template>
  <el-card>
    <BaseTable :columns='columns' :condition='condition' :queryFunction='queryFunction' ref="table"
      :paginationText="{ currentPage: 'page', total: 'total', pageSize: 'pages', data: 'rows' }" v-if='platformDone'>
      <template slot-scope="scope" slot='action'>
        <el-button @click="openDialog(scope)" type="text" size="small">新增逻辑端口</el-button>
      </template>
    </BaseTable>
  </el-card>
</template>
<script>
import BaseTable from "./Table/BaseTable.vue"
const requestMock = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = []
    for (let index = 0; index < 10; index++) {
      data.push({
        projectName: '项目名称' + index,
        systemName: '系统名称' + index,
        applyPerson: '应用负责人' + index,
        systemPerson: '系统负责人' + index,
        networkCardNumStr: '网卡数量' + index,
        gmtModify: '创建时间' + index,
        gmtCreate: '修改时间' + index,
      })
    }
    resolve({
      currentPage: 2,
      total: 100,
      pageSize: 10,
      data
    })
  }, 2000);
})
export default {
  name: 'UseTable',
  components: { BaseTable },
  data() {
    return {
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
      queryParam: {},
      queryFunction: params => new Promise(async (resolve, reject) => {
        params.params = params.query
        try {
          const data = await requestMock();
          return resolve(data);
        } catch (e) {
          return reject(e);
        }
      })
    }
  },
  async created() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.colorRed {
  color: red;
}

.pre-row ul {
  list-style-type: none;
  display: flex;
  font-size: 12px;
  padding: 0;
  line-height: 20px;
}

.pre-row ul li {
  flex: 0 0 31.9%;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  padding-right: 15px;
}

.pre-box {
  padding-top: 20px;
}

/deep/.pre-box .el-form-item__content {
  width: 100%;
}

.add-box {
  border-bottom: 1px solid #eee;
}

/deep/.el-form-item--small .el-form-item__label {
  font-size: 12px;
}

/deep/.widthText .el-progress-bar__inner {
  width: 0;
}

/deep/.colorText .el-progress-bar__innerText {
  color: #fff !important;
}

/deep/.el-progress-bar__innerText {
  color: #333 !important;
}

.formSpan {
  margin-left: 10px;
}

/deep/ .themem_dialog_duankou .el-dialog__header {
  height: 48px;
  line-height: 48px;
  background-color: #f5f7f9 !important;
  font-size: 16px !important;
  color: #666 !important;
  text-align: left;
  padding: 0;
  padding-left: 20px;

  .el-dialog__title {
    color: #666 !important;
    font-size: 16px !important;
  }

  .el-dialog__headerbtn .el-dialog__close {
    i {
      font-size: 16px !important;
    }

    color: #bbb !important;
  }
}

/deep/ .themem_dialog_duankou .el-dialog__footer {
  height: 54px;
  text-align: right;
  background: #fff !important;
  padding: 0px !important;
  padding-right: 20px !important;

  .el-button {
    width: 66px;
    height: 34px;
    margin-top: 10px;
    // margin-right: 20px;
  }
}

.logical {
  margin-left: 180px;
}
</style>
