/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 16:28:49
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-10 17:11:54
 */
class NodeModel {
  constructor(data) {
    this._data = data
    return {
      id: data.id || '',
      alias: `${data.namespace}/${data.name}`,
      type: data.type || '',
      namespace: data.namespace,
      name: data.name || '',
      app: data.app || '',
      version: data.version || '',
      traffics: data.traffics || []
    }
  }
}

export {
  NodeModel
}
