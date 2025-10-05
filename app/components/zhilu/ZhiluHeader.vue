<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
<ZRawLink class="zhilu-header">
	<div v-if="appConfig.header.showTitle" class="zhilu-text">
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
