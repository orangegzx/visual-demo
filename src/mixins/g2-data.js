/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 16:44:21
 */

export default {
  data() {
    return {
      roseData: [
        { year: '2001', population: 41.8 },
        { year: '2002', population: 38 },
        { year: '2003', population: 33.7 },
        { year: '2004', population: 30.7 },
        { year: '2005', population: 25.8 },
        { year: '2006', population: 31.7 },
        { year: '2007', population: 33 },
        { year: '2008', population: 46 },
        { year: '2009', population: 38.3 },
        { year: '2010', population: 28 },
        { year: '2011', population: 42.5 },
        { year: '2012', population: 30.3 }
      ],
      pieData: [
        { value: 251, type: '大事例一', name: '子事例一' },
        { value: 1048, type: '大事例一', name: '子事例二' },
        { value: 610, type: '大事例二', name: '子事例三' },
        { value: 434, type: '大事例二', name: '子事例四' },
        { value: 335, type: '大事例三', name: '子事例五' },
        { value: 250, type: '大事例三', name: '子事例六' }
      ],
      radarData: [
        { 'item': '设计', 'a': 70, 'b': 30 },
        { 'item': '开发', 'a': 60, 'b': 70 },
        { 'item': '市场', 'a': 50, 'b': 60 },
        { 'item': '用户', 'a': 40, 'b': 50 },
        { 'item': '测试', 'a': 60, 'b': 70 },
        { 'item': '语言', 'a': 70, 'b': 50 },
        { 'item': '科技', 'a': 50, 'b': 40 },
        { 'item': '支持', 'a': 30, 'b': 40 },
        { 'item': '销售', 'a': 60, 'b': 40 },
        { 'item': '体验设计', 'a': 50, 'b': 60 }
      ]
    }
  }
}
