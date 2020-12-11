<!--
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-09 14:31:39
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-11 17:31:35
-->
<template>
  <article class="tuo-pu">
    <div>allUnzipData</div>
  </article>
</template>

<script>
// import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Tuopu',
  data() {
    return {
      test: '123'
    }
  },
  computed: {
    ...mapState('zipData', [
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
        console.log('全解压data：', this.allUnzipData)
        // console.log('nodeSourceMap', this.nodeSourceMap)
        console.log('SAME_ALIAS_OBJ:', this.sameOriginObj)
      })
    }
  }
}
</script>
