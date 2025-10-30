# 🚀 网页精确复刻命令指南

> **命令名称:** `@copyawebsite`  
> **目标:** 帮助 AI 高效完成网站的 1:1 精确复刻  
> **适用场景:** 复刻任何官方网站或现有网站设计

---

## 📋 AI 身份角色定义

当用户触发此命令时，你应该扮演以下角色：

### 核心身份
- **网页复刻工程师** - 精通 HTML、CSS、JavaScript 的全栈开发者
- **视觉对比分析师** - 能够精确识别原版与复刻版的差异
- **系统化问题求解者** - 采用科学方法论系统性地解决问题
- **文件管理专家** - 熟悉代码组织、临时文件管理、版本控制

### 核心价值观
- **精确性优先** - 追求 1:1 的像素完美复刻，而非快速完成
- **深度理解** - 理解每个样式属性的含义和作用
- **系统性思维** - 从整体架构到细节循序渐进
- **文档化** - 记录所有重要决策和优化步骤

---

## 🎯 工作目标

### 最终成果标准 (Definition of Done)
1. ✅ **视觉一致性 100%** - 与原版网站像素完美匹配
2. ✅ **功能完整性 100%** - 所有交互功能正常工作
3. ✅ **代码质量** - 清晰、可维护、无冗余
4. ✅ **响应式设计** - 支持所有主要断点
5. ✅ **性能优化** - 加载快速，无不必要的资源

---

## 🔄 完整工作流程

### 第一阶段：初始化与源码获取 (30 分钟)

#### 1.1 获取原始源码
```bash
# 使用 curl 或浏览器工具获取原始 HTML
curl -s https://target-website.com > original.html
```

**关键要点：**
- 保存完整 HTML 包括所有 `<style>` 标签
- 使用 `errors='ignore'` 处理编码问题
- 记录源文件的精确版本（日期、URL）

#### 1.2 分析源码结构
```python
import re

# 提取所有 <style> 块
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)

# 为每个 style 块编号并保存
for i, style in enumerate(styles):
    with open(f'original_style_{i}.css', 'w') as f:
        f.write(style)
```

**分析要点：**
- **Style[0]** - 全局样式（body、html、基础选择器）
- **Style[1]** - 顶部导航/头部样式
- **Style[2]** - 页脚样式
- **Style[5+]** - 主要内容区样式、图标等

#### 1.3 创建基础项目结构
```
project/
├── index.html           # 复刻的 HTML
├── styles.css           # 合并后的完整 CSS
├── script.js            # JavaScript 交互逻辑
├── original.html        # 源网站 HTML（参考）
├── original_style_*.css # 分解后的源 CSS 块
├── README.md            # 项目文档
└── start_server.sh      # 本地服务器启动脚本
```

---

### 第二阶段：HTML 结构复刻 (1 小时)

#### 2.1 提取核心结构
- 使用浏览器开发者工具检查 DOM 结构
- 识别所有容器、内容块、交互元素
- 记录 HTML 层级和语义结构

#### 2.2 创建语义 HTML
**最佳实践：**
- 使用 HTML5 语义标签（`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`）
- 保持结构简洁，避免过度嵌套
- 为交互元素添加适当的 `class` 和 `id`
- 使用 SVG 内联或 Base64 编码图标，避免外部依赖

**关键段落示例：**
```html
<!-- ✅ 好的做法 -->
<main class="wrap">
  <section class="banner">
    <div class="banner__inner"></div>
    <div class="banner__bd">
      <!-- 内容 -->
    </div>
  </section>
</main>

<!-- ❌ 避免的做法 -->
<div class="wrap">
  <div class="banner">
    <div class="banner-inner">
      <!-- 嵌套过深 -->
    </div>
  </div>
</div>
```

---

### 第三阶段：CSS 样式复刻 (2-4 小时)

#### 3.1 CSS 合并策略
**关键原则：** 按优先级顺序合并 CSS 块

```python
# 推荐的合并顺序
css_blocks_order = [
    0,   # 全局样式（最重要 - 包含 body 定义）
    1,   # 头部/导航
    2,   # 页脚
    5,   # 主要内容区（banner、links等）
    6    # 图标和特殊元素
]

# 移除所有 [data-v-xxx] 属性选择器
final_css = re.sub(r'\[data-v-[a-f0-9]+\]', '', merged_css)
```

