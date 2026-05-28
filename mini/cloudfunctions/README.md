# 微信云开发配置指南

## 一、开通云开发

1. 打开微信开发者工具
2. 点击顶部工具栏的「云开发」按钮
3. 开通云开发服务（需要同意服务协议）
4. 创建环境，建议环境 ID 设置为：`startup-advisor-[yourid]`
5. 记录下环境 ID，后续配置需要用到

## 二、配置云开发环境

### 1. 修改 app.json
已在 app.json 中添加 `"cloud": true`，启用云开发能力

### 2. 初始化云开发
在 `app.js` 中添加云开发初始化代码：

```javascript
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'your-env-id', // 替换为你的云开发环境 ID
        traceUser: true,
      });
    }
    
    this.globalData = {};
  }
});
```

## 三、创建数据库集合

在微信开发者工具的云开发控制台中，创建以下数据库集合：

### 1. cases（商业案例）
```json
{
  "_id": "自动生成",
  "title": "案例标题",
  "category": "案例分类",
  "summary": "案例概述",
  "coverImage": "封面图片 URL",
  "images": ["图片数组"],
  "problems": ["问题数组"],
  "solutions": [
    {
      "icon": "图标",
      "title": "解决方案标题",
      "desc": "解决方案描述"
    }
  ],
  "stats": [
    {
      "name": "指标名称",
      "value": "指标值"
    }
  ],
  "tags": ["标签数组"],
  "sourceUrl": "来源链接",
  "sourceName": "来源名称",
  "rating": 4.9,
  "difficulty": "hard",
  "difficultyText": "困难",
  "createTime": "服务器时间",
  "updateTime": "服务器时间"
}
```

### 2. trends（行业趋势）
```json
{
  "_id": "自动生成",
  "title": "趋势标题",
  "industry": "所属行业",
  "icon": "图标 emoji",
  "color": "主题色",
  "time": "发布时间",
  "trend": "趋势类型 (hot/up/stable)",
  "trendText": "趋势文本",
  "summary": "趋势概述",
  "data": {
    "value": "数据值",
    "label": "数据标签"
  },
  "change": 增长率，
  "investors": "投资热度",
  "tags": ["标签数组"],
  "sourceUrl": "来源链接",
  "sourceName": "来源名称",
  "reasons": [
    {
      "title": "理由标题",
      "desc": "理由描述"
    }
  ],
  "forecast": {
    "marketSize": "市场规模",
    "growthRate": "增长率",
    "timeframe": "时间框架"
  },
  "companies": [
    {
      "icon": "图标",
      "name": "公司名称",
      "desc": "公司描述",
      "status": "leader/growing/potential"
    }
  ],
  "images": ["图片数组"],
  "createTime": "服务器时间",
  "updateTime": "服务器时间"
}
```

### 3. evaluateHistory（评估历史）
```json
{
  "_id": "自动生成",
  "userId": "用户 openid",
  "evaluateData": {
    "type": "评估类型",
    "content": "评估内容",
    "scores": {
      "businessModel": 商业模式分数，
      "market": 市场分数，
      "team": 团队分数，
      "product": 产品分数，
      "risk": 风险分数
    },
    "analysis": "AI 分析结果",
    "suggestions": "建议数组"
  },
  "createTime": "服务器时间",
  "updateTime": "服务器时间"
}
```

### 4. favorites（收藏）
```json
{
  "_id": "自动生成",
  "userId": "用户 openid",
  "targetType": "case/trend",
  "targetId": "目标 ID",
  "createTime": "服务器时间"
}
```

### 5. users（用户信息）
```json
{
  "_id": "自动生成",
  "openid": "用户 openid",
  "nickname": "昵称",
  "avatar": "头像 URL",
  "totalEvaluations": 总评估次数，
  "favorites": 收藏数量，
  "createTime": "服务器时间",
  "lastLoginTime": "最后登录时间"
}
```

## 四、部署云函数

1. 在微信开发者工具中，右键点击 `cloudfunctions` 目录
2. 选择「当前环境」
3. 右键点击 `cloudfunctions/index` 文件夹
4. 选择「上传并部署：云端安装依赖」
5. 等待部署完成

## 五、测试云函数

在开发者工具的云开发控制台中：
1. 进入「云函数」页面
2. 找到 `index` 云函数
3. 点击「测试」
4. 输入测试事件：
```json
{
  "action": "getCases",
  "data": {
    "page": 1,
    "pageSize": 10
  }
}
```
5. 查看返回结果

## 六、导入初始数据

使用云开发控制台的数据库功能，导入初始数据：

### 导入案例数据（cases 集合）
创建 6 个初始案例（参考 case-detail.js 中的数据）

### 导入趋势数据（trends 集合）
创建 10 个初始趋势（参考 trend-detail.js 中的数据）

## 七、修改前端代码调用云函数

### 示例：在首页调用云函数获取数据

```javascript
// pages/index/index.js
Page({
  data: {
    cases: [],
    trends: []
  },

  onLoad() {
    this.loadData();
  },

  async loadData() {
    try {
      // 获取案例
      const casesResult = await wx.cloud.callFunction({
        name: 'index',
        data: {
          action: 'getCases',
          data: { page: 1, pageSize: 6 }
        }
      });

      // 获取趋势
      const trendsResult = await wx.cloud.callFunction({
        name: 'index',
        data: {
          action: 'getTrends',
          data: { page: 1, pageSize: 6 }
        }
      });

      if (casesResult.result.success) {
        this.setData({ cases: casesResult.result.data });
      }

      if (trendsResult.result.success) {
        this.setData({ trends: trendsResult.result.data });
      }
    } catch (err) {
      console.error('加载数据失败:', err);
      // 降级处理：使用本地数据
      this.loadLocalData();
    }
  },

  loadLocalData() {
    // 本地数据作为备用
    console.log('使用本地数据');
  }
});
```

## 八、权限配置

在云开发控制台中，为每个集合配置权限：

### cases 和 trends 集合
- 所有用户可读
- 仅创建者可写
- 仅创建者可删

### evaluateHistory 和 favorites 集合
- 仅创建者可读
- 仅创建者可写
- 仅创建者可删

### users 集合
- 所有用户可读
- 仅创建者可写
- 仅创建者可删

## 九、费用说明

微信云开发免费额度：
- 数据库：2GB 存储，5GB 流量/月
- 云函数：10 万次调用/月
- 云存储：5GB 存储，10GB 流量/月

初期用户量不大时，完全可以使用免费额度。

## 十、注意事项

1. **环境 ID 配置**：确保 app.js 中配置正确的环境 ID
2. **数据库索引**：为常用查询字段创建索引提升性能
3. **云函数超时**：默认超时 3 秒，复杂操作需调整
4. **数据安全**：敏感操作（如 AI 评估）建议通过云函数调用
5. **降级方案**：保留本地数据作为网络故障时的备用

## 十一、后续优化建议

1. **CDN 加速**：图片等资源使用 CDN 加速
2. **缓存策略**：热点数据使用云缓存
3. **分页加载**：大数据集实现分页和懒加载
4. **数据统计**：添加访问统计、用户行为分析
5. **消息推送**：结合微信订阅消息推送新功能

## 联系方式

如有问题，请查看：
- 微信云开发官方文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- 云开发论坛：https://developers.weixin.qq.com/community/develop/mixflow