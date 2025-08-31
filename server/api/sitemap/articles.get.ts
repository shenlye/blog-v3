import blogConfig from '~~/blog.config'

export default defineEventHandler(async (event) => {
	const articles = await queryCollection(event, 'content')
		.where('stem', 'LIKE', 'posts/%')
		.all()

	const urls = articles.map((article) => {
		const url = new URL(article.path, blogConfig.url).toString()
		return {
			url,
			lastModified: article.updated || article.date,
			priority: 0.8,
		}
	})

	return urls
})
