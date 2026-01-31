<template>
<div class="deprecation-banner">
	停止维护，看不下去了，也改不下去了，新站请访问 <a href="https://shenley.cn" target="_blank">shenley.cn</a> 访问不了就是还没写好（
</div>
<NuxtLoadingIndicator />
<SkipToContent />
<ZSidebar />
<div id="content">
	<main id="main-content">
		<NuxtPage />
		<ZFooter />
	</main>
	<ZAside />
</div>
<ZPanel />
<ZPopover />
</template>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style lang="scss">
.deprecation-banner {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9999;
	padding: 0.75rem 1rem;
	background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
	color: white;
	text-align: center;
	font-weight: 500;
	font-size: 0.95rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

	a {
		color: #fff;
		font-weight: 700;
		text-decoration: underline;
		margin-left: 0.25rem;

		&:hover {
			text-decoration: none;
		}
	}
}

// Nuxt 根元素 id
#z-root {
	display: flex;
	gap: 1rem;
	min-width: 0;
	padding-top: 45px; // 为横幅留出空间
}

// 合并处理 #z-sidebar, #z-aside
aside {
	flex-shrink: 0;
	position: sticky;
	top: 0;
	width: 300px;
	height: 100vh;
	height: 100dvh;
	font-family: "Chakra Petch", var(--font-creative);
	scrollbar-width: thin;

	@media (max-width: $breakpoint-widescreen) {
		flex-shrink: 0.2;
	}
}

#content {
	display: flex;
	gap: 1rem;

	// 若设置的是 max-width，则内部 main 宽度为 fit-content，可能无法撑满
	// 此时即使设置 flex-grow，也会影响 #sidebar 无法正确 shrink
	width: $breakpoint-widescreen;
	min-width: 0; // 解决父级 flexbox 设置 justify-content: center 时溢出左侧消失的问题
	margin: 0 auto;

	// 此处不建议给内容设置 padding
	> main {
		flex-grow: 1; // 使较小宽度的内容占满

		// overflow: hidden; // 会使一部分元素吸顶失效

		// 使内容正确计算宽度而不横向溢出
		// 也可设置 width: 0 或者 contain: inline-size（兼容性不佳）
		min-width: 0;
	}
}
</style>
