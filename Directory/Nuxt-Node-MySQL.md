##### User:

如何定制该前后端项目的目录结构

##### Assistant:

为你的 **Node.js + Express + TypeScript 后端（RESTful API 规范）、MySQL 数据库、Nuxt.js + TypeScript 前端** 项目定制一个清晰的目录结构非常重要。一个好的目录结构不仅能提高代码的可维护性，还能让团队协作更顺畅，同时便于 Cursor AI 理解项目上下文。以下是一个推荐的目录结构设计，结合你的技术栈和 `.cursorrules` 中的要求，附带每个目录/文件的用途说明。

---

### 项目根目录结构

假设项目名为 `my-fullstack-app`，采用 monorepo 结构（前后端代码放在一个仓库中），根目录结构如下：

```
my-fullstack-app/
├── backend/              # 后端代码 (Node.js + Express + TypeScript)
├── frontend/             # 前端代码 (Nuxt.js + TypeScript)
├── .cursorrules          # Cursor AI 自定义规则文件
├── .gitignore            # Git 忽略文件
├── README.md             # 项目说明
└── package.json          # 根级别依赖（如 monorepo 工具）
```

---

### 后端目录结构 (`backend/`)

后端基于 Node.js + Express + TypeScript，遵循 RESTful API 规范，连接 MySQL 数据库。

```
backend/
├── src/                  # 源代码目录
│   ├── config/           # 配置文件
│   │   ├── database.ts   # MySQL 连接配置 (如使用 mysql2/promise)
│   │   └── env.ts        # 环境变量解析 (如 dotenv)
│   ├── controllers/      # 处理 HTTP 请求逻辑
│   │   └── userController.ts  # 用户相关 endpoint（如注册、登录）
│   ├── middleware/       # 中间件
│   │   ├── auth.ts       # 认证中间件（如 JWT 验证）
│   │   └── error.ts      # 全局错误处理
│   ├── models/           # 数据库模型和类型定义
│   │   └── user.ts       # User 表结构和 TypeScript 接口
│   ├── routes/           # RESTful 路由定义
│   │   ├── index.ts      # 路由入口，聚合所有子路由
│   │   └── userRoutes.ts # 用户相关路由（/api/users）
│   ├── services/         # 业务逻辑层
│   │   └── userService.ts # 用户相关操作（如 CRUD）
│   ├── types/            # 全局类型定义
│   │   └── index.ts      # 通用类型（如 ApiResponse）
│   └── index.ts          # 应用入口（启动 Express 服务）
├── tests/                # 测试文件
│   └── user.test.ts      # 用户功能单元测试
├── .eslintrc.js          # ESLint 配置文件
├── .prettierrc           # Prettier 配置文件
├── package.json          # 后端依赖（如 express, mysql2, typescript）
├── tsconfig.json         # TypeScript 编译配置
└── nodemon.json          # 开发时热重载配置
```

#### 后端目录设计要点

- **分层架构**：`controllers` 处理请求，`services` 封装业务逻辑，`models` 定义数据结构，形成清晰的 MVC 分离。
- **类型安全**：`types/` 和 `models/` 存放 TypeScript 类型，确保强类型支持。
- **模块化路由**：`routes/` 分文件管理，便于扩展（如新增 `/api/orders`）。
- **配置独立**：`config/` 集中管理数据库和环境变量，便于切换环境（开发、生产）。

---

### 前端目录结构 (`frontend/`)

前端基于 Nuxt.js 3 + TypeScript，使用 Composition API 和 Pinia 状态管理。

