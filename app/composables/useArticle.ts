import type ArticleProps from '~/types/article'
import type { ArticleOrderType } from '~/types/article'
import { alphabetical } from 'radash'

export function useArticleIndex(path = 'posts/%', showHidden: MaybeRefOrGetter<boolean> = false) {
	const config = useRuntimeConfig()
	return useAsyncData(
		() => `index_${path}_${toValue(showHidden)}`,
		async () => {
			const baseUrl = config.public.apiBase.endsWith('/')
				? config.public.apiBase.slice(0, -1)
				: config.public.apiBase
			const response = await $fetch<any>(`${baseUrl}/api/v1/posts`, {
				query: {
					page: '1',
					limit: '10',
				},
			})
			const list = (response.data || []).map((post: any) => {
				const rawSlug = post.slug.replace(/^\//, '')
				// 确保 path 始终带有 /posts/ 前缀（除非 slug 本身已经带了）
				let pathFromSlug = rawSlug
				if (path.startsWith('posts') && !rawSlug.startsWith('posts/'))
					pathFromSlug = `posts/${rawSlug}`

				return {
					...post,
					path: `/${pathFromSlug}`,
					image: post.cover,
					date: post.createdAt,
					updated: post.updatedAt,
					categories: post.categories || [],
					tags: post.tags || [],
					recommend: post.recommend || 0,
				}
			})

			// 对于新 API 的文章列表，我们通常可以直接返回全部（由后端过滤）
			if (path.startsWith('posts'))
				return list

			// 模拟 SQL LIKE (仅用于非文章列表，如 previews%)
			const pattern = path.replace(/%/g, '.*')
			const regex = new RegExp(`^${pattern}$`, 'i')
			return list.filter((item: any) => regex.test(item.slug.replace(/^\//, '')))
		},
		{
			default: () => [],
			watch: [() => toValue(showHidden)],
		},
	)
}

interface UseCategoryOptions {
	bindQuery?: string | false
}

export function useCategory(list: MaybeRefOrGetter<ArticleProps[]>, options?: UseCategoryOptions) {
	const { bindQuery } = options ?? {}
	const category = bindQuery
		? useRouteQuery(bindQuery, undefined, { transform: (value?: string) => value, mode: 'push' })
		: ref<string | undefined>()
	const categories = computed(() => {
		const cats = toValue(list).map(item => item.categories?.[0]).filter(Boolean) as string[]
		return [...new Set(cats)]
	})
	const listCategorized = computed(
		() => toValue(list).filter(
			item => !category.value || item.categories?.[0] === category.value,
		),
	)

	return {
		category,
		categories,
		listCategorized,
	}
}

export function useArticleSort(list: MaybeRefOrGetter<ArticleProps[]>) {
	const appConfig = useAppConfig()
	const sortOrder = ref<ArticleOrderType>(appConfig.pagination.sortOrder || 'date')
	const isAscending = ref<boolean>()
	const listSorted = computed(() => alphabetical(
		toValue(list),
		item => item[sortOrder.value] || '',
		isAscending.value ? 'asc' : 'desc',
	))
	return {
		sortOrder,
		isAscending,
		listSorted,
	}
}

export function getCategoryIcon(category?: string) {
	const appConfig = useAppConfig()
	return appConfig.article.categories[category!]?.icon ?? 'ph:folder-bold'
}

export function getPostTypeClassName(type?: string, options = {
	prefix: 'text',
}) {
	if (!type)
		type = 'tech'

	const { prefix } = options

	return `${prefix}-${type}`
}
