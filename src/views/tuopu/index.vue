<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-09 14:31:39
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-10 15:38:08
-->
<template>
  <article class="tuo-pu">
    test
    <div>{{ test }}</div>
  </article>
</template>

<script>
// 请求requests速率，错误速率errors相加；平均avg_latency延时取平均数
// import _ from 'lodash'
// import { TP_DATA, EGES } from '@/utils/data'
import { EGES } from '@/utils/data'
import { zipData } from '@/utils/zip-data'

export default {
  name: 'Tuopu',
  data() {
    return {
      test: ''
    }
  },
  created() {
    this.getSameLineRate(EGES)
    zipData()
  },
  methods: {
    /** 查询数组重复值的索引们---去重的同事，查看重复值的所用
     *  查询起终点（起终点对应的id所属来源都已处理好）的来源一致的重复数据的索引：多个/一个
    */
    getSameSTLineIndex(arr) {
      const same_data_arr = []
      for (var i = 0; i < arr.length; i++) {
        // 从存储相同数据的数组中查询是否已存在相同的值，存在相同值时，则放入对应的数据中，否则push新的值到same_data_arr中
        const index = same_data_arr.find(function(x) {
          return x.source === arr[i].source && x.target === arr[i].target // 根据新数组中的source查询是否相同值
        })

        if (index !== undefined && index.indexes !== undefined) {
          // 从新数组中查询到相同值时，添加相同值的索引
          same_data_arr.find(function(x) {
            if (x.source === arr[i].source && x.target === arr[i].target) {
              x.indexes.push(i)
            }
          })
        } else {
          // 如果find不到相同放入arr中，如第一次查a时index为undefined，直接dang
          // source,target 都为第一次值时的数据
          same_data_arr.push({
            id: `${arr[i].source}_${arr[i].target}`,
            source: arr[i].source,
            target: arr[i].target,
            indexes: [i]
          })
        }
      }
      return same_data_arr
    },

    /**
     * 求中数据的相同type时，二者rate相加,平均速率求平均值
     * @param arr 需要合并的多条线的traffics字段数据的集合
     * 1，先全部求和，再进行筛选出平均率计算平均值
     *  */
    getRateSum(arr) {
      // 1.全部求和
      const result = Object.values(arr.reduce((acc, { type, protocol, direction, rate }) => {
        acc[type] = {
          type,
          protocol,
          direction,
          rate: (acc[type] ? acc[type].rate : 0) + rate
        }
        return acc
      }, {}))
      // 2.平均率：求平均值
      result.map(item => {
        if (item.type === 'avg_latency') {
          item.rate = item.rate ? item.rate / 2 : 0
        }
      })
      return result
    },

    // 计算全部压缩后的线条的流量（已处理线起点和终点的节点是否是需要压缩）
    getSameLineRate(egesList) {
      // 计算需要合并的线条
      const new_line_arr = this.getSameSTLineIndex(egesList)
      console.log('same_line_Arr', new_line_arr)
      // 对有相同起终点的线条进行流量的合并: 子节点的同来源的起终点最多有4条线
      new_line_arr.map((line) => {
        if (line.indexes.length > 1) {
          // 1.合并多条线的流量计算
          const arr_list = []
          line.indexes.map(i => {
            arr_list.push(...egesList[i].traffics)
            console.log(1, '合并line', line.source, line.target, i)
          })
          const result = this.getRateSum(arr_list)
          line.traffics = result
          console.log('result', result)
        } else {
          // 2. 单条线，流量等数据不变
          line.traffics = egesList[line.indexes[0]].traffics
          console.log(0, '单线条', line.source, line.target, line.indexes[0], egesList[line.indexes[0]].traffics)
        }
      })
      console.log('new-line', new_line_arr)
      return new_line_arr
    }
  }
}
</script>
