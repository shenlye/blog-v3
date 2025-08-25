import type { NitroConfig } from 'nitropack'
import type { FeedEntry } from './app/types/feed'
import redirectList from './redirects.json'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
const blogConfig = {
	title: 'Shenley的存档点',
	bgmUsername: 'Shenley',
	subtitle: '随手存个档～',
	// 长 description 利好于 SEO
	description:
    'shenlyy的个人博客，分享技术与生活。shenlyy是一名前端初学者，结识了许多志同道合的朋友。这个博客记录了他在生活和技术学习中的点滴经历，充满启发与思考。网站界面简洁美观，内容丰富实用，人气互动活跃，涵盖了编程、生活、学习等多个领域，为读者提供了卓越的阅读体验。',
	author: {
		name: 'shenley',
		avatar: 'https://blog.ykrazy.top/avatar.jpg',
		email: '582783985@qq.com',
		homepage: 'https://shenley.cn',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: '/avatar.jpg',
	language: 'zh-CN',
	timeEstablished: '2025-02-18',
	timezone: 'Asia/Shanghai',
	url: 'https://blog.shenley.cn',

	defaultCategory: ['未分类'],

	feed: {
		limit: 50,
	},

	// 在 URL 中隐藏的路径前缀
	hideContentPrefixes: ['/posts'],

	imageDomains: [
		// 自动启用本域名的 Nuxt Image
		// 'www.zhilu.site',
		// '7.isyangs.cn',
	],

	// 禁止搜索引擎收录的路径
	robotsNotIndex: ['/preview', '/previews/*'],

	//   scripts: [
	//     // 自己部署的 Umami 统计服务
	//     {
	//       src: "https://zhi.zhilu.cyou/zhi.js",
	//       "data-website-id": "a1997c81-a42b-46f6-8d1d-8fbd67a8ef41",
	//       defer: true,
	//     },
	//     // 自己网站的 Cloudflare Insights 统计服务
	//     {
	//       src: "https://static.cloudflareinsights.com/beacon.min.js",
	//       "data-cf-beacon": '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}',
	//       defer: true,
	//     },
	//     // Twikoo 评论系统
	//     { src: "https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js", defer: true },
	//   ],

	// // 自己部署的 Twikoo 服务
	// twikoo: {
	// 	envId: 'https://twikoo.zhilu.cyou/',
	// 	preload: 'https://twikoo.zhilu.cyou/',
	// },
}

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

// 将旧页面永久重定向到新页面
const redirectRouteRules = Object.entries(redirectList)
	.reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
		acc![from] = { redirect: { to, statusCode: 301 } }
		return acc
	}, {})

// https://nitro.build/config#routerules
// 使用 EdgeOne 部署时，需要同步更新 edgeone.json
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
	...redirectRouteRules,
	'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
	'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	'/favicon.ico': { redirect: { to: blogConfig.favicon } },
	'/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig
