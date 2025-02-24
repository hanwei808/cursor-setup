##### User:

自定义 AI 行为，如何定制一份详细的 Node.js Express + TypeScript 作为后端、使用 RESTFull API 规范、MySQL 作为数据库、Nuxt.js + TypeScript 作为前端的规则 .cursorrules

##### Assistant:

以下是一个详细的 `.cursorrules` 文件示例，用于定制 Cursor AI 的行为，针对你的需求：**Node.js + Express + TypeScript 后端（RESTful API 规范）、MySQL 数据库、Nuxt.js + TypeScript 前端**。这份规则将指导 AI 生成符合项目技术栈、编码规范和最佳实践的代码。注释会解释每部分的用途，实际文件中只需保留规则内容本身。

### `.cursorrules` 文件内容

```
# 项目技术栈和总体原则
- 使用 Node.js 和 Express 构建后端，遵循 RESTful API 规范
- 后端代码一律使用 TypeScript，严格类型定义
- 使用 MySQL 作为数据库，通过 mysql2/promise 库进行异步操作
- 前端使用 Nuxt.js 3 和 TypeScript 开发，优先使用 Composition API
- 所有代码保持模块化、可维护性和高可读性

# 后端开发规则 (Node.js + Express + TypeScript)
- 文件结构：
  - controllers/：处理 HTTP 请求逻辑
  - services/：封装业务逻辑
  - models/：定义数据库模型和类型
  - routes/：定义 RESTful 路由
  - middleware/：处理认证、错误等中间件
- 使用接口（interface）定义请求和响应类型，例如：
  interface UserRequest { id: number; name: string; email: string }
- RESTful API 规范：
  - GET /api/resource：获取资源列表
  - GET /api/resource/:id：获取单个资源
  - POST /api/resource：创建资源
  - PUT /api/resource/:id：更新资源
  - DELETE /api/resource/:id：删除资源
- 错误处理：
  - 使用 try-catch 捕获异步操作中的错误
  - 返回标准化的 JSON 错误响应，例如：
    { "error": { "message": "Resource not found", "code": 404 } }
- MySQL 操作：
  - 使用参数化查询防止 SQL 注入
  - 示例：const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id])
  - 返回类型定义为 Promise<RowDataPacket[]>

# 数据库交互规则
- 表名使用复数形式（如 users、orders）
- 字段名使用 snake_case（如 created_at、user_id）
- 每个表必须有自增主键 id 和时间戳字段 created_at, updated_at
- 使用 TypeScript 类型映射数据库表结构，例如：
  interface User { id: number; name: string; email: string; created_at: Date }

# 前端开发规则 (Nuxt.js + TypeScript)
- 文件结构：
  - pages/：路由页面
  - components/：可复用组件
  - composables/：Composition API 逻辑
  - stores/：Pinia 状态管理
- 使用 Composition API 而不是 Options API
- 组件命名使用 PascalCase（如 MyComponent.vue）
- API 调用：
  - 使用 $fetch 或 useFetch 发起请求
  - 定义类型安全的 API 返回值，例如：
    interface ApiResponse<T> { data: T; error?: string }
- 状态管理：
  - 使用 Pinia，_store 文件夹中定义 store
  - 示例：
    export const useUserStore = defineStore('user', () => {
      const user = ref<User | null>(null)
      return { user }
    })

# 编码风格和最佳实践
- 命名规则：
  - 变量和函数使用 camelCase（如 getUserData）
  - 类型和接口使用 PascalCase（如 UserResponse）
- 避免使用 any 类型，始终提供具体类型
- 函数返回类型必须显式声明，例如：
  async function getUser(id: number): Promise<User> { ... }
- 日志使用 console.log，仅在开发环境中保留
- 提交信息简洁明了，例如：feat: add user authentication endpoint

# 性能和安全
- 后端：
  - 使用 express-rate-limit 限制请求频率
  - 对用户输入进行验证（推荐 Joi 或 Zod）
- 前端：
  - 图片使用 lazy loading（<img loading="lazy">）
  - 避免在客户端暴露敏感数据（如 API 密钥）
- MySQL：
  - 为频繁查询的字段添加索引
  - 避免 SELECT *，只查询需要的字段

# 示例文件引用
- 参考现有文件：
  - @backend/src/controllers/userController.ts
  - @frontend/pages/index.vue
```

### 如何使用这份 `.cursorrules`

1. **创建文件**：在项目根目录下创建 `.cursorrules` 文件（注意文件名以点开头）。
2. **粘贴内容**：将上述文本（去掉注释，仅保留规则部分）粘贴进去。
3. **保存并测试**：保存后，Cursor AI 会自动加载这些规则。尝试在 Composer 或 Chat 中生成代码（如“创建一个用户注册 API”），观察是否符合规则。

### 规则说明

- **技术栈明确**：指定了后端和前端的具体框架和语言，确保 AI 输出匹配。
- **RESTful 规范**：强制 API 设计遵循标准，便于前后端协作。
- **类型安全**：强调 TypeScript 的使用，减少运行时错误。
- **文件结构**：为前后端定义清晰的目录结构，保持一致性。
- **数据库交互**：规范 MySQL 操作，确保安全性和性能。
- **最佳实践**：涵盖命名、错误处理、性能优化等，提升代码质量。

### 优化建议

- **动态调整**：随着项目发展，定期更新规则。例如，若新增认证模块，可补充“使用 JWT 进行身份验证”的规则。
- **团队协作**：若多人开发，确保规则与团队规范一致，可通过 `@file` 引用团队的编码规范文档。
- **测试验证**：生成代码后，检查是否完全符合预期，若有偏差，细化描述（如“路由路径必须以 /api 开头”）。

通过这份 `.cursorrules`，你可以让 Cursor AI 更好地理解你的项目需求，生成符合技术栈和规范的代码，大幅提升开发效率！如果需要进一步调整或补充特定规则，请告诉我，我可以帮你完善。
