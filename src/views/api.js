import { Random } from 'mockjs'
import { toRefs, toValue, ref } from 'vue'
// const Random = Mock.Random
export const requestMock = ({ pageSize, currentPage }) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = []
            for (let index = 0; index < pageSize; index++) {
                data.push({
                    date: Random.date(),
                    name: Random.name(),
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: Random.zip(),
                    gender: Random.integer(0, 1)
                })
            }
            resolve({
                currentPage,
                total: 100,
                pageSize,
                data
            })
        }, 1000)
    })