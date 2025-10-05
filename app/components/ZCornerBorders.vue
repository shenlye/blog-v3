<script setup lang="ts">
defineProps<{
	size?: number | string
	color?: string
	strokeWidth?: number | string
}>()
</script>

<template>
<div class="corner-borders">
	<!-- 左上角 -->
	<svg class="corner-border corner-tl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" preserveAspectRatio="none">
		<polyline points="0,12 0,0 12,0" />
	</svg>
	<!-- 右上角 -->
	<svg class="corner-border corner-tr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" preserveAspectRatio="none">
		<polyline points="0,0 12,0 12,12" />
	</svg>
	<!-- 右下角 -->
	<svg class="corner-border corner-br" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" preserveAspectRatio="none">
		<polyline points="12,0 12,12 0,12" />
	</svg>
	<!-- 左下角 -->
	<svg class="corner-border corner-bl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" preserveAspectRatio="none">
		<polyline points="12,12 0,12 0,0" />
	</svg>
</div>
</template>

<style lang="scss" scoped>
.corner-borders {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.corner-border {
	position: absolute;
	width: v-bind('size ? `${size}px` : "6px"');
	height: v-bind('size ? `${size}px` : "6px"');

	polyline {
		fill: none;
		stroke: v-bind('color || "var(--c-text-3)"');
		stroke-width: v-bind('strokeWidth || "1"');
		stroke-linecap: square;
		vector-effect: non-scaling-stroke;
	}

	&.corner-tl {
		top: 0;
		left: 0;
	}

	&.corner-tr {
		top: 0;
		right: 0;
	}

	&.corner-br {
		right: 0;
		bottom: 0;
	}

	&.corner-bl {
		bottom: 0;
		left: 0;
	}
}
</style>
