/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 17:13:55
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-10 18:40:45
 */
import { TP_DATA } from '@/utils/data' // mock数据
import { NodeModel } from '@/zip-data.js/data-model'

const state = {
  allUnzipData: {},
  allZipData: { // 全部压缩数据
    nodes: [],
    eges: []
  },
  nodeSourceMap: [], // 节点（版本）来源关系（服务级别）
  sameAliasObj: {} // 每个服务级别下的版本集合
}

const getters = {
  getterAllUnzipNodeList: state => state.allUnzipData.nodes ? state.allUnzipData.nodes.map(item => new NodeModel(item)) : []
}

const mutations = {
  // 设置全解压数据
  SET_UNZIP_DATA: (state, data) => {
    state.allUnzipData = data
  },
  // 设置版本节点与服务级别id对应关系表
  SET_NODE_SOURCE: (state, data) => {
    state.nodeSourceMap = data
  },
  // 设置每个服务级别下的版本集合
  SET_SAME_ALIAS_OBJ: (state, data) => {
    state.sameAliasObj = data
  }
}

const actions = {

  /**
   * 获取全解压数据
   * @param {*} param0
   * @param {*} userInfo
   */
  GetAllUnzipData({ state, commit }) {
    return new Promise((resolve, reject) => {
      console.log('TP_DATA', TP_DATA)
      commit('SET_UNZIP_DATA', TP_DATA)
      // 各个节点的来源
      const map_list = new Map()
      map_list.set('default', 'null') // 不在范围内的显示
      // 节点压缩时：服务级别的id设置为`${node.namespace}/${node.name}`一致
      TP_DATA.nodes.map(node => {
        map_list.set(node.id, `${node.namespace}/${node.name}`)
      })
      commit('SET_NODE_SOURCE', map_list)
      // 3. 根据服务级别分组为相同服务级别的集合
      resolve(TP_DATA)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
