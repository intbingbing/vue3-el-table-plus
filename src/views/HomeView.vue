<template>
  <TablePlus :columns="columns" :condition="condition" :queryFunction="queryFunction" @selection-change="handle" ref="table">
    <template #action="scope">
      <el-button size="small" @click="handle(scope)"> Edit </el-button>
      <el-button size="small" type="danger" @click="handle(scope)"> Delete </el-button>
    </template>
    <template #index="scope"> NO.{{ scope.$index + 1 }} </template>
    <template #name="scope">
      <el-tag>{{ scope.row.name }}</el-tag>
    </template>
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
const queryFunction = (params) =>
  new Promise(async (resolve, reject) => {
    // 此处可拦截请求参数，并对参数进行处理，默认抛出的参数如下
    /* 
    params: {
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      query: {
        name: 'Jay'
      }
    }
    */
    const body = JSON.parse(JSON.stringify(params))
    try {
      const data = await requestMock({ ...body.pagination, ...body.query })
      return resolve(data)
    } catch (e) {
      return reject(e)
    }
  })
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
