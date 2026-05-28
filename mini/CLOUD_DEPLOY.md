# 云开发快速部署指南

## ✅ 已完成的工作

1. ✅ 在 `app.json` 中添加了 `"cloud": true` 配置
2. ✅ 创建了云函数目录和基础代码
3. ✅ 创建了数据库初始化数据文件

## 📋 接下来需要做的步骤

### 第一步：开通云开发（5 分钟）

1. 打开**微信开发者工具**
2. 点击顶部工具栏的**「云开发」**按钮
3. 同意服务协议，开通云开发
4. 创建环境，建议名称：`创业体验官`
5. **记录环境 ID**（格式类似：`cloud1-xxx-xxx`）

### 第二步：配置环境 ID（2 分钟）

打开 `app.js` 文件，找到云开发初始化代码，将环境 ID 替换为你刚才记录的环境 ID：

```javascript
wx.cloud.init({
  env: 'your-env-id',  // 替换为你的环境 ID
  traceUser: true,
});
```

### 第三步：上传云函数（3 分钟）

1. 在微信开发者工具中，找到 `cloudfunctions` 文件夹
2. 右键点击 `cloudfunctions`，选择**「当前环境」**，选择你创建的环境
3. 右键点击 `cloudfunctions/index` 文件夹
4. 选择**「上传并部署：云端安装依赖」**
5. 等待上传完成（约 2-3 分钟）

### 第四步：创建数据库集合（5 分钟）

1. 点击顶部工具栏的**「云开发」**按钮
2. 进入**「数据库」**标签页
3. 点击**「+」**创建集合，依次创建以下集合：
   - `cases`（商业案例）
   - `trends`（行业趋势）
   - `evaluateHistory`（评估历史）
   - `favorites`（收藏）
   - `users`（用户信息）

### 第五步：导入初始数据（10 分钟）

1. 在云开发控制台的数据库页面
2. 点击 `cases` 集合
3. 点击**「导入」**按钮
4. 选择 `cloudfunctions/data/cases.json` 文件
5. 重复上述步骤，导入 `trends.json` 到 `trends` 集合

### 第六步：配置数据库权限（3 分钟）

为每个集合配置权限：

**cases 和 trends 集合：**
```json
{
  "read": true,
  "write": "auth.openid == doc._openid"
}
```

**evaluateHistory、favorites、users 集合：**
```json
{
  "read": "auth.openid == doc._openid",
  "write": "auth.openid == doc._openid"
}
```

### 第七步：测试云函数（2 分钟）

1. 在云开发控制台，进入**「云函数」**页面
2. 找到 `index` 云函数
3. 点击**「测试」**
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
5. 查看返回结果，如果 `success: true` 表示成功

## 🎉 完成！

完成以上步骤后，你的小程序就拥有了完整的后端能力：

- ✅ 云数据库：存储案例、趋势、用户数据
- ✅ 云函数：处理业务逻辑
- ✅ 云存储：存储图片等资源
- ✅ 用户系统：基于微信 openid 的用户认证

## 📊 数据库集合说明

| 集合名 | 用途 | 主要字段 |
|--------|------|----------|
| cases | 商业案例 | title, category, summary, images, solutions |
| trends | 行业趋势 | title, industry, summary, forecast, companies |
| evaluateHistory | AI 评估历史 | userId, evaluateData, createTime |
| favorites | 用户收藏 | userId, targetType, targetId |
| users | 用户信息 | openid, nickname, avatar, totalEvaluations |

## 🔧 常用操作

### 查看数据库内容
云开发控制台 → 数据库 → 选择集合 → 查看数据

### 更新云函数
修改 `cloudfunctions/index.js` 后，右键重新上传部署

### 导出数据
云开发控制台 → 数据库 → 选择集合 → 导出

### 监控使用情况
云开发控制台 → 统计 → 查看资源使用情况

## ⚠️ 注意事项

1. **环境 ID 不要搞错**：确保 app.js 中的环境 ID 与实际创建的一致
2. **数据库权限**：一定要正确配置权限，否则无法读写
3. **云函数超时**：默认超时 3 秒，复杂操作需要在云函数中调整
4. **免费额度**：初期使用免费额度足够，注意监控用量

## 💰 费用说明

微信云开发免费额度（个人版）：
- 数据库：2GB 存储 + 5GB/月 流量
- 云函数：10 万次调用/月
- 云存储：5GB 存储 + 10GB/月 流量

对于小型项目和演示，免费额度完全够用！

## 📚 参考资料

- [微信云开发官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [云开发数据库指南](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html)
- [云函数开发指南](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html)

## 🆘 遇到问题？

常见问题排查：
1. 云函数调用失败 → 检查环境 ID 是否正确
2. 数据库读写失败 → 检查集合权限配置
3. 图片无法显示 → 检查云存储文件 ID
4. 超过免费额度 → 升级云开发版本