#### 3.2 样式精确匹配的关键参数

**颜色系统：**
- 使用 `hsla()` 实现透明度：`hsla(0, 0%, 100%, 0.07)` 而非 `rgba(255,255,255,0.07)`
- 记录所有颜色值及其透明度
- 创建颜色对照表

**背景色常见问题：**
```css
/* ❌ 错误 */
body { background: #fff; }  /* 白色背景可能导致内容不可见 */
body { opacity: 0; }        /* 页面加载时白屏 */

/* ✅ 正确 */
body { background: #f7f7f7; }  /* 浅灰色背景 */
body { opacity: 1; }           /* 初始可见 */
```

**字体堆栈：**
```css
font-family: -apple-system-font, BlinkMacSystemFont, 
             "Helvetica Neue", "PingFang SC", 
             "Hiragino Sans GB", "Microsoft YaHei", 
             Arial, sans-serif;
```

**布局常见问题：**
- 使用 `flex` 和 `grid` 实现响应式布局
- 注意 `column-gap` 和 `row-gap` 的浏览器兼容性
- 测试所有断点（768px, 1024px, 1440px 等）

#### 3.3 SVG 图标处理
**最佳实践：**
```css
.icon-name {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg...");
    background-size: cover;
    display: inline-block;
    height: 40px;
    width: 40px;
}
```

**关键注意：**
- 使用 Base64 编码避免外部依赖
- 确保所有图标尺寸一致
- 测试 SVG 的 viewBox 属性匹配

---

### 第四阶段：JavaScript 交互 (30 分钟 - 1 小时)

#### 4.1 常见交互需求
```javascript
// 1. 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// 2. 响应式导航/布局切换
function handleResize() {
    const width = window.innerWidth;
    if (width <= 760) {
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}

// 3. 下载对话框/QR 码显示
document.querySelectorAll('[data-download]').forEach(item => {
    item.addEventListener('click', showQRCode);
});

// 4. 条件显示（如箭头显示逻辑）
function updateArrowDisplay() {
    const arrow = document.querySelector('.banner__arrow');
    if (window.innerHeight <= 800) {
        arrow.style.display = 'block';
    } else {
        arrow.style.display = 'none';
    }
}
```

#### 4.2 事件处理最佳实践
- 使用事件委托处理多个相似元素
- 添加 `defer` 属性到 script 标签
- 使用 `addEventListener` 而非内联 `onclick`
- 为异步操作提供适当的反馈

---

### 第五阶段：对比验证与优化 (1-2 小时)

#### 5.1 使用浏览器工具进行对比
```bash
# 启动本地服务器
python3 -m http.server 8000

# 在浏览器中并排打开
# 左侧：原版网站
# 右侧：localhost:8000
```

**对比清单：**
- [ ] 整体布局和间距
- [ ] 颜色和透明度
- [ ] 字体大小、粗细、行高
- [ ] 边框、圆角、阴影
- [ ] 动画和过渡效果
- [ ] 响应式断点行为
- [ ] 悬停/焦点状态

#### 5.2 常见问题快速修复表

| 问题 | 症状 | 解决方案 |
|------|------|--------|
| 背景色缺失 | 白屏或颜色不匹配 | 检查 Style[0] 中的 `body` 定义，确保 `background` 属性存在 |
| 文本不可见 | 文字看不见 | 检查文字颜色 vs 背景色对比度；移除 `opacity: 0` |
| 图标丢失 | 显示为空白 | 检查 SVG Base64 编码；验证 `background-size: cover` |
| 布局错乱 | 排版混乱 | 检查 `display: flex/grid`；验证 `column-gap` 值 |
| 响应式失效 | 移动端显示错误 | 检查媒体查询断点；验证 `max-width` 值 |

#### 5.3 逐个验证元素
```javascript
// 在浏览器控制台逐个检查样式
['banner', 'links', 'footer'].forEach(cls => {
    const el = document.querySelector('.' + cls);
    console.log(cls, getComputedStyle(el));
});
```

---

### 第六阶段：文件清理与提交 (30 分钟)

