<script setup lang="ts">
const route = useRoute()
const layoutStore = useLayoutStore()
const config = useRuntimeConfig()

// 1. 确保 slug 获取稳定
const slug = computed(() => {
	const s = route.params.slug
	return Array.isArray(s) ? s.join('/') : (s || '')
})

const baseUrl = config.public.apiBase.replace(/\/$/, '')

const { data: post, error } = await useAsyncData(
	() => $fetch(`${baseUrl}/api/v1/posts/${slug.value}`),
	{
		watch: [slug],
		transform: (response: any) => {
			if (!response?.data)
				return null
			const p = response.data
			return {
				...p,
				path: `/${p.slug.replace(/^\//, '')}`,
				image: p.cover,
				date: p.createdAt,
				updated: p.updatedAt,
			}
		},
	},
)

// 3. SEO 应该直接基于 post 数据（不需要在 watch 里）
// Nuxt 会自动处理这里的响应式
useSeoMeta({
	title: () => post.value?.title || '加载中...',
	ogType: 'article',
	ogImage: () => post.value?.image,
	description: () => post.value?.description,
})

// 4. 处理副作用 (Store 更新)
watchEffect(() => {
	if (post.value?.meta?.aside) {
		layoutStore.setAside(post.value.meta.aside as WidgetName[])
	}
})

// 计算 excerpt
const excerpt = computed(() => post.value?.description || '')
</script>

<template>
<template v-if="post">
	<PostHeader v-bind="post" />
	<PostExcerpt v-if="excerpt" :excerpt />
	<!--
	<Alert type="warning" icon="ph:eye-slash-bold" title="隐藏文章" v-if="post.hidden">
		<p>这是一篇隐藏文章，内容不适合所有人，出于一些原因不在文章列表中显示。</p>
	</Alert>
	-->
	<!-- 使用 float-in 动画会导致搜索跳转不准确 -->
	<MDC
		:key="post.path"
		class="article"
		:class="getPostTypeClassName(post?.type, { prefix: 'md' })"
		:value="post.content || ''"
		tag="article"
	/>

	<PostFooter v-bind="post" />
	<!-- <PostSurround /> -->
	<PostComment />
</template>

<ZError
	v-else
	icon="solar:confounded-square-bold-duotone"
	title="内容为空或页面不存在"
/>
</template>
