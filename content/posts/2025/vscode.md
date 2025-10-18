---
title: "我的Visual Studio Code配置和插件推荐"
description: "分享我的 VS Code 个性化配置与高效插件清单，涵盖主题美化、AI 辅助、Git 增强、前端开发利器等，助你打造丝滑又高效的编码环境。"
date: 2025-08-31 00:00:00
updated: 2025-10-18 16:30:00
type: story
categories: [前端]
tags: ["vscode","配置文件","扩展推荐"]
---

## 我的VSCode配置文件捏

```json
{
  "workbench.startupEditor": "none", // 干净启动
  "workbench.colorTheme": "Catppuccin Frappé", // 主题推荐
  "workbench.iconTheme": "material-icon-theme", // 图标推荐
  "workbench.activityBar.location": "bottom", // 底部活动栏，更简洁舒适
  "window.commandCenter": false, // 不显示命令中心，也更简洁，我喜欢快捷键打开
  "workbench.editor.wrapTabs": true, // 标签页换行
  "workbench.list.smoothScrolling": true, // 平滑滚动

  "files.autoSave": "afterDelay", // 就是不爱手动保存
  "editor.fontFamily": "Maple Mono NF CN, SF Mono", // 中英美观的等宽字体，SF Mono是Mac的专属编程字体，我超喜欢
  "editor.fontSize": 14, // 字体大小
  "editor.mouseWheelZoom": true, // ctrl+滚轮缩放
  "editor.wordWrap": "on", // 编辑器自动换行
  "editor.smoothScrolling": true, // 平滑滚动
  "editor.cursorBlinking": "expand", // 很帅的光标动画
  "editor.cursorSmoothCaretAnimation": "on", // 光标平滑移动
  "editor.renderFinalNewline": "dimmed", // 淡化最后一行

  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具
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

  // vue插件增强，我不懂，从纸鹿那抄来的
  "vue.autoInsert.dotValue": true, 
  "vue.inlayHints.destructuredProps": true,
  "vue.inlayHints.inlineHandlerLeading": true,
  "vue.inlayHints.missingProps": true,
  "vue.inlayHints.vBindShorthand": true,

  "errorLens.messageBackgroundMode": "message",
  "explorer.confirmDelete": false, // 删除文件不二次确认
}
```

## 插件推荐

**CSS Navigation** - 非常喜欢，可以直接悬停类名来查看样式，还能进行Peek和Ctrl+鼠标左键跳转

![1](https://img.shenley.top/QQ20250831-135458.png)
![2](https://img.shenley.top/QQ20250831-135516.png)

### 主题和图标

- **主题推荐**：Catppuccin、One Dark Pro、Github Theme
- **图标推荐**：Material Icon Theme

### AI 插件

- **Copilot** - Free比较一般，通过学生认证获得Pro就是神中神
- **QodoGen** - 非常推荐，可以用75次最新的各家模型
- **Trae AI** - 可以无限用国内的新模型，推荐
- **Lingma** - 感觉一般般，还可以，只能用Qwen模型

### Git 插件

- **GitLens** - 依旧Github学生认证免费用Pro，这还说啥了

### Markdown 插件

- **Markdown All in One** - 编辑体验增强，细节我也不太清楚
- **markdownlint** - 修正格式错误，但是可能没有必要

### 功能增强

- **Path Intellisense** - 路径提示
- **ESLint** - 代码错误检查
- **Error Lens** - 更好的错误提示
- **Stylelint** - 样式错误检查
- **Iconify IntelliSense** - 引入Iconify时的图标提示
- **Live Server** - 可以直接热更新比如HTML文件的修改，初学者推荐
- **Todo Tree** - 显示TODO，FIX之类的提示

### 计时插件

- **Wakatime** - 记录追踪编程时长，推荐
