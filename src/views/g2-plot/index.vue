<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-23 15:18:02
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 15:45:47
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
    <!-- 箱型图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">箱型图</span>
      <div id="boxCtn" class="item-chart" />
    </el-col>
    <!-- 雷达图 -->
    <el-col :xl="4" :lg="4" :md="8" :sm="12" :xs="24" class="item">
      <span class="title">雷达图</span>
      <div id="radarCtn" class="item-chart" />
    </el-col>
  </el-row>
</template>

<script>
import MethodsFile from '@/mixins/methods'

export default {
  name: 'G2PlotPage',
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
      this.drawLine()
      this.drawLiquid()
      this.drawBox()
      this.drawRadar()
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
