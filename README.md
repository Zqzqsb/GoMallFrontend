# GoMall Frontend

GoMall 是一个现代化的电商购物平台前端项目，基于 Vue 3 + TypeScript + Vite 构建。

## 🚀 技术栈

### 前端技术
- Vue 3：渐进式 JavaScript 框架
- Vuetify：材料设计组件框架
- TailwindCSS：原子化 CSS 框架
- Ant Design Vue：企业级 UI 组件库
- Vite：下一代前端构建工具
- TypeScript：类型安全的 JavaScript

### 后端技术
- Go：高性能编程语言
- CWGO：微服务快速开发框架
- Kitex：高性能 RPC 框架
- Hertz：HTTP 框架引擎
- Consul：服务发现和配置
- Casbin：权限访问控制框架

### 服务治理
- OpenTelemetry：分布式追踪系统
- Prometheus：监控告警平台
- Sentinel：流量控制组件
- ELK Stack：日志分析平台
- Kong Gateway：API 网关服务
- Apollo：配置中心服务

## 🛠️ 开发环境要求

- Node.js >= 16
- pnpm >= 8

## 📦 安装和运行

1. 克隆项目
```bash
git clone https://github.com/yourusername/GoMallFrontend.git
cd GoMallFrontend
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
pnpm dev
```

4. 构建生产版本
```bash
pnpm build
```

## 🌟 主要功能

- 用户认证
  - 登录/注册
  - 密码重置
  - 会话管理

- 商品管理
  - 商品列表
  - 商品详情
  - 商品分类
  - 商品搜索

- 购物车
  - 添加/删除商品
  - 数量调整
  - 价格计算

- 订单管理
  - 订单创建
  - 订单状态跟踪
  - 订单历史

- 用户中心
  - 个人信息管理
  - 收货地址管理
  - 订单历史查看

## 📝 项目结构

```
src/
├── apis/          # API 接口定义
├── assets/        # 静态资源
├── components/    # 通用组件
├── composables/   # 组合式函数
├── layout/        # 布局组件
├── pages/         # 页面组件
├── router/        # 路由配置
├── stores/        # 状态管理
├── styles/        # 全局样式
└── utils/         # 工具函数
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情
