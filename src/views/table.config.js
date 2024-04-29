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
            renderType: 'selection',
            width: 55
        },
        {
            title: '序号',
            dataIndex: 'index',
            renderType: 'slot',
            width: 80
        },
        {
            title: '日期',
            dataIndex: 'date',
            width: 200
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
            },
            width: 80
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
            },
            width: 200
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
    ],
}