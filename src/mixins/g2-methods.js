/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 16:52:35
 */
import Data from '@/mixins/g2-data'
import { Chart } from '@antv/g2'
import { DataView } from '@antv/data-set'

export default {
  mixins: [Data],
  methods: {
    // 仪表盘
    drawDashboard() {
      // 极坐标下的柱状图
      // 构造数据
      const data1 = []
      for (let i = 0; i < 50; i++) {
        data1.push({
          type: i + '',
          value: 10
        })
      }

      const data2 = []
      for (let i = 0; i < 50; i++) {
        const item = {}
        item.type = i + ''
        item.value = 10
        if (i === 25) {
          item.value = 14
        }
        if (i > 25) {
          item.value = 0
        }
        data2.push(item)
      }

      const chart = new Chart({
        container: 'dashboardCtn',
        autoFit: true,
        height: 500,
        padding: 0
      })
      chart.scale({
        type: {
          range: [0, 1]
        },
        value: {
          sync: true
        }
      })
      chart.legend(false)
      chart.tooltip(false)

      const view1 = chart.createView()
      view1.data(data1)
      view1.axis(false)
      view1.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        innerRadius: 0.75,
        radius: 0.8
      })
      view1
        .interval()
        .position('type*value')
        .color('#CBCBCB')
        .size(6)

      const view2 = chart.createView()
      view2.data(data1)
      view2.axis('value', false)
      view2.axis('type', {
        grid: null,
        line: null,
        tickLine: null,
        label: {
          offset: -25,
          style: {
            textAlign: 'center',
            fill: '#CBCBCB',
            fontSize: 18
          },
          formatter: (val) => {
            if (+val % 7 !== 0) {
              return ''
            }

            return val
          }
        }
      })
      view2.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        innerRadius: 0.95,
        radius: 0.55
      })
      view2
        .interval()
        .position('type*value')
        .color('#CBCBCB')
        .size(6)

      const view3 = chart.createView()
      view3.data(data2)
      view3.axis(false)
      view3.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        innerRadius: 0.75,
        radius: 0.8
      })
      view3
        .interval()
        .position('type*value')
        .color('value', '#3023AE-#53A0FD')
        .size(6)

      view3.annotation().text({
        position: ['50%', '65%'],
        content: '26°',
        style: {
          fill: '#CBCBCB',
          fontSize: 64,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      })
      chart.render()
    },
    // 玫瑰图
    drawRose() {
      const chart = new Chart({
        container: 'roseCtn',
        autoFit: true,
        height: 500
      })
      chart.data(this.roseData)
      chart.coordinate('polar')
      chart.axis(false)
      chart.tooltip({
        showMarkers: false
      })
      chart.interaction('element-highlight')
      chart
        .interval()
        .position('year*population')
        .label('year', {
          offset: -15
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.render()
    },

    // 嵌套饼图
    drawPie() {
      // 通过 DataSet 计算百分比
      const dv = new DataView()
      dv.source(this.pieData).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      })
      const chart = new Chart({
        container: 'pieCtn',
        autoFit: true,
        height: 500,
        padding: 0
      })
      chart.data(dv.rows)
      chart.scale({
        percent: {
          formatter: (val) => {
            val = (val * 100).toFixed(2) + '%'
            return val
          }
        }
      })
      chart.coordinate('theta', {
        radius: 0.5
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.legend(false)
      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('type')
        .label('type', {
          offset: -10
        })
        .tooltip('type*percent', (item, percent) => {
          percent = (percent * 100).toFixed(2) + '%'
          return {
            name: item,
            value: percent
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })

      const outterView = chart.createView()
      const dv1 = new DataView()
      dv1.source(this.pieData).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent'
      })

      outterView.data(dv1.rows)
      outterView.scale({
        percent: {
          formatter: (val) => {
            val = (val * 100).toFixed(2) + '%'
            return val
          }
        }
      })
      outterView.coordinate('theta', {
        innerRadius: 0.5 / 0.75,
        radius: 0.75
      })
      outterView
        .interval()
        .adjust('stack')
        .position('percent')
        .color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'])
        .label('name')
        .tooltip('name*percent', (item, percent) => {
          percent = (percent * 100).toFixed(2) + '%'
          return {
            name: item,
            value: percent
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.interaction('element-highlight')
      chart.render()
    }

  }
}