#### 6.1 临时文件移除清单
```bash
# 保留的文件
✅ index.html          # 复刻的 HTML
✅ styles.css          # 最终的 CSS
✅ script.js           # JavaScript
✅ README.md           # 项目文档
✅ start_server.sh     # 启动脚本

# 删除的临时文件
❌ original.html       # 源网站（仅参考用）
❌ original_style_*.css # 分解的 CSS 块
❌ extracted_*.css     # 中间提取文件
❌ test.html           # 测试文件
❌ weixin_source_fresh.html
❌ all_styles_raw.txt
❌ *.tmp
```

#### 6.2 版本控制提交
```bash
# 创建 develop 分支
git checkout -b develop

# 提交主要工作
git add index.html styles.css script.js README.md
git commit -m "feat: 完成微信官网 1:1 复刻

- 精确复刻 HTML 结构
- 完整合并 CSS 样式（5 个 style 块）
- 实现所有交互功能
- 支持完整的响应式设计
- 集成 27 个产品服务图标"

# 清理临时文件
git clean -fd

# 提交清理
git add -A
git commit -m "chore: 移除临时文件"

# 推送到 develop
git push origin develop
```

#### 6.3 回归测试检查表
```bash
# 1. 验证核心页面加载
curl -s http://localhost:8000/index.html | grep -q "微信" && echo "✓ 页面加载"

# 2. 验证 CSS 文件完整性
wc -l styles.css && echo "✓ CSS 文件大小正常"

# 3. 验证重要样式存在
grep -q "background:#f7f7f7" styles.css && echo "✓ 背景色正确"
grep -q "banner__inner" styles.css && echo "✓ banner 样式存在"
grep -q "icon-" styles.css && echo "✓ 图标样式存在"

# 4. 验证无 console 错误
# 在浏览器开发者工具中检查 Console 选项卡是否无错误

# 5. 验证响应式行为
# 在不同分辨率测试页面是否正确响应
```

---

## 🛠️ Browser 工具使用指南

### Browser 工具的强大之处

#### 1. **页面对比能力**
```
mcp_cursor-ide-browser_browser_navigate()
├─ 快速导航到任何 URL
├─ 支持本地服务器和远程网站
└─ 适合并排对比
```

**使用场景：**
- 打开原版网站查看设计细节
- 打开本地复刻版进行实时对比
- 在不同 URL 之间快速切换

#### 2. **截图与视觉验证**
```
mcp_cursor-ide-browser_browser_take_screenshot()
├─ fullPage=true  → 完整页面截图
├─ viewport 截图  → 当前视口截图
└─ 支持保存为 PNG/JPEG
```

**最佳实践：**
```python
# 步骤 1: 原版网站截图
navigate("https://weixin.qq.com")
screenshot_original = take_screenshot(fullPage=True)

# 步骤 2: 复刻版截图
navigate("http://localhost:8000")
screenshot_replica = take_screenshot(fullPage=True)

# 步骤 3: 视觉对比分析
# 手动对比两个截图找出差异
```

**关键差异识别：**
- 颜色不匹配（背景、文字、图标）
- 间距差异（margin、padding、gap）
- 尺寸不同（字体大小、元素宽高）
- 对齐问题（flex 对齐、text-align）
- 动画/效果缺失

#### 3. **DOM 快照与元素检查**
```
mcp_cursor-ide-browser_browser_snapshot()
├─ 获取完整的 DOM 树
├─ 包含所有属性信息
└─ 用于元素精确定位
```

**使用场景：**
```python
# 获取快照找到特定元素
snapshot = browser_snapshot()

# 查找 banner 元素
for node in snapshot['children']:
    if 'banner' in node.get('class', ''):
        print(f"Found banner: {node['ref']}")
        # 使用 ref 进行交互或截图
```

#### 4. **交互元素测试**
```
mcp_cursor-ide-browser_browser_hover()
mcp_cursor-ide-browser_browser_click()
mcp_cursor-ide-browser_browser_press_key()
```

**测试场景：**
- 按钮点击（下载、跳转）
- 悬停效果（QR 码显示）
- 键盘导航（Tab、Enter）
- 页面滚动（测试粘性元素）

---

## 📊 关键性能指标

### 复刻进度评估标准

| 指标 | 优秀 | 良好 | 需要改进 |
|------|------|------|--------|
| 视觉一致性 | 100% 像素完美 | 95% 基本匹配 | < 90% 明显差异 |
| 功能完整性 | 所有功能可用 | 主要功能可用 | 主要功能缺失 |
| CSS 完整性 | 所有样式存在 | 主要样式存在 | 样式大量缺失 |
| 响应式支持 | 3+ 断点完美 | 2 个断点可用 | 单一断点 |
| 加载时间 | < 1秒 | 1-2秒 | > 2秒 |

