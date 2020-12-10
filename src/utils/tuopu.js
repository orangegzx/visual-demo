/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-03 12:24:34
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-10 15:44:54
 */

// 判断变量类型
export function variableType(v) {
  const v_data = Object.prototype.toString.call(v)
  const map_data = new Map([
    ['[object String]', 'string'],
    ['[object Number]', 'number'],
    ['[object Boolean]', 'boolean'],
    ['[object Undefined]', 'undefined'],
    ['[object Object]', 'object'],
    ['[object Array]', 'array'],
    ['[object Null]', 'null'],
    ['[object RegExp]', 'RegExp'],
    ['[object Symbol]', 'symbol'],
    ['[object JSON]', 'json'],
    ['[object Math]', 'math'],
    ['default', 'object']
  ])
  return map_data.get(v_data) ? map_data.get(v_data) : map_data.get('default')
}

export function zipData(unZipNode = [], data) {
  const egesList = data.eges
  const map = new Map()
  /**
   * unZipNode=[]：默认压缩全部节点，无 不压缩的节点
   * unZipNode：传入的数据结构是全部压缩后的节点数据，集合，不需要压缩的节点集合:
   *            [{id:s1,lable:s1}, {id:s3,label:s3,chirdren:[{id: v1,label,v1},{id:v2,label:v2}]}]
   * data：为不压缩的数据源，{ nodeList: [], egesList:[]}
   *
   * 1.new map 设置所有节点的对应来源关系，用于后续判断节点是单节点 or 被包含的节点
   * 对data的NodeList进行遍历，设置new map内容，即通过source字段，设置所有节点的来源的对应关系，如s1-s1,v1-s3,v2-s3,
   * 通过map.get(node id) === 传入的节点id ==》单节点，反之为被包含的节点
   * ps: 可接口获取时设置
   *
   * 2、判断 是否是全部压缩 or 按需压缩部分节点
   *
   */
  if (this.variableType(data) !== 'obejct') return {}
  if (this.variableType(unZipNode) !== 'array') return []

  let new_node_list = []
  let new_eges_list = []

  if (unZipNode.length === 0) {
    /** 1. 全部压缩：通过判断需要不压缩的节点的数量来判断是全部压缩
     * 1.1节点处理
     *
     *   data中获取同一个来源的节点 ==> sameSourceData: {s1: [{id:s1,label:s1,source: s1}], s3: [{id:v1,lable: v1,source: s3}, {id:v2,label:v2, source: s3}]}
     *   ==> 遍历数据的keys，key_arr = object.keys(sameSourceData)
     *   ==> 遍历key_arr，获取对应值，判断是单节点还是被包含的节点
     *      key.arr.map((key) => {
     *        if (sameSourceData(key) && sameSourceData(key).length > 1) {
     *            // 被包含的节点
     *            new_node_list.push({
     *              id: key,
     *              label: key,
     *              source: key
     *              chirdren: sameSourceData(key) // 有版本的节点
     *            })
     *        } else if(sameSourceData(key) && && sameSourceData(key).length === 1) {
     *          // 单节点
     *            new_node_list.push(sameSourceData(key)[0])
     *        }
     *      })
     *    如 new_node_list= [{id:s1,label:s1,source: s1},  {id:s3, label:s3, source: s3, chirdren: [{id:v1,lable: v1, source: s3}, {id:v2,label:v2, source: s3}]} ]
     *
     *  1. 2.连线处理
     *    1.2.1 判断节点是单节点还是被包含的节点
     *      遍历线列表，对每条线的起点和终点进行判断是单节点还是被包含的节点
     *      new_eges_list = egesList.map(line => {
     *        // 起点
     *        if(line.from == map.get(line.from))) {
     *          //不是单节点 v1 !== s3 => v1 = s3
     *          line.from = map.get(line.from)
     *        }
     *        // 终点
     *        if(line.to == map.get(line.to))) {
     *          //不是单节点 v3 !== s4 => v3 = s4
     *          line.to = map.get(line.to)
     *        }
     *      })
     *   2.2 去重，有版本时会得到重复的连线，需去重
     *
     *  */

  } else if (unZipNode.length > 0 && 'unZipNode的id集合与data.nodeList的id集合一致') {
    /** 2. 全部解压，不做数据处理
     *
     */
    new_node_list = data.nodeList
    new_eges_list = data.egesList
  } else if (unZipNode.length > 0 && 'unZipNode的id集合与data.nodeList的id集合不一致且unZipNode的id集合为被包含关系时') {
    // 3. 部分压缩，有部分不需要压缩即unZipNode
    /**
     * ==> data中获取同一个来源的节点
     * ==> sameSourceData: {s1: [{id:s1,label:,source:s1}],s2: [{id:s2,label:s3,source:s2}] s3: [{id:v1,lable: v1, source:s3}, {id:v2,label:v2, source:s3}]， s4: [{id:v3,lable: v3, source:s4}, {id:v4,label:v4, source:s4}]}
     * ==> 遍历数据的keys，key_arr = object.keys(sameSourceData)
     * ==> 遍历key_arr，遍历不需压缩的节点，
     */
    // unZipNode =
    // [{id: s1, label: s1, source: s1},
    //  {id: s3, label: s3, source: s3, chirdren: [{id:v1,lable: v1,source: s3}, {id:v2,label:v2, source: s3}]
    // }]
    const sameSourceData = { s1: [{ id: 's1', label: 's1', source: 's1' }], s2: [{ id: 's2', label: 's3', source: 's2' }], s3: [{ id: 'v1', lable: 'v1', source: 's3' }, { id: 'v2', label: 'v2', source: 's3' }], s4: [{ id: 'v3', lable: 'v3', source: 's4' }, { id: 'v4', label: 'v4', source: 's4' }] }

    const key_arr = Object.keys(sameSourceData)
    key_arr.map(key => {
      unZipNode.map(unNode => {
        if (unNode.id === key) {
          /**
           *  查询不需要压缩的节点 ，单节点 or 有子节点的节点
           * 1.单节点：无压缩无展开，直接放入存储
           * 2.子节点的节点：打散子节点为单节点，与存储数据合并为单一数据
           *  */
          if (unNode.chirdren && unNode.chirdren.length) {
            // 有子节点，打散子节点
            new_node_list = new_node_list.concat(unNode.children)
          } else {
            // 单节点
            new_node_list.push(unNode)
          }
        } else {
          //
          /** 需要压缩的节点
           * 判断是单节点还是 子节点的节点
           *  */
          if (sameSourceData[key].length > 1) {
            // 子节点的节点，压缩为大的节点
            new_node_list.push({
              id: key,
              label: key,
              source: key,
              children: sameSourceData[key]
            })
          } else {
            // 单节点
            new_node_list.push(sameSourceData[key][0])
          }
        }
      })
    })

    /**
     * 线条处理
     *
     */
    egesList.map(line => {
      unZipNode.map(unNode => {
        /**
         * 判断线的起点的来源是否为 不压缩的节点id：map.get(line.form) === unNode.id
         * 1. 起点是需要压缩的节点 map.get(line.form) ！== unNode.id
         *    1.1 判断起点是单节点还是子节点 line.form === map.get(line.form)
         *      1.1.1 起点为单节点 s2; ———— from:line.from
         *        1> 判断线的终点是否是 除了当前unNode.id的 其他不需压缩的节点
         *          a. 终点是不压缩的节点（起点：要压缩的单节点，˙终点不压缩，s2-v1，s2-s7,）
        *              i.判断终点是单节点还是子节点
        *                 终点是单节点：from:line.from, to:line.to
        *                 终点是子节点：from:line.from, to:line.to
         *          b. 终点是压缩的节点（起点：要压缩的单节点,终点压缩， s2-s5,s2-v3）
        *              i.判断终点是单节点还是子节点
        *                 终点是单节点：from:line.from, to:line.to
        *                 终点是子节点：from:line.from, to:map.get(line.to)
        *
         *      1.1.2 起点子节点 v3; ———— from:map.get(line.form)
         *        1> 判断线的终点是否是 除了当前unNode.id的 其他不需压缩的节点
         *          a. 终点是不压缩的节点(起点：要压缩的子节点，˙终点不压缩，v3-s7， v3-v7）
         *             终点是单节点：from: map.get(line.form), to:line.to
         *             终点是子节点: from: map.get(line.form), to:line.to
         *          b.终点是压缩的节点(起点：要压缩的子节点，˙终点压缩,v3-s5, v3-v5）
         *             终点是单节点：from: map.get(line.form), to:line.to
         *             终点是子节点: from: map.get(line.form), to: map.get(line.to)
         *
         * 2. 起点是不需压缩的的节点 map.get(line.form) === unNode.id s1, v3
         *    2.1 判断起点是单节点 or 子节点
         *      2.1.1 起点为单节点 s1 ———— from:line.from
         *        1> 判断线的终点是否是 除了当前unNode.id的 其他不需压缩的节点
         *            a. 终点为不压缩的节点(起点：不压缩的单节点，˙终点不压缩，s1-s7， s1-v7）
         *               终点是单节点：from:line.from，to: line.to
         *               终点是子节点：from:line.from，to: line.to
         *            b. 终点为要压缩的节点(起点：不压缩的单节点，˙终点压缩，s1-v3， s1-s5）
         *               终点是单节点：from:line.from，to: line.to
         *               终点是子节点：from:line.from，to: map.get(line.to)
         *      2.1.1 起点为子节点 v2 ———— from:line.from
         *        1> 判断线的终点是否是 除了当前unNode.id的 其他不需压缩的节点
         *            a. 终点为不压缩的节点(起点：不压缩的子节点，˙终点不压缩，v2-s7， v2-v7）
         *               终点是单节点：from:line.from，to: line.to
         *               终点是子节点：from:line.from，to: line.to
         *            b. 终点为要压缩的节点(起点：不压缩的子节点，˙终点压缩，v2-v3， v2-s5）
         *               终点是单节点：from:line.from，to: line.to
         *               终点是子节点：from:line.from，to: map.get(line.to)
         *
         */
        if (map.get(line.form) === unNode.id) {
          // 1.1 不压缩的节点
        } else {
          /** 1.2 需压缩的节点
           * 1.2.1 判断起点： 单节点 or 子节点
           * 1.2.11单节点：判断终点：单节点还是子节点；
           *        终点为单节点，from、to值不便，如2s-->s5
           *        终点为子节点： to -》子节点来源的节点id
           * 1.2.12子节点：判断终点是单节点还是子节点；
           *        终点为单节点：form ：子节点来源id，to不变
           *        终点为子节点：form： 子节点来源id，to:终点来源id
           */
          if (line.form === map.get(line.form)) {
            /** 1.1  起点为单节点 */
            if (unNode.id === map.get(line.to)) {
              // s5（v1） 不需压缩的节点
              // line.to =
            } else {
              // s4（v3） 要压缩的节点, s2-->s4(v3)
              line.to = map.get(line.to)
            }
          } else {
            /** 1.2 起点为子节点 */

          }

          if (unNode.id === map.get(line.to)) {
            // s3（v1） 不需压缩的节点
            //  line.to =
          } else {
            // s4（v3） 要压缩的节点, s2-->s4(v3)
            line.to = map.get(line.to)
          }
        }
      })
    })
  }
  return { nodeList: new_node_list, egesList: new_eges_list }
}
