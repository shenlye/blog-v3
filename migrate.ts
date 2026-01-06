import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import matter from 'gray-matter'

// Schema 定义 (保留字段但去掉 references 限制，以防外部表不存在)
export const posts = sqliteTable(
	'posts',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title'),
		description: text('description'),
		slug: text('slug').unique(),
		content: text('content').notNull(),
		cover: text('cover'),
		isPublished: integer('isPublished', { mode: 'boolean' })
			.notNull()
			.default(false),
		categoryId: integer('category_id'),
		authorId: integer('authorId'),

		createdAt: integer('createdAt', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`),
		updatedAt: integer('updatedAt', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`),
	},
	t => [
		index('created_at_idx').on(t.createdAt),
		index('category_id_idx').on(t.categoryId),
		index('is_published_idx').on(t.isPublished),
	],
)

// 连接到当前目录的 sqlite.db
const dbFile = path.join(process.cwd(), 'sqlite.db')
const sqlite = new Database(dbFile)
const db = drizzle(sqlite)

async function migrateArticles() {
	const contentDir = path.join(process.cwd(), 'content')

	if (!fs.existsSync(contentDir)) {
		console.error('Directory not found:', contentDir)
		return
	}

	// 递归获取所有 markdown 文件
	const files = fs.readdirSync(contentDir, { recursive: true }) as string[]

	for (const file of files) {
		if (!file.endsWith('.md'))
			continue

		const filePath = path.join(contentDir, file)
		const fileContent = fs.readFileSync(filePath, 'utf-8')
		const { data: frontmatter, content } = matter(fileContent)

		// 生成 slug
		let slug = frontmatter.url
		if (!slug) {
			// 如果没有 url，使用相对于 content 的路径（去掉 .md）
			slug = file.replace(/\\/g, '/').replace(/\.md$/, '')
		}

		try {
			await db.insert(posts).values({
				title: frontmatter.title || slug,
				description: frontmatter.description || null,
				slug,
				content,
				cover: frontmatter.image || null,
				isPublished: true, // 默认全部公开
				categoryId: null,
				authorId: null,
				createdAt: frontmatter.date ? new Date(frontmatter.date) : new Date(),
				updatedAt: frontmatter.updated ? new Date(frontmatter.updated) : new Date(),
			}).onConflictDoUpdate({
				target: posts.slug,
				set: {
					title: frontmatter.title || slug,
					description: frontmatter.description || null,
					content,
					cover: frontmatter.image || null,
					updatedAt: frontmatter.updated ? new Date(frontmatter.updated) : new Date(),
				},
			})
			console.log(`Migrated: ${slug}`)
		}
		catch (error) {
			console.error(`Failed to migrate ${slug}:`, error)
		}
	}
}

migrateArticles().then(() => {
	console.log('Migration finished!')
	sqlite.close()
})
