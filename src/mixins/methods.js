/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 15:34:54
 */
import Data from '@/mixins/data.js'
import { Liquid } from '@antv/g2plot'
import { Line } from '@antv/g2plot'
import { Box } from '@antv/g2plot'

export default {
  mixins: [Data],
  methods: {
    // 基础折线图
    drawLine() {
      const linePlot = new Line('lineCtn', {
        data: this.lineData,
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
    },

    // 箱型图
    drawBox() {
      const boxPlot = new Box('boxCtn', {
        // width: 400,
        // height: 500,
        data: this.boxData,
        xField: 'x',
        yField: ['low', 'q1', 'median', 'q3', 'high'],
        boxStyle: {
          stroke: '#545454',
          fill: '#1890FF',
          fillOpacity: 0.3
        },
        animation: false
      })

      boxPlot.render()
    }
  }
}
