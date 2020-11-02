/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-11-02 16:41:46
 */
import Data from '@/mixins/g2-data'
import { MAP_DATA } from '@/utils/map-date'
import { Chart, registerShape } from '@antv/g2'
import { DataView } from '@antv/data-set'
import DataSet from '@antv/data-set'

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
    drawDashboard2() {
      // 自定义Shape 部分
      registerShape('point', 'pointer', {
        draw(cfg, container) {
          const group = container.addGroup()
          const center = this.parsePoint({ x: 0, y: 0 }) // 获取极坐标系下画布中心点
          // 绘制指针
          group.addShape('line', {
            attrs: {
              x1: center.x,
              y1: center.y,
              x2: cfg.x,
              y2: cfg.y,
              stroke: cfg.color,
              lineWidth: 5,
              lineCap: 'round'
            }
          })
          group.addShape('circle', {
            attrs: {
              x: center.x,
              y: center.y,
              r: 9.75,
              stroke: cfg.color,
              lineWidth: 4.5,
              fill: '#fff'
            }
          })

          return group
        }
      })

      const data = [{ value: 5.6 }]
      const chart = new Chart({
        container: 'dashboardCtn2',
        autoFit: true,
        height: 500,
        padding: [0, 0, 30, 0]
      })
      chart.data(data)
      chart.scale('value', {
        min: 0,
        max: 9,
        tickInterval: 1
      })
      chart.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        radius: 0.75
      })

      chart.axis('1', false)
      chart.axis('value', {
        line: null,
        label: {
          offset: -36,
          style: {
            fontSize: 18,
            textAlign: 'center',
            textBaseline: 'middle'
          }
        },
        subTickLine: {
          count: 4,
          length: -15
        },
        tickLine: {
          length: -24
        },
        grid: null
      })
      chart.legend(false)
      chart
        .point()
        .position('value*1')
        .shape('pointer')
        .color('#1890FF')
        .animate({
          appear: {
            animation: 'fade-in'
          }
        })

      // 绘制仪表盘背景
      chart.annotation().arc({
        top: false,
        start: [0, 1],
        end: [9, 1],
        style: {
          // 底灰色
          stroke: '#CBCBCB',
          lineWidth: 18,
          lineDash: null
        }
      })

      // 绘制指标
      chart.annotation().arc({
        start: [0, 1],
        end: [data[0].value, 1],
        style: {
          stroke: '#1890FF',
          lineWidth: 18,
          lineDash: null
        }
      })
      // 绘制指标数字
      chart.annotation().text({
        position: ['50%', '85%'],
        content: '合格率',
        style: {
          fontSize: 20,
          fill: '#545454',
          textAlign: 'center'
        }
      })
      chart.annotation().text({
        position: ['50%', '90%'],
        content: `${data[0].value * 10} %`,
        style: {
          fontSize: 36,
          fill: '#545454',
          textAlign: 'center'
        },
        offsetY: 15
      })

      chart.render()
    },
    // 环图
    drawRing() {
      const chart = new Chart({
        container: 'ringCtn',
        autoFit: true,
        height: 500
      })
      chart.data(this.ringData)
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%'
          return val
        }
      })
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.6
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      })
      // 辅助文本
      chart
        .annotation()
        .text({
          position: ['50%', '50%'],
          content: '主机',
          style: {
            fontSize: 14,
            fill: '#8c8c8c',
            textAlign: 'center'
          },
          offsetY: -20
        })
        .text({
          position: ['50%', '50%'],
          content: '200',
          style: {
            fontSize: 20,
            fill: '#8c8c8c',
            textAlign: 'center'
          },
          offsetX: -10,
          offsetY: 20
        })
        .text({
          position: ['50%', '50%'],
          content: '台',
          style: {
            fontSize: 14,
            fill: '#8c8c8c',
            textAlign: 'center'
          },
          offsetY: 20,
          offsetX: 20
        })
      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', (percent) => {
          return {
            content: (data) => {
              return `${data.item}: ${percent * 100}%`
            }
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%'
          return {
            name: item,
            value: percent
          }
        })

      chart.interaction('element-active')
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
    },

    // 玉环图
    drawYuhuan() {
      const chart = new Chart({
        container: 'yuhuanCtn',
        autoFit: true,
        height: 500
      })

      chart.data(this.yuhuanData)

      chart.scale('percent', {
        min: 0,
        max: 2
      })

      chart.tooltip({
        title: 'question',
        showMarkers: false
      })

      chart.legend(false)
      chart.axis('question', {
        grid: null,
        tickLine: null,
        line: null,
        label: {
          style: {
            fill: '#595959'
          }
        }
      })

      chart.coordinate('polar', { innerRadius: 0.1 }).transpose()

      chart
        .interval()
        .position('question*percent')
        .color('percent', '#BAE7FF-#1890FF-#0050B3')
        .tooltip('percent', (val) => {
          return {
            name: '占比',
            value: val * 100 + '%'
          }
        })
        .label('percent', {
          offset: -2,
          content: (data) => {
            return data.percent * 100 + '%'
          }
        })
      chart.interaction('element-active')
      chart.render()
    },

    // 多条阶梯折线图
    drawStep() {
      const chart = new Chart({
        container: 'stepLineCtn',
        autoFit: true,
        height: 500
      })

      chart.data(this.stepLineData)

      chart.scale('month', {
        range: [0, 1]
      })
      chart.scale('value', {
        nice: true
      })

      chart.tooltip({
        showCrosshairs: true
      })

      chart
        .line()
        .position('month*value')
        .shape('hv')
        .color('key')

      chart.render()
    },

    // 气泡图
    drawBubble() {
      const colorMap = {
        Asia: '#1890FF',
        Americas: '#2FC25B',
        Europe: '#FACC14',
        Oceania: '#223273'
      }

      const chart = new Chart({
        container: 'bubbleCtn',
        autoFit: true,
        height: 500
      })
      chart.data(this.bubbleData)
      // 为各个字段设置别名
      chart.scale({
        LifeExpectancy: {
          alias: '人均寿命（年）',
          nice: true
        },
        Population: {
          type: 'pow',
          alias: '人口总数'
        },
        GDP: {
          alias: '人均国内生产总值($)',
          nice: true
        },
        Country: {
          alias: '国家/地区'
        }
      })
      chart.axis('GDP', {
        label: {
          formatter(value) {
            return (+value / 1000).toFixed(0) + 'k'
          } // 格式化坐标轴的显示
        }
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.legend('Population', false) // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
      chart.point().position('GDP*LifeExpectancy')
        .size('Population', [4, 65])
        .color('continent', val => {
          return colorMap[val]
        })
        .shape('circle')
        .tooltip('Country*Population*GDP*LifeExpectancy')
        .style('continent', (val) => {
          return {
            lineWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            opacity: 0.65,
            stroke: colorMap[val]
          }
        })
      chart.interaction('element-active')
      chart.render()
    },

    // 漏斗图-基础
    drawBaseFunnel() {
      const dv = new DataView().source(this.funnelData)
      dv.transform({
        type: 'map',
        callback(row) {
          row.percent = row.pv / 50000
          return row
        }
      })
      const data = dv.rows
      const chart = new Chart({
        container: 'baseFunnelCtn',
        autoFit: true,
        padding: [20, 100, 80]
      })
      chart.data(data)
      chart.axis(false)
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '{name}<br/>' +
          '<span style="padding-left: 16px;line-height: 16px;">浏览人数：{pv}</span><br/>' +
          '<span style="padding-left: 16px;line-height: 16px;">占比：{percent}</span><br/>' +
          '</li>'
      })

      chart
        .coordinate('rect')
        .transpose()
        .scale(1, -1)
      chart
        .interval()
        .adjust('symmetric')
        .position('action*percent')
        .shape('funnel')
        .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
        .label(
          'action*pv',
          (action, pv) => {
            return {
              content: `${action} ${pv}`
            }
          },
          {
            offset: 35,
            labelLine: {
              style: {
                lineWidth: 1,
                stroke: 'rgba(0, 0, 0, 0.15)'
              }
            }
          }
        )
        .tooltip('action*pv*percent', (action, pv, percent) => {
          return {
            name: action,
            percent: +percent * 100 + '%',
            pv
          }
        })
        .animate({
          appear: {
            animation: 'fade-in'
          },
          update: {
            annotation: 'fade-in'
          }
        })

      chart.interaction('element-active')

      chart.on('beforepaint', () => {
        chart.annotation().clear(true)
        const chartData = chart.getData()
        // 中间标签文本
        chartData.forEach((obj) => {
          chart.annotation().text({
            top: true,
            position: {
              action: obj.action,
              percent: 'median'
            },
            content: +obj.percent * 100 + '%', // 显示的文本内容
            style: {
              stroke: null,
              fill: '#fff',
              textAlign: 'center'
            }
          })
        })
      })

      chart.render()
    },

    // 金字塔漏斗图
    drawPyramidFunnel() {
      const chart = new Chart({
        container: 'pyramidFunnelCtn',
        autoFit: true,
        height: 500,
        padding: [20, 100, 80]
      })
      chart.data(this.funnelData)
      chart.axis(false)
      chart
        .coordinate('rect')
        .transpose()
        .scale(1, -1)
      chart.tooltip({
        showMarkers: false
      })
      chart
        .interval()
        .adjust('symmetric')
        .position('action*pv')
        .shape('pyramid')
        .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
        .label(
          'action*pv',
          (action, pv) => {
            return {
              content: `${action} ${pv}`
            }
          },
          {
            offset: 35,
            labelLine: {
              style: {
                lineWidth: 1,
                stroke: 'rgba(0, 0, 0, 0.15)'
              }
            }
          }
        )
        .animate({
          appear: {
            animation: 'fade-in'
          },
          update: {
            annotation: 'fade-in'
          }
        })

      chart.interaction('element-active')

      chart.render()
    },

    // 地图
    drawMap() {
      const ds = new DataSet()
      const dv = ds.createView('back').source(MAP_DATA, {
        type: 'GeoJSON'
      })
      const userDv = ds
        .createView()
        .source(this.mapUserData)
        .transform({
          geoDataView: dv,
          field: 'name',
          type: 'geo.centroid',
          as: ['longitude', 'latitude']
        })
      const chart = new Chart({
        container: 'mapCtn',
        autoFit: true
        // height: 500,
      })
      chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      })
      chart.axis(false)

      chart.legend({ position: 'right' })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      const bgView = chart.createView()
      bgView.data(dv.rows)
      bgView.tooltip(false)
      bgView
        .polygon()
        .position('longitude*latitude')
        .color('#ebedf0')
        .style({
          lineWidth: 1,
          stroke: '#fafbfc'
        })

      const userView = chart.createView()
      userView.data(userDv.rows)
      userView
        .point()
        .position('longitude*latitude')
        .color('#1890ff')
        .shape('circle')
        .size('value', [5, 15])
        .style({
          lineWidth: 1,
          stroke: '#1890ff'
        })
      userView.interaction('element-active')
      chart.render()
    },

    // 关系图
    drawRelation() {
      const dv = new DataView()
      dv.source(this.relationData, {
        type: 'hierarchy'
      }).transform({
        field: 'value',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y']
      })

      // 将 DataSet 处理后的结果转换为 G2 接受的数据
      const nodes = []
      for (const node of dv.getAllNodes()) {
        if (node.data.name === 'root') {
          continue
        }
        const eachNode = {
          name: node.data.name,
          x: node.x,
          y: node.y,
          value: node.data.value
        }
        nodes.push(eachNode)
      }

      const chart = new Chart({
        container: 'relationCtn',
        autoFit: true,
        height: 500
      })
      chart.data(nodes)
      chart.scale({
        x: {
          nice: true
        },
        y: {
          nice: true
        }
      })

      chart.axis(false)
      chart.legend(false)
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li style="list-style: none;">' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '{name}<br/>' +
          '<span style="padding-left: 16px">浏览人数：{count}</span><br/>' +
          '</li>'
      })
      chart
        .polygon()
        .position('x*y')
        .color('name')
        .tooltip('name*value', (name, count) => {
          return {
            name,
            count
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
        .label('name', {
          offset: 0,
          style: {
            textBaseline: 'middle'
          },
          content: (obj) => {
            if (obj.name !== 'root') {
              return obj.name
            }
          }
        })
      chart.interaction('element-active')

      chart.render()
    },

    // 双轴图
    drawDualAxis() {
      const chart = new Chart({
        container: 'dualAxisCtn',
        autoFit: true,
        height: 500
      })
      chart.data(this.dualAxisData)
      chart.scale({
        people: {
          min: 0,
          max: 10
        },
        waiting: {
          min: 0,
          max: 10
        }
      })
      chart.legend({
        custom: true,
        items: [
          { value: 'waiting', name: '等候', marker: { symbol: 'square', style: { fill: '#3182bd', r: 5 }}},
          { value: 'people', name: '人数', marker: { symbol: 'hyphen', style: { stroke: '#fdae6b', r: 5, lineWidth: 3 }}}
        ]
      })
      chart.axis('people', {
        grid: null,
        title: {
          style: {
            fill: '#fdae6b'
          }
        },
        label: {
          style: {
            fill: '#fdae6b'
          }
        }
      })
      chart.axis('waiting', {
        title: {
          style: {
            fill: 'blue'
          }
        }
      })
      chart.tooltip({
        shared: true
      })
      chart.interval()
        .position('time*waiting')
        .color('#3182bd')
      chart.line()
        .position('time*people')
        .color('#fdae6b')
        .size(3)
        .shape('smooth')
      chart.point()
        .position('time*people')
        .color('#fdae6b')
        .size(3)
        .shape('circle')

      chart.interaction('active-region')
      chart.removeInteraction('legend-filter') // 自定义图例，移除默认的分类图例筛选交互
      chart.render()
    }

  }
}
