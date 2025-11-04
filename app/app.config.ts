import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

// @keep-sorted
export default defineAppConfig({
	// 将 blog.config 中的配置项复制到 appConfig，方便调用
	...blogConfig,

	component: {
		codeblock: {
			/** 代码块触发折叠的行数 */
			triggerRows: 32,
			/** 代码块折叠后的行数 */
			collapsedRows: 16,
		},

		/** 文章开头摘要 */
		excerpt: {
			animation: true,
			caret: '_',
		},

		stats: {
			/** 归档页面每年标题对应的年龄 */
			birthYear: 2007,
			/** blog-stats widget 的预置文本 */
			wordCount: '约10万',
		},
	},

	// @keep-sorted
	footer: {
		/** 页脚版权信息，支持 <br> 换行等 HTML 标签 */
		copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
		/** 侧边栏底部图标导航 */
		iconNav: [
			{
				icon: 'ph:house-bold',
				text: '个人主页',
				url: blogConfig.author.homepage,
			},
			{
				icon: 'ri:qq-line',
				text: '582783985',
				url: 'https://qm.qq.com/q/dnSwjTSCg8',
			},
			{
				icon: 'ph:github-logo-bold',
				text: 'GitHub: shenlye',
				url: 'https://github.com/shenlye',
			},
			// { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
			// {
			// 	icon: 'ph:subway-bold',
			// 	text: '开往',
			// 	url: 'https://www.travellings.cn/go-by-clouds.html',
			// },
		] satisfies NavItem[],
		/** 页脚站点地图 */
		nav: [
			// {
			// 	title: '探索',
			// 	items: [
			// 		{ icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
			// 		{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/' },
			// 	],
			// },
			// {
			// 	title: '社交',
			// 	items: [
			// 		{ icon: 'ph:github-logo-bold', text: 'L33Z22L11', url: 'https://github.com/L33Z22L11' },
			// 		{ icon: 'ri:qq-line', text: '群: 169994096', url: 'https://jq.qq.com/?_wv=1027&k=lQfNSeEd' },
			// 		{ icon: 'ph:envelope-simple-bold', text: blogConfig.author.email, url: `mailto:${blogConfig.author.email}` },
			// 	],
			// },
			// {
			// 	title: '信息',
			// 	items: [
			// 		{ icon: 'simple-icons:nuxtdotjs', text: '主题: Clarity', url: 'https://github.com/L33Z22L11/blog-v3' },
			// 		{ icon: 'ph:swatches-bold', text: '主题和组件文档', url: '/theme' },
			// 		{ icon: 'ph:certificate-bold', text: '陕ICP备2025072742号-3', url: 'https://beian.miit.gov.cn/' },
			// 	],
			// },
		] satisfies Nav,
	},

	/** 左侧栏顶部 Logo */
	header: {
		logo: '/avatar.jpg',
		/** 展示标题文本，否则展示纯 Logo */
		showTitle: true,
		subtitle: blogConfig.subtitle,
		// emojiTail: ['📄', '🦌', '🙌', '🐟', '🏖️'],
	},

	/** 左侧栏导航 */
	nav: [
		{
			title: '',
			items: [
				{ icon: 'ph:files-bold', text: '存档', url: '/' },
				{ icon: 'ph:link-bold', text: '链接', url: '/link' },
				{ icon: 'ph:archive-bold', text: '归档', url: '/archive' },
				{ icon: 'ph:game-controller-bold', text: '游戏', url: '/game' },
				{ icon: 'ph:television-simple-bold', text: '番剧', url: '/anime' },
				{ icon: 'ph:clock-bold', text: '片刻（没写完）', url: '/moments' },
				{ icon: 'ph:info-bold', text: '关于我', url: '/about' },
			],
		},
	] satisfies Nav,

	pagination: {
		perPage: 10,
		/** 默认排序方式，需要是 this.article.order 中的键名 */
		sortOrder: 'date' as const,
		/** 允许（普通/预览/归档）文章列表正序，开启后排序方式左侧图标可切换顺序 */
		allowAscending: false,
	},

	themes: {
		light: {
			icon: 'ph:sun-bold',
			tip: '浅色模式',
		},
		system: {
			icon: 'ph:monitor-bold',
			tip: '跟随系统',
		},
		dark: {
			icon: 'ph:moon-bold',
			tip: '深色模式',
		},
	},
})
