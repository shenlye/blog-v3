import type { FeedGroup } from '~/types/feed'

export default [
	{
		name: '友情链接',
		desc: '',
		entries: [
			{
				title: '葱苓小筑',
				author: '葱苓sama',
				link: 'https://blog.ciraos.top',
				avatar:
          'https://mx.ciraos.top/api/v2/objects/avatar/ufh295h43mly31gmw0.avif',
				desc: 'Don\'t worry, be happy.',
				icon: 'https://mx.ciraos.top/api/v2/objects/avatar/ufh295h43mly31gmw0.avif',
				archs: ['Next.js'],
				date: '2025-04-17',
			},
			{
				title: 'Silvaire\'s Blog',
				author: 'Silvaire',
				link: 'https://qwq.blue',
				feed: 'https://qwq.blue/rss.xml',
				desc: '君埋泉下泥销骨，我寄人间雪满头。',
				icon: 'https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508&mask=circle',
				avatar:
          'https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508',
				archs: ['VitePress', 'Cloudflare'],
				date: '2025-03-18',
			},
			{
				title: '天翔TNXGの空间站',
				link: 'https://tnxgmoe.com',
				feed: 'https://tnxgmoe.com/feed',
				avatar: 'https://api-space.tnxg.top/avatar?s=qq',
				icon: 'https://tnxgmoe.com/favicon.png',
				desc: '明日尚未到来，希望凝于心上',
				archs: ['Next.js', 'Vercel'],
				author: '天翔TNXG',
				date: '2025-05-12',
			},
			{
				title: 'Pinpe 的云端',
				link: 'https://pinpe.top',
				avatar: 'https://pinpe.top/head.jpg',
				icon: 'https://pinpe.top/head.jpg',
				desc: '一个属于自己的云朵。',
				archs: ['Astro'],
				author: 'Pinpe',
				date: '2025-05-19',
			},
			{
				title: '纸鹿摸鱼处',
				link: 'https://blog.zhilu.cyou/',
				avatar: 'https://www.zhilu.cyou/api/avatar.png',
				icon: 'https://www.zhilu.cyou/api/icon.png',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				archs: ['Nuxt', 'Vercel'],
				author: '纸鹿本鹿',
				date: '2025-05-20',
				feed: 'https://blog.zhilu.cyou/atom.xml',
				comment: '此博客主题的开发者',
			},
		],
	},
] satisfies FeedGroup[]
