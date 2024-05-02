<template>
  <!-- .vue -->
  <TablePlus :columns="columns" :condition="condition" :queryFunction="queryFunction" @selection-change="handle" ref="table">
    <!-- #action与columns.dataIndex值保持一致，且renderType设置为slot -->
    <template #action="scope">
      <el-button size="small" @click="handle(scope)"> Edit </el-button>
      <el-button size="small" type="danger" @click="handle(scope)"> Delete </el-button>
    </template>
    <template #index="scope"> NO.{{ scope.$index + 1 }} </template>
    <template #name="scope">
      <el-tag>{{ scope.row.name }}</el-tag>
    </template>
    <!-- 预留的按钮#append-btn与位置#gap-space，无需在配置项添加 -->
    <template #append-btn><el-button type="primary"> 其他按钮 </el-button></template>
    <template #gap-space>
      <div class="gap-space">
        <span>预留位置</span>
        <el-button type="success"> 新增 </el-button><el-button type="danger"> 导出 </el-button>
      </div>
    </template>
  </TablePlus>
</template>
<script setup>
import { requestMock } from './api'
import { user } from './table.config.js'
const { columns, condition } = user
// 请求函数返回值为Promise
const queryFunction = async (params) => {
  const body = JSON.parse(JSON.stringify(params))
  const data = await requestMock({ ...body.pagination, ...body.query })
  return data
}
const handle = (scope) => {
  console.log(scope)
}
</script>

<style scoped>
.gap-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px gray solid;
  border-radius: 14px;
  & > span {
    margin: auto;
  }
}
</style>
