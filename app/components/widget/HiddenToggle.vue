<script setup lang="ts">
const showHidden = useCookie('showHidden', { default: () => false })

defineExpose({
	showHidden
})
</script>

<template>
<label class="hidden-toggle">
	<input 
		v-model="showHidden" 
		type="checkbox"
	>
	<span class="checkbox-label">
		<Icon name="ph:eye-slash-bold" />
		显示隐藏文章
	</span>
</label>
</template>

<style lang="scss" scoped>
.hidden-toggle {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	opacity: 0.7;
	transition: opacity 0.2s;
	font-size: 0.9rem;

	&:hover {
		opacity: 1;
	}

	input[type="checkbox"] {
		margin: 0;
		cursor: pointer;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		cursor: pointer;
		user-select: none;
	}
}
</style>