<script setup lang="ts">
const { currentHue, updateThemeHue, resetThemeHue, getCurrentColor }
  = useThemeColor()

const isOpen = ref(false)

const customHue = ref(currentHue.value)

watch(currentHue, (newHue) => {
	customHue.value = newHue
})

// 处理自定义色相变化
function handleCustomHueChange(event: Event) {
	const target = event.target as HTMLInputElement
	const hue = Number.parseInt(target.value, 10)
	customHue.value = hue
	updateThemeHue(hue)
}

// 点击外部关闭色盘
const colorPickerRef = ref<HTMLElement>()
onClickOutside(colorPickerRef, () => {
	isOpen.value = false
})
</script>

<template>
<div ref="colorPickerRef" class="color-picker">
	<!-- 触发按钮 -->
	<button
		v-tip="'主题色彩'"
		class="color-trigger"
		:style="{ backgroundColor: getCurrentColor }"
		aria-label="选择主题颜色"
		@click="isOpen = !isOpen"
	>
		<Icon name="ph:palette-bold" />
	</button>

	<!-- 色盘面板 -->
	<Transition name="color-panel">
		<div v-if="isOpen" class="color-panel">
			<div class="color-header">
				<span class="color-title">主题色</span>
				<button
					v-tip="'重置'"
					class="reset-btn"
					aria-label="重置主题颜色"
					@click="resetThemeHue"
				>
					<Icon name="ph:arrow-counter-clockwise-bold" />
				</button>
				<span class="hue-value">{{ currentHue }}</span>
			</div>

			<div class="slider-container">
				<input
					type="range"
					min="0"
					max="360"
					step="1"
					:value="customHue"
					class="hue-slider"
					@input="handleCustomHueChange"
				>
				<div
					class="slider-thumb"
					:style="{ left: `${(customHue / 360) * 100}%` }"
				/>
			</div>
		</div>
	</Transition>
</div>
</template>

<style lang="scss" scoped>
.color-picker {
	position: relative;
}

.color-trigger {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2rem;
	border: 2px solid var(--c-border);
	border-radius: 1rem;
	box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
	}

	.icon {
		font-size: 1.2rem;
		color: white;
		filter: drop-shadow(0 1px 2px rgb(0 0 0 / 30%));
	}
}

.color-panel {
	position: absolute;
	bottom: calc(100% + 0.5rem);
	left: 50%;
	width: 300px;
	padding: 0.75rem;
	border: 1px solid var(--c-border);
	border-radius: 0.75rem;
	box-shadow: 0 8px 32px rgb(0 0 0 / 15%);
	background: var(--c-bg);
	backdrop-filter: blur(12px);
	transform: translateX(-50%);
	transform-origin: bottom;
}

.color-header {
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
	margin-bottom: 0.75rem;
}

.color-title {
	flex: 1;
	font-size: 0.9rem;
	font-weight: 600;
	text-align: left;
	color: var(--c-text-1);
}

.reset-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.75rem;
	height: 1.75rem;
	border: 1px solid var(--c-border);
	border-radius: 0.375rem;
	background: var(--c-bg-2);
	color: var(--c-text-2);
	transition: all 0.2s ease;

	&:hover {
		background: var(--c-bg-soft);
		color: var(--c-text-1);
		transform: rotate(-90deg);
	}

	.icon {
		font-size: 0.875rem;
	}
}

.hue-value {
	min-width: 2.5rem;
	padding: 0.25rem 0.5rem;
	border: 1px solid var(--c-border);
	border-radius: 0.375rem;
	background: var(--c-bg-2);
	font-size: 0.8rem;
	font-weight: 500;
	text-align: center;
	color: var(--c-text-2);
}

.slider-container {
	position: relative;
	overflow: hidden;
	height: 2rem;
	border-radius: 0.375rem;
}

.hue-slider {
	width: 100%;
	height: 100%;
	outline: none;
	background:
		linear-gradient(
			to right,
			hsl(0deg 100% 70%),
			hsl(15deg 100% 70%),
			hsl(30deg 100% 70%),
			hsl(45deg 100% 70%),
			hsl(60deg 100% 70%),
			hsl(75deg 100% 70%),
			hsl(90deg 100% 70%),
			hsl(105deg 100% 70%),
			hsl(120deg 100% 70%),
			hsl(135deg 100% 70%),
			hsl(150deg 100% 70%),
			hsl(165deg 100% 70%),
			hsl(180deg 100% 70%),
			hsl(195deg 100% 70%),
			hsl(210deg 100% 70%),
			hsl(225deg 100% 70%),
			hsl(240deg 100% 70%),
			hsl(255deg 100% 70%),
			hsl(270deg 100% 70%),
			hsl(285deg 100% 70%),
			hsl(300deg 100% 70%),
			hsl(315deg 100% 70%),
			hsl(330deg 100% 70%),
			hsl(345deg 100% 70%),
			hsl(360deg 100% 70%)
		);
	appearance: none;
	cursor: pointer;

	// 隐藏默认的滑块thumb
	&::-webkit-slider-thumb {
		width: 0;
		height: 0;
		appearance: none;
	}

	&::-moz-range-thumb {
		width: 0;
		height: 0;
		border: none;
		background: transparent;
		appearance: none;
	}

	&::-ms-thumb {
		width: 0;
		height: 0;
		appearance: none;
	}
}

.slider-thumb {
	position: absolute;
	top: 50%;
	width: 0.5rem;
	height: 1.25rem;
	border: 3px solid white;
	border-radius: 0.1rem;
	box-shadow:
		0 2px 8px rgb(0 0 0 / 20%),
		0 0 0 1px rgb(0 0 0 / 10%);
	background: white;
	transform: translate(-50%, -50%);
	transition: all 0.15s ease;
	pointer-events: none;
	z-index: 1;
}

// 鼠标悬停时放大thumb
.slider-container:hover .slider-thumb {
	box-shadow:
		0 4px 12px rgb(0 0 0 / 25%),
		0 0 0 1px rgb(0 0 0 / 15%);
	transform: translate(-50%, -50%) scale(1.15);
}

// 面板动画
.color-panel-enter-active,
.color-panel-leave-active {
	transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.color-panel-enter-from,
.color-panel-leave-to {
	opacity: 0;
	transform: translateX(-50%) translateY(1rem) scale(0.9);
}

.color-panel-enter-to,
.color-panel-leave-from {
	opacity: 1;
	transform: translateX(-50%) translateY(0) scale(1);
}

// 在小屏幕上调整位置
@media (max-width: 640px) {
	.color-panel {
		right: -1rem;
		left: -1rem;
		min-width: auto;
	}
}
</style>
