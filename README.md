# 8090年代回忆杀

微信公众号 H5 单页应用，回顾80-90年代的经典歌星演员。

## 项目结构

```
8090-retro/
├── index.html    # 主页面
├── css/
│   └── style.css # 样式
├── js/
│   ├── data.js   # 明星数据
│   └── app.js    # 应用逻辑
└── README.md
```

## 功能

- [x] 明星列表（全部/歌手/演员）
- [x] 明星详情页
- [x] 专题合集（四大天王、港台女神等）
- [x] 收藏功能（本地存储）
- [x] 底部导航

## 使用

直接在浏览器打开 `index.html` 即可预览。

部署到公众号：
1. 购买域名和服务器
2. 上传代码到服务器
3. 在公众号后台配置业务域名

## 数据扩展

在 `js/data.js` 中添加更多明星：

```javascript
singers: [
  {
    id: 7,
    name: "明星名",
    title: "歌手/演员",
    avatar: "头像URL",
    birthday: "出生日期",
    career: ["作品1", "作品2"],
    intro: "简介"
  }
]
```

## 截图

![首页](https://picsum.photos/seed/preview/375/667)