```
frontend/
├── assets/               # 静态资源（如图片、字体）
│   └── images/           # 图片文件夹
├── components/           # 可复用组件
│   ├── common/           # 通用组件
│   │   └── Navbar.vue    # 导航栏组件
│   └── user/             # 特定功能组件
│       └── UserCard.vue  # 用户信息卡片
├── composables/          # Composition API 逻辑
│   └── useApi.ts         # 封装 API 调用（如 $fetch）
├── layouts/              # 页面布局
│   └── default.vue       # 默认布局
├── pages/                # 路由页面
│   ├── index.vue         # 首页
│   └── users/            # 用户相关页面
│       ├── index.vue     # 用户列表
│       └── [id].vue      # 用户详情（动态路由）
├── plugins/              # Nuxt 插件
│   └── pinia.ts          # 配置 Pinia
├── public/               # 静态文件（直接访问）
│   └── favicon.ico       # 网站图标
├── stores/               # Pinia 状态管理
│   └── user.ts           # 用户状态（如登录信息）
├── utils/                # 工具函数
│   └── formatDate.ts     # 日期格式化工具
├── .eslintrc.js          # ESLint 配置文件
├── .prettierrc           # Prettier 配置文件
├── nuxt.config.ts        # Nuxt 配置文件
├── package.json          # 前端依赖（如 nuxt, pinia）
└── tsconfig.json         # TypeScript 配置
```

#### 前端目录设计要点

- **Nuxt 约定式结构**：`pages/` 自动生成路由，`layouts/` 定义页面布局，符合 Nuxt 的设计哲学。
- **组件模块化**：`components/` 按功能分组（如 `common/` 和 `user/`），提高复用性。
- **状态管理**：`stores/` 使用 Pinia，保持状态逻辑集中。
- **API 封装**：`composables/` 提供类型安全的 API 调用，便于复用和维护。

---

### 如何实现和使用这个目录结构

#### 1. **初始化项目**

- **后端**：
  1. 在 `backend/` 运行 `npm init -y` 创建 `package.json`。
  2. 安装依赖：`npm install express mysql2 typescript @types/express @types/node ts-node nodemon`.
  3. 配置 `tsconfig.json` 和 `nodemon.json`，创建 `src/index.ts` 启动 Express。
- **前端**：
  1. 在 `frontend/` 运行 `npx nuxi init .` 初始化 Nuxt 项目。
  2. 安装依赖：`npm install @pinia/nuxt`.
  3. 配置 `nuxt.config.ts` 和 TypeScript 支持。

#### 2. **创建目录和文件**

- 根据上述结构手动创建文件夹和文件，或者用脚本生成。例如：
  ```bash
  mkdir -p backend/src/{config,controllers,middleware,models,routes,services,types,tests}
  mkdir -p frontend/{assets/images,components/common,components/user,composables,layouts,pages/users,plugins,public,stores,utils}
  ```
- 在对应目录下添加初始文件（如 `backend/src/index.ts` 和 `frontend/pages/index.vue`）。

#### 3. **更新 `.cursorrules`**

- 将目录结构信息添加到 `.cursorrules` 中，确保 Cursor AI 理解你的项目布局。例如：
  ```
  - 后端文件结构参考：@backend/src/
  - 前端文件结构参考：@frontend/
  ```

#### 4. **测试目录结构**

- 在 Cursor 的 Composer 或 Chat 中尝试生成代码：
  - 后端：输入“创建一个用户注册 API”，检查是否生成在 `backend/src/controllers/` 和 `backend/src/routes/`。
  - 前端：输入“创建一个用户列表页面”，检查是否生成在 `frontend/pages/users/index.vue`。

---

### 优化建议

- **环境分离**：在 `backend/config/env.ts` 和 `frontend/nuxt.config.ts` 中支持 `development` 和 `production` 环境切换。
- **自动化脚本**：编写一个 `setup.sh` 脚本快速生成目录结构和初始文件。
- **一致性检查**：定期用 ESLint 和 Prettier 格式化代码，确保团队风格统一。

这个目录结构结合你的技术栈，既满足功能需求，又便于扩展和维护。如果需要更具体的实现代码（例如 `userController.ts` 或 `useApi.ts`），可以告诉我，我会进一步帮你完善！
