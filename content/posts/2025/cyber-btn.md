---
title: "超炫酷的赛博按钮和弹窗"
description: ""
date: 2025-09-04
updated: 2025-09-04
type: story
categories: ["前端"]
tags: []
---

很久之前就发现了一个非常心动的效果，一路从qq追到了tg，再追到了x，最后到了codepen，感觉一定很复杂，现在看来也没什么难度。
[原链接](https://codepen.io/jh3y/pen/yyNWGNG)

---

## 按钮

原作者的代码非常详尽，还用了很多高级技巧，但是我只在乎动画本身，简化后，按钮也不过是clip-path和transform位移的巧妙结合，手动实现一下吧，首先是基本的按钮

### 准备工作

为了方便，用了tailwindcss（是的，我就是觉得tailwindcss的可读性很高，比跳转去看实现方便的多），可以直接用cdn引入，然后定义全局变量

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style>
  body {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: #000;
    color: white;
  }
  :root {
    --accent: hsl(183 38% 57%);
    --shadow: hsl(10 100% 60%);
    --corner: 12px;
    --border: 2px;
    --clip: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--corner)),
      calc(100% - var(--corner)) 100%,
      0% 100%
    );
  }
</style>
```

## 按钮的结构和基础样式

简单的说，按钮有两层，正常显示看到的那层，Hover时另外一层glitch从隐藏变为显示

```html
<style>
  .cyber-btn {
    /* 使用变量应用切角 */
    clip-path: var(--clip);
  }

  .cyber-btn:hover {
    background-color: var(--accent);
    color: #1a1a1a;
  }

  .cyber-btn:hover > kbd {
    visibility: hidden;
  }

  .cyber-btn:is(:hover, :focus-visible) .glitch {
    display: flex; /* 悬停时显示 */
    animation: glitch 1.5s infinite; /* 并播放动画 */
  }
</style>
<button
  class="cyber-btn mx-auto mt-20 relative w-[200px] p-2 border border-[var(--accent)] text-[var(--accent)] cursor-pointer flex items-center gap-2 uppercase z-10"
  popovertarget="upgrade"
  id="showModalBtn"
>
  <kbd
    class="w-[30px] aspect-square rounded-full bg-[var(--accent)] text-[#1a1a1a] inline-grid place-items-center font-bold"
    >U</kbd
  >
  <span>Upgrade</span>
  <div
    class="glitch hidden absolute inset-0 pointer-events-none bg-black text-aqua items-center gap-2 p-2"
  >
    <span class="text-shadow-[0_1px_var(--shadow)]">Upgrade</span>
  </div>
</button>
```

## Glitch 动画

这部分是整个效果的灵魂。glitch 动画通过在极短的时间内快速切换不同的 clip-path 和 transform 位移，模拟出数字信号干扰的视觉效果。它将 glitch 层切割成不规则的碎片并使其抖动，从而产生炫酷的故障感。

```html
<style>
  :root {
    --shimmy-distance: 5px; /* 抖动距离 */
    --clip-one: polygon(
      0 2%,
      100% 2%,
      100% 95%,
      95% 95%,
      95% 90%,
      85% 90%,
      85% 95%,
      8% 95%,
      0 70%
    );
    --clip-two: polygon(
      0 78%,
      100% 78%,
      100% 100%,
      95% 100%,
      95% 90%,
      85% 90%,
      85% 100%,
      8% 100%,
      0 78%
    );
    --clip-three: polygon(
      0 44%,
      100% 44%,
      100% 54%,
      95% 54%,
      95% 54%,
      85% 54%,
      85% 54%,
      8% 54%,
      0 54%
    );
    --clip-four: polygon(
      0 0,
      100% 0,
      100% 0,
      95% 0,
      95% 0,
      85% 0,
      85% 0,
      8% 0,
      0 0
    );
    --clip-five: polygon(
      0 0,
      100% 0,
      100% 0,
      95% 0,
      95% 0,
      85% 0,
      85% 0,
      8% 0,
      0 0
    );
    --clip-six: polygon(
      0 40%,
      100% 40%,
      100% 85%,
      95% 85%,
      95% 85%,
      85% 85%,
      85% 85%,
      8% 85%,
      0 70%
    );
    --clip-seven: polygon(
      0 63%,
      100% 63%,
      100% 80%,
      95% 80%,
      95% 80%,
      85% 80%,
      85% 80%,
      8% 80%,
      0 70%
    );
  }
  @keyframes glitch {
    0% {
      clip-path: var(--clip-one);
    }
    2%,
    8% {
      clip-path: var(--clip-two);
      transform: translate(var(--shimmy-distance), 0);
    }
    6% {
      clip-path: var(--clip-two);
      transform: translate(calc(var(--shimmy-distance) * -1), 0);
    }
    9% {
      clip-path: var(--clip-two);
      transform: translate(0, 0);
    }
    10% {
      clip-path: var(--clip-three);
      transform: translate(var(--shimmy-distance), 0);
    }
    13% {
      clip-path: var(--clip-three);
      transform: translate(0, 0);
    }
    14%,
    21% {
      clip-path: var(--clip-four);
      transform: translate(var(--shimmy-distance), 0);
    }
    25% {
      clip-path: var(--clip-five);
      transform: translate(var(--shimmy-distance), 0);
    }
    30% {
      clip-path: var(--clip-five);
      transform: translate(calc(var(--shimmy-distance) * -1), 0);
    }
    35%,
    45% {
      clip-path: var(--clip-six);
      transform: translate(calc(var(--shimmy-distance) * -1));
    }
    40% {
      clip-path: var(--clip-six);
      transform: translate(var(--shimmy-distance));
    }
    50% {
      clip-path: var(--clip-six);
      transform: translate(0, 0);
    }
    55% {
      clip-path: var(--clip-seven);
      transform: translate(var(--shimmy-distance), 0);
    }
    60% {
      clip-path: var(--clip-seven);
      transform: translate(0, 0);
    }
    31%,
    61%,
    100% {
      clip-path: var(--clip-four);
    }
  }
