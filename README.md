# VentureAgent
VentureAgent is an AI-powered business learning platform designed for entrepreneurs and business enthusiasts. Leveraging cutting-edge AI technology from DeepSeek, it offers comprehensive tools to evaluate business plans, analyze market trends, and explore real-world case studies.
# 创业体验官 - Agent驱动的商业学习平台

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🌟 项目简介

创业体验官是一个基于微信小程序的AI驱动商业学习平台，为创业者和商业爱好者提供以下核心功能：

- 🤖 **AI智能评估** - 上传商业计划书，获得专业AI评估报告
- 📚 **商业案例库** - 海量实战案例深度分析
- 📈 **行业趋势** - 实时洞察市场动态
- 🔗 **知识图谱** - 交互式商业知识展示

## 📁 文件结构

```
xieyu_task/
├── mini/                    # 微信小程序前端代码
│   ├── app.js               # 小程序入口文件
│   ├── app.json             # 小程序配置文件（页面路由等）
│   ├── app.wxss             # 全局样式文件
│   ├── pages/               # 页面目录
│   │   ├── index/           # 首页（功能入口）
│   │   ├── evaluate/        # AI评估页面（核心功能）
│   │   ├── cases/           # 商业案例库列表
│   │   ├── case-detail/     # 案例详情页
│   │   ├── help/            # 帮助与联系页面
│   │   └── ...              # 其他页面
│   ├── components/          # 自定义组件
│   └── utils/               # 工具函数库
├── mini-server/             # Node.js后端服务
│   ├── server.js            # Express服务器入口
│   ├── package.json         # 依赖配置文件
│   └── node_modules/        # Node.js依赖（无需上传）
└── README.md                # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- 微信开发者工具（小程序开发）

### 后端部署

```bash
# 进入后端目录
cd mini-server

# 安装依赖
npm install

# 配置DeepSeek API Key（必须）
export DEEPSEEK_API_KEY="your_api_key_here"

# 启动服务（默认端口3000）
npm start
```

### 前端配置

1. 打开微信开发者工具
2. 选择「导入项目」，导入 `mini/` 目录
3. 在 `mini/utils/api.js` 中配置后端接口地址

## 🔑 DeepSeek API 获取指南

### 步骤1：注册账号

1. 访问 [DeepSeek Platform](https://platform.deepseek.com/)
2. 注册账号并完成邮箱验证

### 步骤2：创建API密钥

1. 登录后进入控制台
2. 点击左侧菜单「API Keys」
3. 点击「Create New API Key」
4. **复制生成的API密钥**（仅显示一次，请妥善保存）

### 步骤3：配置密钥

**方式一：环境变量（推荐）**

```bash
# Linux/Mac
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Windows PowerShell
$env:DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**方式二：直接修改代码**

编辑 `mini-server/server.js` 文件：

```javascript
const DEEPSEEK_API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 替换为你的API密钥
```

## 📡 API接口说明

### AI评估接口

**POST** `/api/evaluate`

请求参数：
```json
{
  "type": "business_plan",
  "content": "你的商业计划书内容..."
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 评估类型（business_plan/investment/market/risk） |
| content | string | 待评估内容 |

响应示例：
```json
{
  "overallScore": 85,
  "grade": "A",
  "businessModelScore": 90,
  "marketPotentialScore": 80,
  "teamCapabilityScore": 85,
  "riskLevelScore": 82,
  "advantages": ["商业模式创新", "市场定位清晰"],
  "risks": ["资金压力", "竞争激烈"],
  "suggestions": ["建议拓展融资渠道", "加强差异化竞争"]
}
```

## ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 🤖 AI商业评估 | 基于DeepSeek大模型的智能商业计划书评估 |
| 📚 案例库 | 精选商业案例，支持搜索和分类浏览 |
| 📈 行业趋势 | 实时市场动态和趋势分析 |
| 🎨 精美UI | 现代化设计，流畅的用户体验 |
| ⚡ 快速响应 | 优化的加载动画和状态反馈 |

## ⚠️ 注意事项

1. **API密钥安全**：DeepSeek API密钥属于敏感信息，**切勿提交到版本控制**
2. **环境变量优先**：推荐使用环境变量方式配置密钥
3. **网络要求**：API调用需要稳定的网络连接
4. **调用限制**：DeepSeek API有调用次数和速率限制，请合理使用
5. **node_modules**：无需上传到GitHub，已包含在 `.gitignore`

## 📄 许可证

MIT License

## 📬 联系方式

邮箱：CHEN_zishen@outlook.com

---

**欢迎Star支持！⭐**