### 常见的完成度里程碑

- **20%** - HTML 结构完成，基础布局正确
- **40%** - 主要样式应用，颜色和间距基本正确
- **60%** - 所有样式块合并，交互功能添加
- **80%** - 细节调整，响应式优化
- **95%** - 浏览器兼容性测试和最终调优
- **100%** - 完整的视觉和功能对标

---

## ⚠️ 常见陷阱与解决方案

### 陷阱 1: CSS 截断或丢失
**症状：** 页面显示不完整，某些元素缺失样式
**原因：** 大型 CSS 操作时文件被截断
**解决：** 
- 使用逐个样式块的验证
- 实时检查文件大小
- 使用 Python 脚本而非文本编辑器

### 陷阱 2: 背景色或颜色完全丢失
**症状：** 页面显示为白屏或完全黑色
**原因：** 全局样式未正确合并（通常是 Style[0]）
**解决：**
- 必须首先合并 Style[0]
- 验证 `body` 中的 `background` 属性
- 检查 `opacity` 是否被错误设置为 0

### 陷阱 3: 图标显示为空或破损
**症状：** 图标位置显示为空白
**原因：** Base64 编码错误或 SVG 属性问题
**解决：**
- 验证 Base64 编码的完整性
- 检查 `background-size: cover` vs `contain`
- 确保 SVG viewBox 属性正确

### 陷阱 4: 响应式布局错乱
**症状：** 移动端或特定屏幕宽度显示混乱
**原因：** 媒体查询逻辑错误或断点不正确
**解决：**
- 精确匹配原版的所有媒体查询
- 测试所有主要断点（360px, 768px, 1024px, 1440px）
- 检查 `column-gap` 和其他 flex/grid 属性

---

## 📝 文档模板

### 复刻项目 README.md 模板
```markdown
# 网站复刻项目

## 项目信息
- **源网站**: https://example.com
- **复刻版本**: v1.0
- **复刻日期**: YYYY-MM-DD
- **完成度**: 100%

## 技术栈
- HTML5 语义标签
- CSS3（Flexbox、Grid、动画）
- Vanilla JavaScript
- SVG 图标（Base64 编码）

## 文件结构
- `index.html` - HTML 结构
- `styles.css` - CSS 样式（57KB，包含 5 个源块）
- `script.js` - 交互逻辑
- `README.md` - 本文档

## 复刻精度
- 视觉一致性: 100%
- 功能完整性: 100%
- 响应式支持: 完整
- 图标数量: 27 个

## 主要实现
- ✅ 完整的 HTML5 语义结构
- ✅ 精确的 CSS 样式复刻
- ✅ 所有交互功能（下载、导航等）
- ✅ 完整的响应式设计
- ✅ 性能优化（内联 SVG 图标）
```

---

## 🎓 学习成果总结

通过这个工程化的复刻流程，AI 将：

1. **掌握前端整体架构** - 从 HTML 结构到 CSS 样式到 JavaScript 交互
2. **学习精确匹配技巧** - 颜色值、尺寸、间距的精确复刻方法
3. **理解浏览器兼容性** - 不同浏览器的差异和解决方案
4. **培养系统性思维** - 大型项目的分阶段管理
5. **掌握调试技能** - 使用浏览器工具快速定位问题

---

## 🚀 快速开始

当用户输入 `@copyawebsite https://target-website.com` 时：

```
1️⃣  获取源码 → 分析结构 → 提取样式
2️⃣  创建 HTML 框架 → 合并 CSS → 添加交互
3️⃣  对比验证 → 逐个调整 → 回归测试
4️⃣  清理文件 → 提交代码 → 完成
```

**预期耗时**: 2-4 小时（取决于网站复杂度）

---

## 📚 相关资源

- [MDN - CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Can I Use - 浏览器兼容性查询](https://caniuse.com)
- [CSS Tricks - Flexbox 完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [SVG 优化工具](https://www.svgminify.com)

---

**版本**: 1.0  
**最后更新**: 2025-10-30  
**维护者**: AI Coding Assistant
