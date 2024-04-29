<template>
  <div class="vue3-table-plus-wrap">
    <div class="search-wrapper" v-if="condition.length > 0 && data === null">
      <el-form :inline="true" class="demo-form-inline" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="span" v-for="v in condition" :key="v.dataIndex">
            <el-form-item :label="layout === 'inside' ? '' : v.title" style="display: flex">
              <el-input v-model="queryParam[v.dataIndex]" :placeholder="layout === 'inside' ? v.title : '请输入'" v-if="v.type === 'input'" clearable />
              <el-date-picker
                v-model="queryParam[v.dataIndex]"
                start-placeholder="Start date"
                end-placeholder="End date"
                type="daterange"
                valueFormat="YYYY-MM-DD"
                v-else-if="v.type === 'daterange'"
                :placeholder="layout === 'inside' ? v.title : '请选择'"
              />
              <el-select v-model="queryParam[v.dataIndex]" filterable :placeholder="layout === 'inside' ? v.title : '请选择'" :default-value="v.defaultValue" v-else-if="v.type === 'select'" clearable>
                <el-option :value="v1.value" :label="v1.label" v-for="v1 in v.options" :key="v1.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24 - (condition.length % (24 / span)) * span">
            <span class="table-page-search-submitButtons">
              <el-button type="primary" @click="onQueryClick"> 查询 </el-button>
              <el-button style="margin-left: 8px" @click="reset"> 重置 </el-button>
              <slot name="append-btn"></slot>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <slot name="gap-space"></slot>
    <el-table :data="tableData" v-bind="$attrs" v-loading="loading">
      <el-table-column v-bind="v" :prop="v.dataIndex" :type="v.renderType" :label="v.title" v-for="(v, i) in columns" :key="i">
        <template #default="scope" v-if="v.renderType !== 'selection'">
          <span v-if="Object.prototype.toString.call(v.formatter) === '[object Function]'">
            {{ v.formatter(scope.row, scope.column, v.dataIndex) }}
          </span>
          <slot v-else-if="v.renderType === 'slot'" v-bind="scope" :name="v.dataIndex"></slot>
          <span v-else>{{ scope.row[v.dataIndex] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :layout="paginationSize === 'mini' ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
      :current-page="pagination.currentPage"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :style="paginationSize === 'mini' ? 'display: flex;justify-content: center; margin: 20px;' : 'display: flex;justify-content: flex-end; margin: 20px;'"
      :page-sizes="[5, 10, 20, 30, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-if="showPagination"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const tableData = ref([])
const queryParam = ref({})
const confirmParam = ref({})
const loading = ref(false)
const showPagination = ref(true)
defineOptions({
  name: 'TablePlus'
})
const { columns, condition, queryFunction, span, layout, paginationSize, data } = defineProps({
  columns: {
    type: Array,
    default: [],
    required: true
  },
  condition: {
    type: Array,
    default: [],
    required: false
  },
  queryFunction: {
    type: Function,
    default: [],
    required: false
  },
  span: {
    type: Number,
    default: 8,
    required: false
  },
  layout: {
    type: String,
    default: 'outside',
    required: false
  },
  paginationSize: {
    type: String,
    default: 'mini',
    required: false
  },
  data: {
    type: Array,
    required: false,
    default: null
  }
})
const pagination = ref({
  currentPage: 1,
  total: 10,
  pageSize: 10
})
async function queryTable(paginationParams = {}) {
  loading.value = true
  try {
    const queryParamFilter = {}
    Object.keys(confirmParam.value).forEach((key) => notNull(confirmParam.value[key]) && (queryParamFilter[key] = confirmParam.value[key]))
    const queryResult = await queryFunction(
      JSON.parse(
        JSON.stringify({
          pagination: { currentPage: pagination.value.currentPage, pageSize: pagination.value.pageSize, ...paginationParams },
          query: queryParamFilter
        })
      )
    )
    tableData.value = queryResult?.data || []
    pagination.value = {
      currentPage: queryResult.currentPage,
      total: queryResult.total,
      pageSize: queryResult.pageSize
    }
  } finally {
    loading.value = false
  }
}
function onQueryClick() {
  confirmParam.value = JSON.parse(JSON.stringify(queryParam.value))
  pagination.value.currentPage = 1
  queryTable()
}
function reset() {
  queryParam.value = {}
  confirmParam.value = {}
  queryTable({
    currentPage: 1,
    pageSize: 10
  })
}
function notNull(val) {
  return val !== null && val !== undefined && val !== ''
}
function handleSizeChange(val) {
  queryTable({ pageSize: val, currentPage: 1 })
}
function handleCurrentChange(val) {
  queryTable({ currentPage: val })
}
onMounted(() => {
  if (data) {
    tableData.value = data
    showPagination.value = false
  } else {
    queryTable()
  }
})
</script>