</style>
```

不得不佩服原作者的耐心，能把动画的每一帧都调校得如此精细，我暂且不想管这是怎么弄出来的。到这里，我们的赛博朋克按钮就完成了！

## 模态框

接下来，我们为这个按钮创建一个与之匹配的模态框。模态框的动画运用了类似的 CSS 属性，但更侧重于通过 transition 和不同的 transition-delay 来营造一种元素逐个登场的序列感。

### HTML和JS

```html
<!-- 模态框 HTML -->
<div
  class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[clamp(340px,55vw,480px)] bg-transparent invisible opacity-0 z-[100] p-5"
  id="upgradeModal"
>
  <div class="relative">
    <!-- 模态框背景，会有一个展开动画 -->
    <div class="expanding-div absolute inset-0 bg-black z-[-1] border-2 border-[var(--accent)]"></div>
    
    <div class="content">
      <h2 class="text-xl uppercase text-center mb-4">
        <span>Craft of UI – Pro upgrade</span>
      </h2>
      <div class="my-5 text-center leading-relaxed">
        <p>You are one step away. Do you want to proceed?</p>
      </div>
      <div class="flex justify-around mt-5">
        <button class="cyber-btn closeModalBtn flex-1 mx-2.5">Cancel</button>
        <button class="cyber-btn closeModalBtn flex-1 mx-2.5">Proceed</button>
      </div>
    </div>
  </div>
</div>

<script>
  // 将按钮的 popovertarget 替换为 id，用于 JS 控制
  document.querySelector('.cyber-btn').id = 'showModalBtn';
  
  const showBtn = document.getElementById("showModalBtn");
  const modal = document.getElementById("upgradeModal");
  const closeBtns = document.querySelectorAll(".closeModalBtn");

  showBtn.addEventListener("click", () => {
    modal.classList.add("is-open");
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("is-open");
    });
  });
</script>
```

### 动画效果 CSS

1.模态框容器：淡入淡出。
2.侧边装饰条：利用 ::before 和 ::after 伪元素实现，从左侧滑入。
3.标题下划线：从左到右展开。
4.背景：同样从左到右展开。

```css
<style>
  .modal {
    transition: visibility 0.5s, opacity 0.5s;
  }
  .modal.is-open {
    visibility: visible;
    opacity: 1;
  }

  /* 侧边装饰条 */
  .modal::after,
  .modal::before {
    content: "";
    position: absolute;
    top: 1px;
    bottom: 1px;
    right: 100%;
    width: 1rem;
    border: var(--border) solid var(--accent);
    background: var(--accent);
    opacity: 0;
    transform: translateX(-25%);
    transition: 0.2s ease-out;
    transition-property: opacity, transform;
  }
  .modal.is-open::before,
  .modal.is-open::after {
    transition-delay: 0.2s; /* 延迟出现 */
    opacity: 1;
    transform: translateX(var(--border));
  }

  /* 标题下划线 */
  .modal h2 {
    position: relative;
  }
  .modal h2::after {
    content: "";
    height: var(--border);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--accent);
    transform-origin: 0 50%;
    transform: scaleX(0);
    transition: transform 0.26s ease-in;
    transition-delay: 0.325s; /* 延迟更久 */
  }
  .modal.is-open h2::after {
    transform: scaleX(1);
  }

  /* 背景展开效果 */
  .expanding-div {
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.5s;
    transition-delay: 0.325s;
  }
  .modal.is-open .expanding-div {
    transform: scaleX(1);
  }
</style>
```

## 总结

这个例子给我最大的启示就是，看似复杂的动画，只是由一些基础的CSS属性的组合以及精密控制实现的，