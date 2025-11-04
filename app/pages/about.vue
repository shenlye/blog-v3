<script lang="ts" setup>
const { data: postLink } = await useAsyncData('/about', () => queryCollection('content').path('/about').first())
const appConfig = useAppConfig()
useSeoMeta({
	title: '关于',
	ogType: 'profile',
	description: `${appConfig.title}的关于页面，介绍了网站的相关信息和作者的背景。`,
})
</script>

<template>
<ContentRenderer
	v-if="postLink"
	:value="postLink"
	class="article"
/>
</template>
