import type { CityDetail, Destination, TravelTipSection } from "~/types/destinations"

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: '上海',
    cover: '/images/destinations/shanghai.jpg',
  },
  {
    id: 2,
    name: '北京',
    cover: '/images/destinations/forbidden-city.jpg',
  },
  {
    id: 3,
    name: '广州',
    cover: '/images/destinations/guangzhou.jpg',
  },
  {
    id: 4,
    name: '香港',
    cover: '/images/destinations/hongkong.jpg',
  },
  {
    id: 5,
    name: '成都',
    cover: '/images/destinations/chengdu.jpg',
  },
  {
    id: 6,
    name: '西安',
    cover: '/images/destinations/xian.jpg',
  },
  {
    id: 7,
    name: '深圳',
    cover: '/images/destinations/shenzhen.jpg',
  },
  {
    id: 8,
    name: '南京',
    cover: '/images/destinations/nanjing.jpg',
  },
  {
    id: 9,
    name: '青岛',
    cover: '/images/destinations/qingdao.jpg',
  },
  {
    id: 10,
    name: '重庆',
    cover: '/images/destinations/chongqing.jpg',
  },
  {
    id: 11,
    name: '张家界',
    cover: '/images/destinations/zhangjiajie.jpg',
  },
  {
    id: 12,
    name: '桂林',
    cover: '/images/destinations/guilin.jpg',
  },
  {
    id: 13,
    name: '澳门',
    cover: '/images/destinations/macau.jpg',
  },
]

export const travelTips: TravelTipSection[] = [
  {
    title: "最佳旅行时间",
    content: [
      {
        content: [
          "上海的最佳旅游时间是春季（3-5月）或秋季（9-11月）：",
          "春季可欣赏樱花和适宜的温度，非常适合户外活动",
          "秋季正值大闸蟹季节，舒适天气适合观光",
          "夏季（6-8月）炎热潮湿且多雨",
          "冬季（12-2月）阴冷潮湿，但节日氛围浓厚"
        ]
      }
    ]
  },
  {
    title: "交通出行",
    content: [
      {
        content: [
          "上海拥有完善高效的公共交通系统：",
          "地铁：覆盖广泛的地铁网络是最便捷的出行方式",
          "出租车：随处可见且价格相对合理",
          "公交：线路网络覆盖全市",
          "轮渡：横跨黄浦江的风景航线",
          "步行：市中心许多景点均可步行到达"
        ]
      }
    ]
  },
  {
    title: "必游景点",
    content: [
      {
        title: "外滩",
        content: "外滩是上海最具标志性的地标，黄浦江畔汇聚了宏伟的殖民时期建筑群。清晨锻炼或夜晚欣赏浦东天际线灯光秀时尤为壮观。"
      },
      {
        title: "豫园",
        content: "这座明代古典园林展现了传统亭台楼阁、假山池塘的雅致，周边集市街区在历史建筑群中提供本地小吃和纪念品。"
      },
      {
        title: "浦东天际线",
        content: [
          "观赏城市全景的绝佳观景台：",
          "上海中心大厦（世界第二高楼）",
          "东方明珠电视塔（上海标志性建筑）",
          "上海环球金融中心（开瓶器造型大厦）"
        ]
      },
      {
        title: "法租界旧址",
        content: [
          "这个历史街区特色包括：",
          "田子坊：艺术创意园区，布满文艺小店和咖啡馆",
          "新天地：石库门建筑群中的现代购物餐饮区",
          "武康路：布满历史保护建筑的著名街道"
        ]
      }
    ]
  },
  {
    title: "本帮美食",
    content: [
      {
        content: "上海菜融合传统风味与现代创新："
      }
    ]
  },
  {
    title: "必尝美食",
    content: [
      { content: "小笼包：灌汤蒸饺" },
      { content: "生煎包：煎制肉馅包子" },
      { content: "大闸蟹：秋季时令美味" },
      { content: "红烧肉：甜咸适中的焖烧五花肉" }
    ]
  },
  {
    title: "知名餐厅",
    content: [
      { content: "南翔馒头店：传统小笼包名店" },
      { content: "佳家汤包：以现做汤包闻名" },
      { content: "老吉士：地道本帮家常菜" },
      { content: "鼎泰丰：品质稳定的知名连锁点心店" }
    ]
  },
  {
    title: "美食区域",
    content: [
      { content: "豫园商圈：传统上海小吃" },
      { content: "新天地：现代创意本帮菜" },
      { content: "法租界旧址：国际餐厅与咖啡馆" },
      { content: "南京路：本地与国际美食混合" }
    ]
  },
  {
    title: "购物指南",
    content: [
      {
        title: "热门购物区", content: [
          "南京路：中国第一商业街",
          "淮海路：奢侈品专卖店",
          "田子坊：手工艺品和特色纪念品",
          "正大广场：浦东现代购物中心",
          "国金中心商场：陆家嘴高端商场"
        ]
      },
      {
        title: "传统市场", content: [
          "豫园商城：传统工艺品和纪念品",
          "七浦路服装市场：服装批发集散地",
          "东台路古玩市场：古董收藏品"
        ]
      }
    ]
  },
  {
    title: "到达方式",
    content: [
      {
        content: [
          "上海交通枢纽包括：",
          "浦东国际机场：主要国际航班",
          "虹桥国际机场：国内及区域航班",
          "高铁：连接中国主要城市",
          "机场交通方式：",
          "磁悬浮列车（浦东机场）",
          "地铁线路",
          "机场大巴",
          "出租车"
        ]
      }
    ]
  },
  {
    title: "安全提示",
    content: [
      { content: "在拥挤场所注意保管贵重物品" },
      { content: "选择正规出租车或网约车" },
      { content: "在热门旅游区保持警惕" },
      {
        content: [
          "备存紧急电话：",
          "报警：110",
          "急救：120",
          "旅游服务热线：12301"
        ]
      }
    ]
  },
  {
    title: "精彩推荐",
    content: [
      { content: "夜游外滩欣赏璀璨夜景" },
      { content: "探访豫园及周边传统集市" },
      { content: "登高观景台俯瞰城市全景" },
      { content: "漫步法租界历史街区" },
      { content: "体验上海特色美食" },
      { content: "乘坐黄浦江游船" },
      { content: "错峰游览热门景点体验更佳" }
    ]
  }
]

