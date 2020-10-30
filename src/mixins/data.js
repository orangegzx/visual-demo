/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-10-30 15:40:25
 */

export default {
  data() {
    return {
      lineData: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ],
      boxData: [
        { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
        { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
        { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
        { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
        { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
        { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30 },
        { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
        { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 }
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
