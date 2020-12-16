<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-09 14:31:39
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-16 15:02:37
-->
<template>
  <article class="tuo-pu">
    <div>allUnzipData</div>
    <el-button @click="getAllUnzipDate">重置</el-button>
    <el-button @click="unzip('bookinfo/a/v1')">解压a</el-button>
    <el-button @click="unzip('bookinfo/b')">解压b</el-button>
    <el-button @click="unzip('bookinfo/c')">解压c</el-button>
    <el-button @click="unzip('bookinfo/d')">解压d</el-button>
  </article>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'
import { zipData } from '@/utils/zip-data'

export default {
  name: 'Tuopu',
  data() {
    return {
      test: '123',
      tpData: {}
    }
  },
  computed: {
    ...mapState('zipData', [
      'allZipData',
      'allUnzipData',
      'nodeSourceMap',
      'sameOriginObj'
    ])
  },
  created() {
    this.getAllUnzipDate()
  },
  methods: {

    ...mapActions('zipData', ['GetAllUnzipData']),

    /** 1.获取全解压数据
     * 1.1处理每个版本节点与对应服务级别关系
     * 1.2 所有节点同来源的节点集合（初始化数据即全压缩）
     * */
    getAllUnzipDate() {
      this.GetAllUnzipData().then((res) => {
        this.tpData = _.cloneDeep(this.allZipData)
        console.log('全压缩数据:', this.tpData)
        console.log('全解压data：', this.allUnzipData)
        // console.log('nodeSourceMap', this.nodeSourceMap)
        console.log('SAME_ALIAS_OBJ:', this.sameOriginObj)
      })
    },
    // eg
    unzip(id) {
      // const { nodes, edges } = this.allZipData
      // const params = {
      //   edges,
      //   nodes,
      //   sameOriginNodes: this.sameOriginObj,
      //   nodeSourceMap: this.nodeSourceMap
      // }
      const node = this.allZipData.nodes.find(node => node.id === id)
      this.tpData = zipData(this.tpData, [node])
      console.log('eg-r', this.tpData)
    }

  }
}
</script>
