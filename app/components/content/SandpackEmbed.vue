<script setup lang="ts">
import { Sandpack } from 'sandpack-vue3'

const props = defineProps<{
	/** content/ 目录下的相对路径，如 posts/2026/snooze */
	dir: string
	/** Sandpack 模板，默认 vue3 */
	template?: string
}>()

const { data: rawFiles, status } = useAsyncData(
	`sandpack:${props.dir}`,
	() => $fetch<Record<string, string>>('/api/sandpack-files', {
		query: { dir: props.dir },
	}),
)

// Vue3 模板的入口在 /src/，将文件映射到 /src/<name>
const files = computed(() => {
	if (!rawFiles.value)
		return {}
	return Object.fromEntries(
		Object.entries(rawFiles.value).map(([name, code]) => [`/src${name}`, code]),
	)
})

const hasFiles = computed(() => Object.keys(files.value).length > 0)
</script>

<template>
<ClientOnly>
	<div v-if="status === 'success' && hasFiles" class="sandpack-embed">
		<Sandpack
			:template="(template as any) ?? 'vue3'"
			:files="files"
			:options="{
				showLineNumbers: true,
				editorWidthPercentage: 50,
				showNavigator: false,
				showTabs: true,
			}"
			theme="dark"
		/>
	</div>
	<div v-else-if="status === 'success' && !hasFiles" class="sandpack-empty">
		未在 <code>content/{{ dir }}</code> 找到演示文件
	</div>
	<template #fallback>
		<div class="sandpack-skeleton">
			加载演示中…
		</div>
	</template>
</ClientOnly>
</template>

<style lang="scss" scoped>
.sandpack-embed {
	overflow: hidden;
	margin: 1em 0;
	border: 1px solid var(--c-border);
	border-radius: 8px;
}

.sandpack-skeleton {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 300px;
	border: 1px solid var(--c-border);
	border-radius: 8px;
	background: var(--c-bg-2);
	color: var(--c-text-3);
}

.sandpack-empty {
	padding: 1em;
	border: 1px solid var(--c-border);
	border-radius: 8px;
	background: var(--c-bg-2);
	font-size: 0.9em;
	color: var(--c-text-3);
}
</style>
