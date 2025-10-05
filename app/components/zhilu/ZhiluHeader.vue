<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
<ZRawLink class="zhilu-header">
	<div v-if="appConfig.header.showTitle" class="zhilu-text">
		<div class="header-1">
			<div class="title-1">
				> Save Point
			</div>
			<div>
				个人网站
			</div>
		</div>
		<div class="header-title">
			<span
				v-for="(char, charIndex) in appConfig.title"
				:key="charIndex"
				class="splitted-char"
				:style="{ '--delay': `${(charIndex + 1) * .1}s` }"
				v-text="char"
			/>
		</div>
		<div class="header-subtitle">
			{{ appConfig.header.subtitle }}
		</div>
	</div>
</ZRawLink>
</template>

<style lang="scss" scoped>
.header-1 {
	display: flex;

	.title-1 {
		margin-right: 0.5em;
		padding: 1px 10px;
		box-shadow: var(--c-primary) 0 0 8px;
		background: var(--c-primary);
		color: var(--c-bg-1);
	}
}

.zhilu-header {
	display: flex;
	align-items: center;
	gap: 0.5em;
	position: relative;
	margin: clamp(1rem, 2rem, 5vh) 1rem min(1rem, 5vh);
	line-height: 1.4;
	color: var(--c-text);
	user-select: none;
}

@font-face {
	font-family: AlimamaFangYuanTi;
	src: url("/fonts/AlimamaFangYuanTi.woff2");
}

.header-title {
	&::before {
		content: "";
		position: absolute;
		inset: 26px 0 14px;
		background-image: radial-gradient(circle, var(--c-text-3) 0.1px, transparent 0.5px);
		background-size: 4px 4px;
		pointer-events: none;
		z-index: -1;
	}

	font-family: AlimamaFangYuanTi, "Noto Sans SC", sans-serif;
	font-size: 1.5em;
	font-synthesis: none;
	font-variation-settings: "wght" 600, "BEVL" 100;

	> .splitted-char {
		animation: 3.14s infinite alternate vf-weight, 2.72s infinite alternate vf-bevel;
		animation-delay: var(--delay);
		animation-play-state: paused;
	}
}

.header-subtitle {
	opacity: 0.5;
	font-size: 0.8em;
}
</style>
