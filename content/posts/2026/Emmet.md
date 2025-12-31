---
title: "vscode高效标签操作"
description: "通过配置 VS Code 内置的 Emmet 快捷键，告别手写闭合标签，用键盘高效完成标签包裹、删除、跳转等操作"
date: 2026-01-01
updated: 2026-01-01
type: story
categories: [vscode]
tags: []
---

## 别再手写闭合标签了

不会真的有人想给一堆标签套个新标签，是先写个 `<div></div>`，然后剪切粘贴吧？

不会真的有人想删掉一层标签，先选前面的删掉，再顶着报错去找到后面那个删掉吧？

或者你想改个属性，碰鼠标又太麻烦，键盘移动过去要按住 `Ctrl` 然后不停地按箭头？

好吧，这些都是我曾经的操作...

其实，VS Code 内置了极其强大的 **Emmet 功能**，只是它们默认**没有绑定快捷键**。只要把这些功能绑定到键盘上，就能解放右手了。

## 我的键位配置

在 VS Code 中点击齿轮图标，选择 **Profiles** → **Keyboard Shortcuts** 就可以看到配置文件了。

这套配置使用了 `Ctrl + Alt` 组合，完美避开了大部分插件的冲突，调试了好一会儿。不想用？那你可以试试拿鼠标选择一片区域，然后靠拖动来移动（

```json
[
  {
    "key": "ctrl+alt+t",
    "command": "editor.emmet.action.wrapWithAbbreviation"  // 用标签包裹
  },
  {
    "key": "ctrl+alt+\\",
    "command": "editor.emmet.action.matchTag"  // 跳转到匹配的标签
  },
  {
    "key": "ctrl+alt+k",
    "command": "editor.emmet.action.removeTag"  // 删除标签（保留内容）
  },
  {
    "key": "ctrl+alt+j",
    "command": "editor.emmet.action.balanceOut"  // 向外扩展选择
  },
  {
    "key": "ctrl+alt+,",
    "command": "editor.emmet.action.selectPrevItem"  // 选择前一个项目
  },
  {
    "key": "ctrl+alt+.",
    "command": "editor.emmet.action.selectNextItem"  // 选择下一个项目
  },
  {
    "key": "ctrl+alt+u",
    "command": "editor.emmet.action.updateTag"  // 更新标签名称
  }
]
```

## 功能说明

- **`Ctrl + Alt + T`**：包裹标签 - 选中内容后输入标签名，快速包裹
- **`Ctrl + Alt + K`**：删除标签 - 删除外层标签但保留内部内容
- **`Ctrl + Alt + \`**：跳转匹配 - 在开始和结束标签之间快速跳转
- **`Ctrl + Alt + J`**：扩展选择 - 逐层向外扩展选择范围
- **`Ctrl + Alt + U`**：更新标签 - 同时修改开始和结束标签
- **`Ctrl + Alt + ,/.`**：选择项目 - 快速选择上/下一个属性或标签

有的操作不需要完全选中，比如F2也可以更新标签，但是这里的更新标签允许不用选中

说到F2，还有一点它做不到，比如你输入 `div.container`，它会直接改完名后变成 `<div class="container">`

## 总结

虽然鼠标拖动也能干活，但能用键盘解决的就别动鼠标。节省这几秒钟，早点下班不好吗？

也许会想看这个[Emmet 官方速查表](https://docs.emmet.io/cheat-sheet/)

tips: Ctrl + K 然后按下 Z 进入沉浸模式。

## 乱想

这个真的需要教吗，vscode没有像jetbains那样提供明显的教程，导致我一度以为vscode的重构功能是个残疾，每次都手打 if try..catch for之类的，后来发现，扩选选中，按Ctrl+.其实是有功能的。

也许我该挑个时间好好阅读一下vsc的文档，否则我真的会觉得这是个高级记事本
