在 DevBox 上创建一个数据库 和 Express 应用， 在 DevBox Express 应用上选择 Cursor 打开。

在 Cursor Compose 中输入:

=======

请为我开发一个基于 Node.js 和 Express 框架的 Todo List 后端项目，项目需要实现以下四个 RESTFULL API 接口：

1. 查询所有待办事项
   接口名：GET /api/getTodos
   功能：从数据库的 'list' 集合中查询并返回所有待办事项。
   参数：无
   返回：包含所有待办事项的数组
2. 添加新的待办事项
   接口名： POST /api/addTodo
   功能：向 'list' 集合中添加一个新的待办事项。
   参数：{ "value": string, // 待办事项的具体内容 "isCompleted": boolean // 是否已完成, 默认为 false }
   返回：新添加的待办事项对象，包含自动生成的唯一 id
3. 更新待办事项状态
   接口名：PUT /api/updateTodo/:id
   功能：根据 id 更新指定待办事项的完成状态（将 isCompleted 值取反）
   参数：id
   返回：更新后的待办事项对象
4. 删除待办事项
   接口名：DELETE /api/deleteTodo/:id
   功能：根据 id 删除指定待办事项
   参数：id
   返回：删除操作的结果状态

技术要求：

1. 使用 Express 框架搭建一个简单的服务器，并设置路由。
2. 使用 MongoDB 作为数据库存储待办事项数据，通过 Mongoose 库进行操作。
3. 请注意，以上接口的参数和返回值需要符合 RESTful 规范，并使用 JSON 格式进行交互。
4. 实现适当的错误处理和输入校验。
5. 添加基本的日志记录功能。

以下是数据库连接方式：mongodb://root:kvdh7z2f@test-db-mongodb.ns-lpdgemnl.svc:27017

1. 直接以当前目录作为项目根目录。注意，此目录已经初始化完了 nodejs 项目，直接修改即可。
2. 如果需要执行命令，请暂停创建文件，让我先执行命令。
3. 为这个项目中的所有代码写上详细注释。

========

npm install express mongoose morgan

启动应用

node app.js

========

这个是根地址：https://vhgqhuiltymz.sealoshzh.site，请生成这 4 个接口的测试用例及返回值。

我将为您生成每个接口的测试用例，包括请求方法、URL 和预期返回值。我会使用 curl 命令来演示，您也可以使用 Postman 等工具测试。

### 1. 获取所有待办事项

```bash
curl -X GET 'https://vhgqhuiltymz.sealoshzh.site/api/getTodos'
```

预期返回值：

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f2e8b1c261e6001234abcd",
      "value": "完成项目文档",
      "isCompleted": false,
      "createdAt": "2024-03-14T08:30:00.000Z",
      "updatedAt": "2024-03-14T08:30:00.000Z"
    }
  ]
}
```

### 2. 添加新的待办事项

```bash
curl -X POST 'https://vhgqhuiltymz.sealoshzh.site/api/addTodo' \
-H 'Content-Type: application/json' \
-d '{
    "value": "学习 Node.js",
    "isCompleted": false
}'
```

预期返回值：

```json
{
  "success": true,
  "data": {
    "_id": "65f2e8b1c261e6001234abce",
    "value": "学习 Node.js",
    "isCompleted": false,
    "createdAt": "2024-03-14T08:35:00.000Z",
    "updatedAt": "2024-03-14T08:35:00.000Z"
  }
}
```

### 3. 更新待办事项状态

```bash
curl -X PUT 'https://vhgqhuiltymz.sealoshzh.site/api/updateTodo/65f2e8b1c261e6001234abce'
```

预期返回值：

```json
{
  "success": true,
  "data": {
    "_id": "65f2e8b1c261e6001234abce",
    "value": "学习 Node.js",
    "isCompleted": true,
    "createdAt": "2024-03-14T08:35:00.000Z",
    "updatedAt": "2024-03-14T08:40:00.000Z"
  }
}
```

### 4. 删除待办事项

```bash
curl -X DELETE 'https://vhgqhuiltymz.sealoshzh.site/api/deleteTodo/65f2e8b1c261e6001234abce'
```

预期返回值：

```json
{
  "success": true,
  "message": "待办事项已成功删除"
}
```

### 错误情况的返回值示例：

1. 添加无效的待办事项：

```json
{
  "success": false,
  "message": "待办事项内容无效"
}
```

2. 更新/删除不存在的待办事项：

```json
{
  "success": false,
  "message": "待办事项不存在"
}
```

3. 服务器错误：

```json
{
  "success": false,
  "message": "服务器内部错误",
  "error": "错误详细信息"
}
```

测试注意事项：

1. 所有请求的响应都包含 `success` 字段，表示操作是否成功
2. 成功的响应中，数据在 `data` 字段中返回
3. 错误的响应中会包含 `message` 字段说明错误原因
4. 在更新和删除操作时，需要使用实际存在的 `_id` 值
5. 时间戳（`createdAt` 和 `updatedAt`）会根据实际操作时间自动生成
