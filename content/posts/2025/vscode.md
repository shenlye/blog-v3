---
title: "我的Visual Studio Code配置和插件推荐"
description: "包含我的用户配置文件和部分vscode插件"
date: 2025-08-31 00:00:00
updated: 2025-08-31 00:00:00
type: story
categories: [前端]
tags: []
---

```json
{
  "workbench.startupEditor": "none", // 干净启动
  "workbench.colorTheme": "One Dark Pro", // 主题推荐
  "workbench.iconTheme": "material-icon-theme", // 图标推荐
  "workbench.activityBar.location": "top", // 活动栏，更简洁
  "window.commandCenter": false, // 不显示命令中心，更简洁
  "workbench.editor.wrapTabs": true, // 标签页换行
  "workbench.list.smoothScrolling": true, // 平滑滚动

  "files.autoSave": "afterDelay", // 就是不爱手动保存
  "editor.fontFamily": "Maple Mono NF CN", // 中英美观的等宽字体，包含终端符号
  "editor.fontSize": 14, // 字体大小
  "editor.mouseWheelZoom": true, // ctrl+滚轮缩放
  "editor.wordWrap": "on", // 编辑器自动换行
  "editor.smoothScrolling": true, // 平滑滚动
  "editor.cursorBlinking": "expand", // 很帅的光标动画
  "editor.cursorSmoothCaretAnimation": "on", // 光标平滑移动
  "editor.renderFinalNewline": "dimmed", // 淡化最后一行

  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具，在没有项目配置时默认开箱即用
  "editor.formatOnPaste": true, // 粘贴格式化
  "editor.formatOnSave": true, // 保存格式化
  "editor.formatOnType": true, // 输入格式化
  "editor.linkedEditing": true, // 方便标签修改

  "editor.minimap.renderCharacters": false, // 缩略图现实色块
  "editor.minimap.showSlider": "always", // 始终显示位置
  "editor.minimap.size": "fit", // 自适应大小

  "terminal.integrated.smoothScrolling": true, // 终端平滑
  "terminal.integrated.fontFamily": "Maple Mono NF CN", // 终端字体，这个包含图标
  "terminal.integrated.mouseWheelZoom": true, // 方便调终端字体大小
  "terminal.integrated.fontSize": 12, // 终端字体

  "editor.bracketPairColorization.enabled": true, // 标签更容易分辨
  "editor.bracketPairColorization.independentColorPoolPerBracketType": true,
  "editor.guides.bracketPairs": true,

  "git.enableSmartCommit": true, // 没有add时也能提交
  "git.autofetch": true, // 自动fetch

  "github.copilot.nextEditSuggestions.enabled": true, // copilot的超级tab

  "vue.autoInsert.dotValue": true, // vue插件增强
  "vue.inlayHints.destructuredProps": true,
  "vue.inlayHints.inlineHandlerLeading": true,
  "vue.inlayHints.missingProps": true,
  "vue.inlayHints.vBindShorthand": true,

  "errorLens.messageBackgroundMode": "message",
  "explorer.confirmDelete": false,
}
```

## 插件推荐

### 💡 特别推荐

**CSS Navigation** - 效果超级好，可以直接悬停类来查看样式，还能进行peek和ctrl+鼠标左键跳转

![1](https://img.shenley.top/QQ20250831-135458.png)
![2](https://img.shenley.top/QQ20250831-135516.png)

### 🎨 主题和图标

- **主题推荐**：Catppuccin、One Dark Pro、Github Theme、Dracula Theme Official
- **图标推荐**：Material Icon Theme

### 🤖 AI 插件

- **Copilot**（免费一般）
- **QodoGen**（神中神，超级推荐，并且还有Github的PR Bot插件）
- **Trae AI**（无限的GLM4.5可用，效果不错）
- **Lingma**（我基本不用）
- **Windsurf Plugin**（插件还行，ide的tab效果极好）

### 🔧 Git 插件

- **GitLens**
- **GitGraph**

### 📝 Markdown 插件

- **Markdown All in One** 编辑体验增强
- **markdownlint** 修正格式错误

### ⚡ 功能增强

- **Path Intellisense**（路径提示）
- **ESLint**（提示逻辑问题）
- **Error Lens**（更好的错误提示）
- **EditorConfig for VSCode**
- **npm Intellisense**
- **Stylelint**（提示样式问题）
- **Iconify IntelliSense**（图标提示）
- **Live Server**（有了vite基本用不着了）
- **Todo Tree**

### ⏱️ 计时插件

- **Wakatime**

### 🛠️ 技术栈插件

- **Tailwind CSS IntelliSense**
- **Prisma**
- **Nuxtr**
- **Astro**

### 其他

- Docker
- Dev Containers
- Github Actions
- Gtihub Pull Requessts
- LeetCode
- Live Share
- MDX
- YAML
