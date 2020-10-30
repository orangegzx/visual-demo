<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 16:08:19
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 18:11:52
-->
<template>
  <el-row>
    <!-- 仪表盘 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">仪表盘</span>
      <div id="dashboardCtn" class="item-chart" />
    </el-col>
    <!-- 南丁格尔玫瑰图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">玫瑰图</span>
      <div id="roseCtn" class="item-chart" />
    </el-col>
    <!-- 嵌套饼图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">嵌套饼图</span>
      <div id="pieCtn" class="item-chart" />
    </el-col>
    <!-- 气泡图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">气泡图</span>
      <div id="bubbleCtn" class="item-chart" />
    </el-col>
    <!-- 基础漏斗图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">基础漏斗图</span>
      <div id="baseFunnelCtn" class="item-chart" />
    </el-col>
    <!-- 尖端漏斗图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">金字塔漏斗图</span>
      <div id="pyramidFunnelCtn" class="item-chart" />
    </el-col>
    <!-- 地图 -->
    <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" class="item item-map">
      <span class="title">地图</span>
      <div id="mapCtn" class="item-chart" />
    </el-col>
  </el-row>
</template>

<script>
import MethodsFile from '@/mixins/g2-methods'

export default {
  name: 'G2Page',
  mixins: [MethodsFile],

  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.drawDashboard()
      this.drawRose()
      this.drawPie()
      this.drawBubble()
      this.drawBaseFunnel()
      this.drawPyramidFunnel()
      this.drawMap()
    }

  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 400px;
  width: 600px;
  padding: 20px 0 30px 0;
  text-align: center;
  border-bottom: solid 1px #e2e2e2;
  margin: 20px 0;
}
.item-map {
  // width: 100%;
}
.item .title {
  display: inline-block;
  color: #666;
  text-align: center;
  padding-bottom: 10px;
}
.item-chart {
  height: 100%;
  width: 100%;
  padding: 20px;
}
</style>
