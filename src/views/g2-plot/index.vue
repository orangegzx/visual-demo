<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-23 15:18:02
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-28 17:38:56
-->
<template>
  <el-row>
    <!-- 折线图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">折线图</span>
      <div id="lineCtn" class="item-chart" />
    </el-col>
    <!-- 水波图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">水波图</span>
      <div id="liquidPCtn" class="item-chart" />
    </el-col>
  </el-row>
</template>

<script>
import { Liquid } from '@antv/g2plot'
import { Line } from '@antv/g2plot'

export default {
  name: 'G2Plot',
  data() {
    return {
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ]
    }
  },
  mounted() {
    this.drawLine()
    this.drawLiquid()
  },
  methods: {
    // 基础折线图
    drawLine() {
      const linePlot = new Line('lineCtn', {
        data: this.data,
        xField: 'year',
        yField: 'value'
      })
      linePlot.render()
    },

    // 水波图
    drawLiquid() {
      const liquidPlot = new Liquid('liquidPCtn', {
        percent: 0.25,
        statistic: {
          content: {
            style: {
              fontSize: 60,
              fill: 'black'
            }
          }
        }
      })
      liquidPlot.render()
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 400px;
  width: 600px;
  padding: 20px;
  text-align: center;
  border-bottom: solid 1px #e2e2e2;
}
.item .title {
  color: #666;
  text-align: center;
}
.item-chart {
  height: 100%;
  width: 100%;
  padding: 20px;
}
</style>
