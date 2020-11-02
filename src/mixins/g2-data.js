/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-10-30 15:10:15
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-11-02 16:14:24
 */
// import { MAP_DATA } from '@/utils/map-date'

export default {
  data() {
    return {
      // 玫瑰图
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
      // 环图
      ringData: [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 }
      ],
      // 嵌套饼图
      pieData: [
        { value: 251, type: '大事例一', name: '子事例一' },
        { value: 1048, type: '大事例一', name: '子事例二' },
        { value: 610, type: '大事例二', name: '子事例三' },
        { value: 434, type: '大事例二', name: '子事例四' },
        { value: 335, type: '大事例三', name: '子事例五' },
        { value: 250, type: '大事例三', name: '子事例六' }
      ],
      // 玉环图
      yuhuanData: [
        { question: '问题 1', percent: 0.21 },
        { question: '问题 2', percent: 0.4 },
        { question: '问题 3', percent: 0.49 },
        { question: '问题 4', percent: 0.52 },
        { question: '问题 5', percent: 0.53 },
        { question: '问题 6', percent: 0.84 },
        { question: '问题 7', percent: 1.0 },
        { question: '问题 8', percent: 1.2 }
      ],
      // 气泡
      bubbleData: [
        {
          'continent': 'Americas',
          'Country': 'Argentina',
          'LifeExpectancy': 75.32,
          'GDP': 12779.37964,
          'Population': 40301927
        },
        {
          'continent': 'Americas',
          'Country': 'Brazil',
          'LifeExpectancy': 72.39,
          'GDP': 9065.800825,
          'Population': 190010647
        },
        {
          'continent': 'Americas',
          'Country': 'Canada',
          'LifeExpectancy': 80.653,
          'GDP': 36319.23501,
          'Population': 33390141
        },
        {
          'continent': 'Americas',
          'Country': 'Chile',
          'LifeExpectancy': 78.553,
          'GDP': 13171.63885,
          'Population': 16284741
        },
        {
          'continent': 'Americas',
          'Country': 'Colombia',
          'LifeExpectancy': 72.889,
          'GDP': 7006.580419,
          'Population': 44227550
        },
        {
          'continent': 'Americas',
          'Country': 'Costa Rica',
          'LifeExpectancy': 78.782,
          'GDP': 9645.06142,
          'Population': 4133884
        },
        {
          'continent': 'Americas',
          'Country': 'Cuba',
          'LifeExpectancy': 78.273,
          'GDP': 8948.102923,
          'Population': 11416987
        },
        {
          'continent': 'Americas',
          'Country': 'Dominican Republic',
          'LifeExpectancy': 72.235,
          'GDP': 6025.374752,
          'Population': 9319622
        },
        {
          'continent': 'Americas',
          'Country': 'Ecuador',
          'LifeExpectancy': 74.994,
          'GDP': 6873.262326,
          'Population': 13755680
        },
        {
          'continent': 'Americas',
          'Country': 'El Salvador',
          'LifeExpectancy': 71.878,
          'GDP': 5728.353514,
          'Population': 6939688
        },
        {
          'continent': 'Americas',
          'Country': 'Guatemala',
          'LifeExpectancy': 70.259,
          'GDP': 5186.050003,
          'Population': 12572928
        },
        {
          'continent': 'Americas',
          'Country': 'Honduras',
          'LifeExpectancy': 70.198,
          'GDP': 3548.330846,
          'Population': 7483763
        },
        {
          'continent': 'Americas',
          'Country': 'Jamaica',
          'LifeExpectancy': 72.567,
          'GDP': 7320.880262,
          'Population': 2780132
        },
        {
          'continent': 'Americas',
          'Country': 'Mexico',
          'LifeExpectancy': 76.195,
          'GDP': 11977.57496,
          'Population': 108700891
        },
        {
          'continent': 'Americas',
          'Country': 'Nicaragua',
          'LifeExpectancy': 72.899,
          'GDP': 2749.320965,
          'Population': 5675356
        },
        {
          'continent': 'Americas',
          'Country': 'Panama',
          'LifeExpectancy': 75.537,
          'GDP': 9809.185636,
          'Population': 3242173
        },
        {
          'continent': 'Americas',
          'Country': 'Paraguay',
          'LifeExpectancy': 71.752,
          'GDP': 4172.838464,
          'Population': 6667147
        },
        {
          'continent': 'Americas',
          'Country': 'Peru',
          'LifeExpectancy': 71.421,
          'GDP': 7408.905561,
          'Population': 28674757
        },
        {
          'continent': 'Americas',
          'Country': 'Puerto Rico',
          'LifeExpectancy': 78.746,
          'GDP': 19328.70901,
          'Population': 3942491
        },
        {
          'continent': 'Americas',
          'Country': 'Trinidad and Tobago',
          'LifeExpectancy': 69.819,
          'GDP': 18008.50924,
          'Population': 1056608
        },
        {
          'continent': 'Americas',
          'Country': 'United States',
          'LifeExpectancy': 78.242,
          'GDP': 42951.65309,
          'Population': 301139947
        },
        {
          'continent': 'Americas',
          'Country': 'Uruguay',
          'LifeExpectancy': 76.384,
          'GDP': 10611.46299,
          'Population': 3447496
        },
        {
          'continent': 'Americas',
          'Country': 'Venezuela',
          'LifeExpectancy': 73.747,
          'GDP': 11415.80569,
          'Population': 26084662
        },
        {
          'continent': 'Asia',
          'Country': 'China',
          'LifeExpectancy': 72.961,
          'GDP': 4959.114854,
          'Population': 1318683096
        },
        {
          'continent': 'Asia',
          'Country': 'Hong Kong, China',
          'LifeExpectancy': 82.208,
          'GDP': 39724.97867,
          'Population': 6980412
        },
        {
          'continent': 'Asia',
          'Country': 'Japan',
          'LifeExpectancy': 82.603,
          'GDP': 31656.06806,
          'Population': 127467972
        },
        {
          'continent': 'Asia',
          'Country': 'Korea, Dem. Rep.',
          'LifeExpectancy': 67.297,
          'GDP': 1593.06548,
          'Population': 23301725
        },
        {
          'continent': 'Asia',
          'Country': 'Korea, Rep.',
          'LifeExpectancy': 78.623,
          'GDP': 23348.13973,
          'Population': 49044790
        },
        {
          'continent': 'Europe',
          'Country': 'Albania',
          'LifeExpectancy': 76.423,
          'GDP': 5937.029526,
          'Population': 3600523
        },
        {
          'continent': 'Europe',
          'Country': 'Austria',
          'LifeExpectancy': 79.829,
          'GDP': 36126.4927,
          'Population': 8199783
        },
        {
          'continent': 'Europe',
          'Country': 'Belgium',
          'LifeExpectancy': 79.441,
          'GDP': 33692.60508,
          'Population': 10392226
        },
        {
          'continent': 'Europe',
          'Country': 'Bosnia and Herzegovina',
          'LifeExpectancy': 74.852,
          'GDP': 7446.298803,
          'Population': 4552198
        },
        {
          'continent': 'Europe',
          'Country': 'Bulgaria',
          'LifeExpectancy': 73.005,
          'GDP': 10680.79282,
          'Population': 7322858
        },
        {
          'continent': 'Europe',
          'Country': 'Croatia',
          'LifeExpectancy': 75.748,
          'GDP': 14619.22272,
          'Population': 4493312
        },
        {
          'continent': 'Europe',
          'Country': 'Czech Republic',
          'LifeExpectancy': 76.486,
          'GDP': 22833.30851,
          'Population': 10228744
        },
        {
          'continent': 'Europe',
          'Country': 'Denmark',
          'LifeExpectancy': 78.332,
          'GDP': 35278.41874,
          'Population': 5468120
        },
        {
          'continent': 'Europe',
          'Country': 'Finland',
          'LifeExpectancy': 79.313,
          'GDP': 33207.0844,
          'Population': 5238460
        },
        {
          'continent': 'Europe',
          'Country': 'France',
          'LifeExpectancy': 80.657,
          'GDP': 30470.0167,
          'Population': 61083916
        },
        {
          'continent': 'Europe',
          'Country': 'Germany',
          'LifeExpectancy': 79.406,
          'GDP': 32170.37442,
          'Population': 82400996
        },
        {
          'continent': 'Europe',
          'Country': 'Greece',
          'LifeExpectancy': 79.483,
          'GDP': 27538.41188,
          'Population': 10706290
        },
        {
          'continent': 'Europe',
          'Country': 'Hungary',
          'LifeExpectancy': 73.338,
          'GDP': 18008.94444,
          'Population': 9956108
        },
        {
          'continent': 'Europe',
          'Country': 'Iceland',
          'LifeExpectancy': 81.757,
          'GDP': 36180.78919,
          'Population': 301931
        },
        {
          'continent': 'Europe',
          'Country': 'Ireland',
          'LifeExpectancy': 78.885,
          'GDP': 40675.99635,
          'Population': 4109086
        },
        {
          'continent': 'Europe',
          'Country': 'Italy',
          'LifeExpectancy': 80.546,
          'GDP': 28569.7197,
          'Population': 58147733
        },
        {
          'continent': 'Europe',
          'Country': 'Montenegro',
          'LifeExpectancy': 74.543,
          'GDP': 9253.896111,
          'Population': 684736
        },
        {
          'continent': 'Europe',
          'Country': 'Netherlands',
          'LifeExpectancy': 79.762,
          'GDP': 36797.93332,
          'Population': 16570613
        },
        {
          'continent': 'Europe',
          'Country': 'Norway',
          'LifeExpectancy': 80.196,
          'GDP': 49357.19017,
          'Population': 4627926
        },
        {
          'continent': 'Europe',
          'Country': 'Poland',
          'LifeExpectancy': 75.563,
          'GDP': 15389.92468,
          'Population': 38518241
        },
        {
          'continent': 'Europe',
          'Country': 'Portugal',
          'LifeExpectancy': 78.098,
          'GDP': 20509.64777,
          'Population': 10642836
        },
        {
          'continent': 'Europe',
          'Country': 'Romania',
          'LifeExpectancy': 72.476,
          'GDP': 10808.47561,
          'Population': 22276056
        },
        {
          'continent': 'Europe',
          'Country': 'Serbia',
          'LifeExpectancy': 74.002,
          'GDP': 9786.534714,
          'Population': 10150265
        },
        {
          'continent': 'Europe',
          'Country': 'Slovak Republic',
          'LifeExpectancy': 74.663,
          'GDP': 18678.31435,
          'Population': 5447502
        },
        {
          'continent': 'Europe',
          'Country': 'Slovenia',
          'LifeExpectancy': 77.926,
          'GDP': 25768.25759,
          'Population': 2009245
        },
        {
          'continent': 'Europe',
          'Country': 'Spain',
          'LifeExpectancy': 80.941,
          'GDP': 28821.0637,
          'Population': 40448191
        },
        {
          'continent': 'Europe',
          'Country': 'Sweden',
          'LifeExpectancy': 80.884,
          'GDP': 33859.74835,
          'Population': 9031088
        },
        {
          'continent': 'Europe',
          'Country': 'Switzerland',
          'LifeExpectancy': 81.701,
          'GDP': 37506.41907,
          'Population': 7554661
        },
        {
          'continent': 'Europe',
          'Country': 'Turkey',
          'LifeExpectancy': 71.777,
          'GDP': 8458.276384,
          'Population': 71158647
        },
        {
          'continent': 'Europe',
          'Country': 'United Kingdom',
          'LifeExpectancy': 79.425,
          'GDP': 33203.26128,
          'Population': 60776238
        },
        {
          'continent': 'Oceania',
          'Country': 'Australia',
          'LifeExpectancy': 81.235,
          'GDP': 34435.36744,
          'Population': 20434176
        },
        {
          'continent': 'Oceania',
          'Country': 'New Zealand',
          'LifeExpectancy': 80.204,
          'GDP': 25185.00911,
          'Population': 4115771
        }
      ],
      // 漏斗
      funnelData: [
        { action: '浏览网站', pv: 50000 },
        { action: '放入购物车', pv: 35000 },
        { action: '生成订单', pv: 25000 },
        { action: '支付订单', pv: 15000 },
        { action: '完成交易', pv: 8000 }
      ],
      // 地图
      mapUserData: [
        { name: 'Russia', value: 86.8 },
        { name: 'China', value: 106.3 },
        { name: 'Japan', value: 94.7 },
        { name: 'Mongolia', value: 98 },
        { name: 'Canada', value: 98.4 },
        { name: 'United Kingdom', value: 97.2 },
        { name: 'United States of America', value: 98.3 },
        { name: 'Brazil', value: 96.7 },
        { name: 'Argentina', value: 95.8 },
        { name: 'Algeria', value: 101.3 },
        { name: 'France', value: 94.8 },
        { name: 'Germany', value: 96.6 },
        { name: 'Ukraine', value: 86.3 },
        { name: 'Egypt', value: 102.1 },
        { name: 'South Africa', value: 101.3 },
        { name: 'India', value: 107.6 },
        { name: 'Australia', value: 99.9 },
        { name: 'Saudi Arabia', value: 130.1 },
        { name: 'Afghanistan', value: 106.5 },
        { name: 'Kazakhstan', value: 93.4 },
        { name: 'Indonesia', value: 101.4 }
      ],

      // 关系图
      relationData: {
        name: 'root',
        children: [
          { name: '分类 1', value: 560 },
          { name: '分类 2', value: 500 },
          { name: '分类 3', value: 150 },
          { name: '分类 4', value: 140 },
          { name: '分类 5', value: 115 },
          { name: '分类 6', value: 95 },
          { name: '分类 7', value: 90 },
          { name: '分类 8', value: 75 },
          { name: '分类 9', value: 98 },
          { name: '分类 10', value: 60 },
          { name: '分类 11', value: 45 },
          { name: '分类 12', value: 40 },
          { name: '分类 13', value: 40 },
          { name: '分类 14', value: 35 },
          { name: '分类 15', value: 40 },
          { name: '分类 16', value: 40 },
          { name: '分类 17', value: 40 },
          { name: '分类 18', value: 30 },
          { name: '分类 19', value: 28 },
          { name: '分类 20', value: 16 }
        ]
      },

      // 双轴图
      dualAxisData: [
        { time: '10:10', call: 4, waiting: 2, people: 2 },
        { time: '10:15', call: 2, waiting: 6, people: 3 },
        { time: '10:20', call: 13, waiting: 2, people: 5 },
        { time: '10:25', call: 9, waiting: 9, people: 1 },
        { time: '10:30', call: 5, waiting: 2, people: 3 },
        { time: '10:35', call: 8, waiting: 2, people: 1 },
        { time: '10:40', call: 13, waiting: 1, people: 2 }
      ]

    }
  }
}
