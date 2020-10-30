<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 16:08:19
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 16:54:48
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
  margin: 20px 0;
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
