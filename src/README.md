# vue3-el-table-plus

The table component based on vue3.0 and element-plus package includes conditional query function, table function and paging function. The code transparently transmits all attributes to the native el-table, so it is compatible with the el-table API. Use configurable mode to quickly complete data requests, conditional queries, paging queries and other functions.

基于vue3.0和element-plus封装的表格组件，包含了条件查询功能、表格功能和分页功能。代码将属性全部透传到原生的el-table上，因此兼容el-table的api。采用可配置模式快速完成数据请求，条件查询，分页查询等功能。

## Install

```bash
npm install vue3-el-table-plus
```

## Usage

```javascript
// main.js
import TablePlus from 'vue3-el-table-plus.es.js'
app.use(TablePlus)
```

```html
<!-- .vue -->
<TablePlus :columns="columns" :condition="condition" :queryFunction="queryFunction"> </TablePlus>
```

## API

### TablePlus属性

6

| 属性名 | 描述说明 | 类型 | 默认值 |
| ------ | -------- | ---- | ------ |
|        |          |      |        |
|        |          |      |        |

## QuickStart

```html
<!-- .vue -->
<template>
  <TablePlus :columns="columns" :condition="condition" :queryFunction="queryFunction"> </TablePlus>
</template>
<script setup>
  import { requestMock } from './api'
  import { user } from './table.config.js'
  const { columns, condition } = user
  // 请求函数返回值为Promise
  const queryFunction = (params) =>
    new Promise(async (resolve, reject) => {
      // 此处可拦截请求参数，并对参数进行处理，默认抛出的参数结构如下
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
```

```javascript
// table.config.js
// 建议将配置项单独用一个文件维护，可以大大减少vue文件的长度
export const user = {
  columns: [
    /**
     * columns基本配置项
     * @param {String} title 标签值
     * @param {String} dataIndex 索引值
     * @param {String} renderType ( '' | 'selection' | 'slot' ) => ( 默认 | 选择器列 | 自定义列 )
     * @param {Function} formatter 格式化函数
     * 其余所有字段、方法都将透传至原生el-table
     */
    {
      title: '选择',
      dataIndex: 'selection',
      renderType: 'selection'
    },
    {
      title: '序号',
      dataIndex: 'index',
      renderType: 'slot'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      renderType: 'slot',
      width: 200
    },
    {
      title: '性别',
      dataIndex: 'gender',
      formatter(row, column, dataIndex) {
        return ['男', '女'][row[dataIndex]]
      }
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '邮编',
      dataIndex: 'zip',
      formatter(row, column, dataIndex) {
        return 'CA: ' + row[dataIndex]
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      renderType: 'slot'
    }
  ],
  condition: [
    /**
     * 条件查询区域配置项
     * @param {String} title 标签值
     * @param {String} dataIndex 索引值
     * @param {String} type ( 'input' | 'select' | 'daterange' )
     * @param {String} defaultValue 默认值
     * @param {Array} options 选择器类型的下拉数据，键值字段规定为value、label
     */
    {
      title: '姓名',
      dataIndex: 'name',
      type: 'input',
      defaultValue: null
    },
    {
      title: '性别',
      dataIndex: 'gender',
      type: 'select',
      defaultValue: null,
      options: [
        {
          value: 0,
          label: '男'
        },
        {
          value: 1,
          label: '女'
        }
      ]
    },
    {
      title: '日期',
      dataIndex: 'date',
      type: 'daterange'
    },
    {
      title: '地址',
      dataIndex: 'address',
      defaultValue: null,
      type: 'select',
      options: []
    }
  ]
}
```

## Slot configuration

```html
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
```
