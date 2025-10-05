<script setup lang="ts">
const router = useRouter()

onMounted(() => {
	setTimeout(() => {
		router.push('/moments')
	}, 1000)
})
</script>

<template>
<div class="auth-callback">
	<p>正在验证...</p>
</div>
</template>

<style scoped lang="scss">
.auth-callback {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	font-size: 1.25rem;
	color: var(--text-secondary);
}
</style>
