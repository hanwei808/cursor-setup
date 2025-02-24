在 DevBox 上创建一个 Vue 应用， 在 DevBox Vue 应用上选择 Cursor 打开。

在 Cursor Compose 中输入:

======

请为我开发一个基于 Vue3 的 Todo List 应用，要求如下：

1. 功能需求：

- 添加新的待办事项
- 标记待办事项为完成/未完成
- 删除待办事项
- 统计待办十强
- 过滤显示（全部/已完成/未完成）

2. UI/UX 设计：

- 全屏响应式设计，适配不同设备屏幕
- 拥有亮色模式和夜间模式
- 现代化、简洁的界面风格
- 丰富的色彩运用，提升用户体验
- 在按钮和需要的地方加上图标
- 参考灵感，结合苹果官网的设计美学
  要求：

1. 直接以当前目录作为项目根目录，注意，此目录已经初始化完成 Vue3 项目结构，直接修改即可。
2. 如果需要执行命令，请暂停创建文件，让我先执行命令。
3. 请你根据我的需要，一步步思考，给我开发这个项目，特别是 UI 部分，一定要足够美观和现代化。

======

基于 API 测试用例，对接前后端

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
