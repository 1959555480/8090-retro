// 明星数据
const starsData = {
  // 歌手
  singers: [
    {
      id: 1,
      name: "张国荣",
      title: "歌手/演员",
      avatar: "https://picsum.photos/seed/zgr/300/300",
      birthday: "1956年9月12日",
      career: ["《风继续吹》", "《Monica》", "《当年情》", "《霸王别姬》"],
      intro: "香港乐坛天皇巨星，影视歌三栖发展的传奇人物。他的演唱风格独特，情感细腻，代表了80年代香港流行文化的巅峰。"
    },
    {
      id: 2,
      name: "梅艳芳",
      title: "歌手/演员",
      avatar: "https://picsum.photos/seed/myf/300/300",
      birthday: "1963年10月10日",
      career: ["《坏女孩》", "《女人花》", "《亲密爱人》", "《胭脂扣》"],
      intro: "香港的女儿，百变天后。她的歌声深情动听，台风多变，是80年代香港乐坛最具代表性的女歌手之一。"
    },
    {
      id: 3,
      name: "谭咏麟",
      title: "歌手",
      avatar: "https://picsum.photos/seed/tql/300/300",
      birthday: "1950年8月23日",
      career: ["《爱在深秋》", "《雾之恋》", "《爱情陷阱》", "《水中花》"],
      intro: "永远25岁的谭咏麟是香港乐坛的常青树，80年代与张国荣齐名，开启了\"谭张争霸\"的时代。"
    },
    {
      id: 4,
      name: "Beyond",
      title: "乐队",
      avatar: "https://picsum.photos/seed/beyond/300/300",
      birthday: "1983年成军",
      career: ["《光辉岁月》", "《海阔天空》", "《真的爱你》", "《大地》"],
      intro: "香港最成功的摇滚乐队，黄家驹用音乐诠释了理想与坚持，影响了整整一代人。"
    },
    {
      id: 5,
      name: "王菲",
      title: "歌手",
      avatar: "https://picsum.photos/seed/wf/300/300",
      birthday: "1969年8月8日",
      career: ["《容易受伤的女人》", "《红豆》", "《执迷不悔》", "《天空》"],
      intro: "华语乐坛的天后，她的嗓音独特，风格多变，是90年代最具影响力的女歌手。"
    },
    {
      id: 6,
      name: "张学友",
      title: "歌手",
      avatar: "https://picsum.photos/seed/zxy/300/300",
      birthday: "1961年7月10日",
      career: ["《吻别》", "《祝福》", "《回头太难》", "《情网》"],
      intro: "歌神张学友的演唱会场场爆满，他的歌声温暖深情，是80年代末至90年代最畅销的歌手。"
    }
  ],
  // 演员
  actors: [
    {
      id: 7,
      name: "周润发",
      title: "演员",
      avatar: "https://picsum.photos/seed/zyf/300/300",
      birthday: "1955年5月18日",
      career: ["《上海滩》", "《英雄本色》", "《赌神》", "《卧虎藏龙》"],
      intro: "香港影坛的传奇，小马哥、赌神高进等角色深入人心。他的表演大气自然，是华语电影的标志性人物。"
    },
    {
      id: 8,
      name: "成龙",
      title: "演员/导演",
      avatar: "https://picsum.photos/seed/cl/300/300",
      birthday: "1954年4月7日",
      career: ["《蛇形刁手》", "《醉拳》", "《警察故事》", "《红番区》"],
      intro: "国际巨星，成龙式功夫喜剧开创了华语电影的新时代。他的敬业精神和对电影的热爱让人敬佩。"
    },
    {
      id: 9,
      name: "周星驰",
      title: "演员/导演",
      avatar: "https://picsum.photos/seed/zxc/300/300",
      birthday: "1962年6月22日",
      career: ["《大话西游》", "《喜剧之王》", "《少林足球》", "《功夫》"],
      intro: "无厘头喜剧的开创者，周星驰用独特的喜剧风格创造了华语电影的经典，他的电影是80后的集体回忆。"
    },
    {
      id: 10,
      name: "刘德华",
      title: "歌手/演员",
      avatar: "https://picsum.photos/seed/ldh/300/300",
      birthday: "1961年9月27日",
      career: ["《忘情水》", "《天若有情》", "《无间道》", "《桃姐》"],
      intro: "娱乐圈的常青树，刘德华几十年如一日的努力让他在歌坛和影坛都取得了巨大成功。"
    },
    {
      id: 11,
      name: "梁朝伟",
      title: "演员",
      avatar: "https://picsum.photos/seed/lcw/300/300",
      birthday: "1962年6月27日",
      career: ["《无间道》", "《花样年华》", "《重庆森林》", "《一代宗师》"],
      intro: "华语影坛的演技之神，梁朝伟的眼神就是最好的表演。他的每个角色都深入人心。"
    },
    {
      id: 12,
      name: "林青霞",
      title: "演员",
      avatar: "https://picsum.photos/seed/lqx/300/300",
      birthday: "1954年11月3日",
      career: ["《笑傲江湖》", "《东方不败》", "《重庆森林》", "《滚滚红尘》"],
      intro: "台湾第一美人，林青霞的美跨越性别，她的武侠形象英姿飒爽，是80年代最具魅力的女演员。"
    }
  ],
  // 专题
  topics: [
    {
      id: 1,
      title: "四大天王",
      desc: "刘德华、张学友、郭富城、黎明，统治90年代香港乐坛的传奇",
      stars: [4, 6, 10, 11]
    },
    {
      id: 2,
      title: "港台女神",
      desc: "林青霞、王祖贤、张曼玉、邱淑贞，风华绝代的难忘容颜",
      stars: [12, 7, 8, 9]
    },
    {
      id: 3,
      title: "80年代巨星",
      desc: "张国荣、梅艳芳、谭咏麟，那个黄金年代的记忆",
      stars: [1, 2, 3]
    }
  ]
};

// 收藏功能
let favorites = JSON.parse(localStorage.getItem('retro-favorites') || '[]');

// 导出数据
if (typeof module !== 'undefined') module.exports = { starsData, favorites };