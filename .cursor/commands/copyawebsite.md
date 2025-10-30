---
description: 精确复刻任何网站的 1:1 设计与功能，包含对比验证和代码优化
argument-hint: 目标网站 URL（如 https://example.com）
---

请按照以下步骤完成网站复刻：

## 第一阶段：初始化与源码获取

1. 从 `$ARGUMENTS` 获取原始 HTML 和 CSS
   ```bash
   curl -s $ARGUMENTS > original.html
   ```

2. 用 Python 提取所有 `<style>` 块并分析优先级
   ```python
   import re
   with open('original.html', 'r', encoding='utf-8', errors='ignore') as f:
       html = f.read()
   styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
   # 确认 Style[0] 包含全局样式（body 定义）
   ```

3. 创建项目结构并初始化
   ```
   index.html      → 复刻的 HTML
   styles.css      → 合并后的 CSS
   script.js       → 交互逻辑
   ```

**确认点**：所有 `<style>` 块都已正确提取？请继续前告诉我提取结果。

---

## 第二阶段：HTML 结构复刻

1. 从浏览器开发工具检查 DOM 结构并记录
   - 识别所有容器、内容块、交互元素
   - 使用 HTML5 语义标签（`<header>`, `<main>`, `<footer>`, `<section>`）

2. 创建语义 HTML 框架
   - 保持结构简洁，避免过度嵌套
   - SVG 图标使用 Base64 编码或内联
   - 添加适当的 `class` 和 `id` 用于样式绑定

**安全确认**：HTML 框架是否完全就绪？确认后再进入样式阶段。

---

## 第三阶段：CSS 样式合并（关键）

**必须遵循的优先级顺序**：
1. `Style[0]` - 全局样式（**必须**包含 `body` 定义）
2. `Style[1]` - 头部/导航
3. `Style[2]` - 页脚
4. `Style[5]` - 主要内容（banner、links 等）
5. `Style[6]` - 图标与特殊元素

**执行步骤**：

```python
# 按优先级合并 CSS
final_css = styles[0]  # 全局（包含背景色）
for i in [1, 2, 5, 6]:
    if i < len(styles):
        final_css += "\n" + styles[i]

# 移除所有 [data-v-xxx] 属性选择器
final_css = re.sub(r'\[data-v-[a-f0-9]+\]', '', final_css)

with open('styles.css', 'w') as f:
    f.write(final_css)
```

**关键检查清单**：
- [ ] `body { background: #f7f7f7; }` 存在？
- [ ] 颜色使用 `hsla()` 格式？
- [ ] 所有图标 Base64 编码完整？
- [ ] 文件大小合理（通常 50-150 KB）？

**执行确认**：CSS 合并完成且上述检查点全部通过？

---

## 第四阶段：JavaScript 交互

1. 识别所有交互需求
   - 页面加载动画
   - 响应式导航切换
   - 悬停效果（如 QR 码显示）
   - 条件显示逻辑

2. 实现交互逻辑
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
       document.body.classList.add('loaded');
   });
   
   function handleResize() {
       const width = window.innerWidth;
       document.body.classList.toggle('mobile', width <= 760);
   }
   
   window.addEventListener('resize', handleResize);
   handleResize();
   ```

3. 测试所有交互元素可用性

---

## 第五阶段：对比验证

1. 启动本地服务器
   ```bash
   python3 -m http.server 8000
   ```

2. **并排对比**（使用浏览器工具）
   - 左侧：原版网站
   - 右侧：localhost:8000
   - 检查清单：
     - [ ] 整体布局与间距
     - [ ] 颜色和透明度
     - [ ] 字体大小、粗细、行高
     - [ ] 边框、圆角、阴影
     - [ ] 动画和过渡效果
     - [ ] 响应式断点行为

3. 逐个修复差异
   - 如果发现问题，告诉我具体差异
   - 我会提供针对性的修复方案

**验证确认**：视觉是否已 100% 匹配？

---

## 第六阶段：文件清理与提交

1. **删除所有临时文件**
   ```bash
   rm -f original.html original_style_*.css extracted_*.css icons_*.css test.html
   ```

2. **仅保留核心文件**
   - ✅ `index.html`
   - ✅ `styles.css`
   - ✅ `script.js`
   - ✅ `README.md`

3. **提交到 develop 分支**
   ```bash
   git checkout -b develop
   git add index.html styles.css script.js README.md
   git commit -m "feat: 完成 [网站名] 1:1 复刻

   - 精确复刻 HTML 结构
   - 完整合并 CSS 样式（所有 style 块）
   - 实现所有交互功能
   - 支持完整的响应式设计"
   
   git push origin develop
   ```

---

## 常见问题快速参考

| 问题 | 症状 | 解决方案 |
|------|------|--------|
| **背景色缺失** | 白屏或颜色不对 | 确保 `Style[0]` 首先合并，包含 `body` 定义 |
| **文本不可见** | 文字看不见 | 检查文本颜色 vs 背景色对比度 |
| **图标丢失** | 空白方块 | 验证 Base64 编码完整，`background-size: cover` |
| **CSS 截断** | 样式不完整 | 使用 Python 脚本而非文本编辑器合并 |
| **响应式错乱** | 移动端显示混乱 | 精确匹配原版所有媒体查询断点 |

---

## 执行流程提示

⏱️ **预期耗时**：2-4 小时（取决于复杂度）

✅ **完成标准**：
- 视觉 100% 匹配
- 所有功能可用
- 代码整洁可维护
- 通过响应式测试

⚠️ **关键节点**：
1. 完成 HTML 后告诉我
2. CSS 合并后进行验证
3. 对比时发现差异立即报告
4. 文件清理前确认备份完成
