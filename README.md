# 网站精确复刻项目（Website Replication Experiment）

> 借助 **Cursor Browser** 能力实现目标网页的 1:1 精确复刻 — 一个实验性项目，探索 AI 辅助的网站设计复刻方案。

![Status](https://img.shields.io/badge/status-experimental-yellow) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 项目简介

这是一个**实验性项目**，旨在探索如何使用 AI 编程助手（基于 Cursor Browser 能力）精确复刻任意网站的设计和功能。

### 核心能力

✅ **HTML 结构复刻** - 提取并重建语义化 HTML 框架  
✅ **CSS 精确匹配** - 像素级精准复刻样式和布局  
✅ **JavaScript 交互** - 实现页面交互和动态效果  
✅ **视觉对比验证** - 使用浏览器工具进行并排对比  
✅ **响应式设计** - 支持所有主要屏幕断点  

### 案例成果

已成功复刻：[**微信官网**](https://copy-a-website.vercel.app/)
- **视觉一致性**: 100% 像素完美匹配
- **功能完整性**: 所有交互正常
- **文件规模**: 
  - `index.html`: 10 KB
  - `styles.css`: 93 KB  
  - `script.js`: 3.9 KB

---

## 🛠️ 使用方法

### 快速开始

```bash
# 使用 Cursor 斜杠命令快速复刻任何网站
/copyawebsite https://example.com

# 或指定具体网站
/copyawebsite https://www.baidu.com
```

### 工作流程

该项目封装了一个 [**Cursor 斜杠命令**](.cursor/commands/copyawebsite.md)，实现完整的网站复刻工作流：

```
第一阶段：初始化 → 从目标URL获取源码，提取所有样式块
    ↓
第二阶段：HTML复刻 → 分析DOM结构，创建语义化框架
    ↓
第三阶段：CSS合并 → 按优先级合并CSS（关键），处理属性选择器
    ↓
第四阶段：交互实现 → 添加JavaScript交互逻辑
    ↓
第五阶段：对比验证 → 使用浏览器工具进行并排对比和修复
```

### 文件结构

```
project/
├── .cursor/
│   └── commands/
│       └── copyawebsite.md      # Cusor 斜杠命令（核心）
├── index.html                   # 复刻的 HTML 结构
├── styles.css                   # 合并的 CSS 样式（93 KB）
├── script.js                    # 交互逻辑
├── start_server.sh              # 本地服务器启动脚本
└── README.md                    # 本文件
```

---

## 💡 关键方法与经验教训

### 方法论：CSS 优先级合并

**最关键的发现**：CSS 样式块的合并顺序至关重要

```python
# 必须遵循的优先级顺序
css_blocks_order = [
    0,   # 全局样式（body、html 定义）← 最重要！
    1,   # 头部/导航
    2,   # 页脚
    5,   # 主要内容（banner、links 等）
    6    # 图标与特殊元素
]
```

**为什么？** 如果不按这个顺序合并，全局样式（如 `body` 背景色）会被后续样式覆盖，导致白屏或颜色错误。

### 经验教训

#### 1. **背景色是最常见的陷阱** ⚠️

```css
/* ❌ 常见错误 */
body { background: #fff; }      /* 白背景 + 白文字 = 看不见 */
body { opacity: 0; }            /* 页面加载白屏 */

/* ✅ 正确做法 */
body { background: #f7f7f7; }   /* 使用浅灰色 */
body { opacity: 1; }            /* 初始可见 */
```

**教训**: 始终首先验证 `Style[0]` 是否包含 `body` 的完整定义。

#### 2. **颜色规范化** 🎨

```css
/* ✅ 推荐使用 hsla() */
color: hsla(0, 0%, 100%, 0.9);

/* ❌ 避免混合使用 */
color: rgba(255, 255, 255, 0.9);
```

**教训**: 与原网站风格保持一致，便于调试和修改。

#### 3. **临时文件隔离** 📁

```bash
# 自动创建独立临时目录（按二级域名命名）
/tmp/copyawebsite_baidu/    # 百度
/tmp/copyawebsite_weixin/   # 微信
/tmp/copyawebsite_google/   # 谷歌
```

**教训**: 避免污染项目目录，支持并行复刻多个网站。

#### 4. **SVG 图标编码** 🖼️

```css
.icon-name {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg...");
    background-size: cover;
    width: 40px;
    height: 40px;
}
```

**教训**: 使用 Base64 或 SVG 数据 URI，避免外部依赖，减少 HTTP 请求。

#### 5. **媒体查询精确匹配** 📱

```css
/* 必须精确匹配原版的断点 */
@media (max-width: 760px) {
    /* 移动端样式 */
}

@media (max-width: 1024px) {
    /* 平板端样式 */
}
```

**教训**: 逐一测试每个断点，确保响应式行为完全一致。

---

## 🔧  技术栈

| 技术 | 用途 |
|------|------|
| **Cursor Browser** | 网页快照、并排对比、DOM 检查 |
| **Python** | CSS 提取、样式合并、自动化处理 |
| **HTML5** | 语义化结构 |
| **CSS3** | Flexbox、Grid、动画、响应式设计 |
| **Vanilla JavaScript** | 交互逻辑，无框架依赖 |

### 可替代工具

虽然项目当前使用 **Cursor Browser**，但可以用其他工具替代：

- **[chrome-devtools-mcp](https://developer.chrome.com/blog/chrome-devtools-mcp)** - Chrome DevTools MCP
- **Playwright** / **Puppeteer** - 浏览器自动化
- **Selenium** - 跨浏览器自动化
- **直接 curl + 解析** - 轻量级方案

**推荐**: 对于纯静态网站，直接使用 `curl` + Python 解析；对于动态网站，使用 Chrome DevTools MCP。

---

## 📊 项目成果示例

### 微信官网复刻

| 指标 | 结果 |
|------|------|
| **源网站** | https://weixin.qq.com |
| **视觉一致性** | ✅ 100% 像素完美 |
| **功能完整性** | ✅ 所有交互正常 |
| **文件数量** | 仅 3 个核心文件 |
| **总体积** | 107 KB |
| **响应式支持** | ✅ 3+ 断点完美 |
| **实施耗时** | 2-4 小时 |

**核心文件统计：**
```
index.html (170 行)  →  HTML 结构
styles.css (93 KB)   →  完整 CSS（压缩格式）
script.js (124 行)   →  交互逻辑
```

---

## 🎓 学习价值

通过这个项目，你将学到：

1. **前端整体架构** - HTML、CSS、JavaScript 的协作
2. **精确匹配技巧** - 颜色、尺寸、间距的像素级复刻
3. **浏览器工具** - 使用开发者工具进行精细调试
4. **系统化思维** - 大型项目的分阶段管理
5. **AI 辅助开发** - 如何高效利用 AI 编程助手

---

## 🚀 快速开始

### 前提条件

- Cursor IDE（或支持 Cusor 指令的编辑器）
- Python 3.7+
- 本地 HTTP 服务器（用于测试）

### 步骤

1. **克隆或初始化项目**
   ```bash
   git clone <repo-url>
   cd website-replication
   ```

2. **启动本地服务器**
   ```bash
   python3 -m http.server 8000
   # 访问 http://localhost:8000
   ```

3. **使用 Cursor 命令复刻网站**
   ```bash
   /copyawebsite https://example.com
   ```

4. **进行对比验证**
   - 左侧：原版网站
   - 右侧：localhost:8000
   - 逐个修复差异

---

## 📝 许可证

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.**

---

## ⚠️ 使用注意

### 法律声明

- 本项目仅用于**学习和研究**目的
- 复刻他人网站时，请遵守当地法律和网站的 Terms of Service
- 不鼓励用于商业用途或侵犯知识产权
- 使用者需自行承担法律责任

### 道德准则

- ✅ 学习网站设计和前端技术
- ✅ 创建个人研究项目
- ✅ 征求网站所有者同意后进行复刻
- ❌ 冒充原网站
- ❌ 侵犯版权或商标
- ❌ 用于诈骗或恶意目的


---

## 📚 相关资源

- [Cursor Browser](https://cursor.com/en-US/docs/agent/browser)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [MCP - Model Context Protocol](https://modelcontextprotocol.io/)


