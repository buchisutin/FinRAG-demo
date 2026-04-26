# RAG 前端 Demo

> 基于东方财富研报数据库的智能问答系统 - 纯静态前端演示

在线预览: https://fin-rag-demo.vercel.app

## 技术栈

- **HTML5 / CSS3 / ES6+ JavaScript**
- 零框架、零构建工具、零后端依赖
- 纯静态文件，开箱即用

## 页面结构

```
├── chat/
│   └── index.html      # 对话页面 - 支持多会话切换、Markdown 渲染
├── knowledge.html      # 知识管理 - 行业报告库、文档分块浏览
├── tracing.html        # 链路追踪 - 查询性能分析、缓存命中展示
├── mock_traces.json    # 链路追踪 mock 数据源
├── vercel.json         # Vercel 部署配置
├── README.md           # 项目说明
├── favicon.svg         # 网站图标
└── assets/
    ├── shell.js        # 侧边栏导航、全局 UI 组件
    ├── shell.css       # 全局样式
    └── api.js          # API 请求封装
```

## 快速开始

### 方式一：Python 内置服务器

```bash
cd rag_project_demo
python3 -m http.server 8080
```

访问 http://localhost:8080 （首页默认显示对话页面）

### 方式二：Vercel 部署（推荐）

```bash
vercel
```

或在 Vercel 控制台导入此仓库，自动读取 `vercel.json` 配置。

### 方式三：Nginx 部署（生产环境）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/rag_project_demo;
    index chat/index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    include /etc/nginx/mime.types;
}
```

## 功能说明

### 1. 对话页面 (`/chat/index.html`)

- 支持多会话管理（创建、重命名、删除）
- Markdown 格式回答渲染
- 样例问题快捷提问
- 新建对话展示欢迎页面

**Mock 数据**: 包含 3 个行业研报对话示例
- 计算机行业 Token 暴增趋势分析
- 3月挖掘机销量数据讨论
- 26年3月社零数据讨论

### 2. 知识管理 (`/knowledge.html`)

- 五大行业报告库（科技/医药/新能源/金融/消费）
- 文档列表查看、分块详情浏览
- 分块状态筛选（全部/已启用/已停用）
- 分块分页浏览

**Mock 数据**: 包含 5 篇行业研报文档
- 计算机行业周报-Token暴增推动估值重构
- 工程机械行业跟踪点评-3月挖机销量
- 商贸零售-26年3月社零数据如何
- 医药生物行业周报-分级诊疗体系
- 非银金融-资本市场聚焦

### 3. 链路追踪 (`/tracing.html`)

- 查询记录列表（支持搜索、筛选）
- 调用瀑布图可视化
- 缓存命中标识
- 完整回答内容展示
- 召回片段卡片展示

**数据源**: `mock_traces.json` - 编辑此文件即可更新追踪数据

## 数据管理

### 修改追踪数据

编辑 `mock_traces.json` 文件，格式如下：

```json
{
  "traces": [
    {
      "id": "tr_xxx",
      "question": "用户问题",
      "answer": "AI 回答内容（支持 Markdown）",
      "total_latency_ms": 7309,
      "cache_hit": true,
      "spans": [...]
    }
  ]
}
```

刷新页面即可生效，无需修改任何 HTML 代码。

### 修改对话数据

编辑 `chat/index.html` 中的 `MOCK_SESSIONS` 和 `MOCK_MESSAGES_MAP` 变量。

### 修改知识库数据

编辑 `knowledge.html` 中的 `MOCK_DOCS` 和 `MOCK_CHUNKS` 变量。

## Demo 模式说明

本 demo 为**纯前端展示版本**，所有 API 调用均已拦截：

- 点击删除、上传、编辑等按钮会提示"Demo 模式：此功能不可用"
- 用户发送消息时提示"Demo 暂不支持回复"
- 健康状态显示"Demo 模式"
- API Key 显示"Demo"

如需接入真实后端，请参考 `rag_project/` 目录中的完整版本。

## 注意事项

1. **浏览器兼容**: 建议使用 Chrome/Edge/Safari 等现代浏览器
2. **跨域问题**: 本地文件访问时建议使用 HTTP 服务器而非直接双击打开
3. **数据来源**: Demo 中的研报数据来自东方财富网站，仅用于技术演示和学习目的

## 文件体积

| 类型 | 大小 |
|------|------|
| HTML（3个页面） | ~280 KB |
| CSS | ~8 KB |
| JS | ~7 KB |
| JSON（mock数据） | ~20 KB |
| 总计 | ~315 KB |

## License

仅供内部演示与学习使用。