const CITY_DETAILS: CityDetail[] = [
  {
    id: 1,
    name: '上海',
    cover: '/images/destinations/shanghai.jpg',
    description: `作为中国最大的城市和全球金融中心，上海展现出东西方文化交融的迷人魅力，历史悠久的殖民建筑与沿着标志性黄浦江拔地而起的未来派摩天大楼交相辉映。上海位于中国东部中部沿海地区，地处长江入海口，与东海相接。城市拥有两个主要机场：上海浦东国际机场和上海虹桥国际机场。上海以其独特的天际线而闻名，包括东方明珠塔和上海中心大厦；还有具有历史意义的外滩滨水区，以及拥有林荫大道和装饰艺术风格建筑的迷人法租界。`,
    posts: [
      {
        id: 99,
        title: '上海外滩',
        description: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
        cover: '/images/destinations/shanghai.jpg',
        content: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
        author: {
          id: '1',
          avatar: '/images/avatars/user1.png',
          name: '张三',
        },
        images: [
          '/images/posts/shanghai/bg1.jpg',
          '/images/posts/shanghai/bg2.jpg',
        ],
        likes: 100,
        comments: [
          {
            id: '1',
            author: {
              id: '1',
              avatar: '/images/avatars/user1.png',
              name: '张三',
            },
            content: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
            createdAt: '2024-01-01',
          }
        ],
        tags: ['上海', '外滩', '黄浦江', '东方明珠'],
        category: '上海',
        location: '上海',
        createdAt: '2024-01-01',
      }
    ],
    attractions: [
      {
        id: 1,
        name: '外滩',
        cover: '/images/destinations/shanghai/waitan.jpg',
      },
      {
        id: 2,
        name: '陆家嘴',
        cover: '/images/destinations/shanghai/lujiazui.jpg',
      },
      {
        id: 3,
        name: '东方明珠',
        cover: '/images/destinations/shanghai/dongfangmingzhu.jpg',
      },
      {
        id: 4,
        name: '豫园',
        cover: '/images/destinations/shanghai/yuyuan.jpg',
      },
      {
        id: 5,
        name: '迪士尼乐园',
        cover: '/images/destinations/shanghai/shanghaidisney.jpg',
      },
      {
        id: 6,
        name: '南京路步行街',
        cover: '/images/destinations/shanghai/nanjinglu.jpg',
      },

    ],
    travelTips: travelTips,
  }
]



export const useDestinationStore = defineStore('destination', () => {
  const destinations = ref(DESTINATIONS)
  const cityDetails = ref(CITY_DETAILS)

  return {
    destinations,
    cityDetails,
  }
})
