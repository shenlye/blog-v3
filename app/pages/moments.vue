<script setup lang="ts">
import type { CreateMomentInput } from '~/types/moment'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

definePageMeta({
	title: '动态',
})

const authStore = useAuthStore()
const { moments, loading, fetchMoments, createMoment, deleteMoment } = useMoments()

const newMoment = ref<CreateMomentInput>({
	content: '',
	images: [],
})

const canSubmit = computed(() => {
	return newMoment.value.content.trim().length > 0
})

function addImageField() {
	if (!newMoment.value.images)
		newMoment.value.images = []

	newMoment.value.images.push('')
}

function removeImageField(index: number) {
	if (newMoment.value.images)
		newMoment.value.images.splice(index, 1)
}

async function submitMoment() {
	try {
		// 过滤掉空的图片 URL
		const images = newMoment.value.images?.filter(url => url.trim()) || []

		await createMoment({
			content: newMoment.value.content,
			images,
		})

		// 重置表单
		newMoment.value = {
			content: '',
			images: [],
		}
	}
	catch (error) {
		console.error('Failed to create moment:', error)
		alert('发布失败，请重试')
	}
}

function canDelete(moment: any) {
	return authStore.user?.id === moment.user_id
}

async function handleDelete(id: string) {
	if (!confirm('确定要删除这条动态吗?'))
		return

	try {
		await deleteMoment(id)
	}
	catch (error) {
		console.error('Failed to delete moment:', error)
		alert('删除失败，请重试')
	}
}

function formatTime(dateString: string) {
	return formatDistanceToNow(new Date(dateString), {
		addSuffix: true,
		locale: zhCN,
	})
}

// 加载动态
onMounted(() => {
	fetchMoments()
})
</script>

<template>
<div class="moments-page">
	<div class="container">
		<h1 class="title">
			动态
		</h1>

		<!-- 发布动态表单 - 仅管理员可见 -->
		<div v-if="authStore.isAdmin" class="moment-form">
			<textarea
				v-model="newMoment.content"
				placeholder="分享你的想法..."
				rows="4"
			/>

			<div class="image-urls">
				<div
					v-for="(url, index) in newMoment.images"
					:key="index"
					class="image-input-row"
				>
					<input
						v-model="newMoment.images![index]"
						type="url"
						:placeholder="`图片 ${index + 1} URL`"
					>
					<button
						type="button"
						class="remove-btn"
						@click="removeImageField(index)"
					>
						×
					</button>
				</div>
				<button
					type="button"
					class="add-image-btn"
					@click="addImageField"
				>
					+ 添加图片
				</button>
			</div>

			<div class="form-actions">
				<button
					:disabled="!canSubmit || loading"
					@click="submitMoment"
				>
					{{ loading ? '发布中...' : '发布' }}
				</button>
			</div>
		</div>

		<!-- 非管理员提示 -->
		<div v-else-if="authStore.isAuthenticated" class="admin-only">
			<p>仅管理员可以发布动态</p>
		</div>

		<!-- 登录提示 -->
		<div v-else class="login-prompt">
			<p>
				<NuxtLink to="/login">
					登录
				</NuxtLink>后即可发布动态
			</p>
		</div>

		<!-- 动态列表 -->
		<div class="moments-list">
			<div v-if="loading && moments.length === 0" class="loading">
				加载中...
			</div>

			<div v-else-if="moments.length === 0" class="empty">
				暂无动态
			</div>

			<div v-else>
				<div
					v-for="moment in moments"
					:key="moment.id"
					class="moment-item"
				>
					<ZCornerBorders />
					<div class="moment-header">
						<div class="author-info">
							<img
								src="/avatar.jpg"
								alt="头像"
								class="avatar"
							>
							<span class="author-name">Shenley</span>
						</div>
						<div class="header-right">
							<span class="moment-time">{{ formatTime(moment.created_at) }}</span>
							<button
								v-if="canDelete(moment)"
								class="delete-btn"
								@click="handleDelete(moment.id)"
							>
								删除
							</button>
						</div>
					</div>

					<div class="moment-content">
						{{ moment.content }}
					</div>

					<div v-if="moment.images?.length" class="moment-images">
						<a
							v-for="(url, index) in moment.images"
							:key="index"
							:href="url"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								:src="url"
								:alt="`图片 ${index + 1}`"
								loading="lazy"
							>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped lang="scss">
.moments-page {
	max-width: 40rem;
	margin: 0 auto;
	padding: 2rem 1rem;
}

.container {
	h1 {
		margin-bottom: 2rem;
	}
}

.moment-form {
	margin-bottom: 3rem;
	padding: 1.5rem;
	border: 1px solid var(--border-color);
	border-radius: 8px;

	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		font-family: inherit;
		resize: vertical;
	}

	.image-urls {
		margin-top: 1rem;

		.image-input-row {
			display: flex;
			gap: 0.5rem;
			margin-bottom: 0.5rem;

			input {
				flex: 1;
				padding: 0.5rem;
				border: 1px solid var(--border-color);
				border-radius: 4px;
			}

			.remove-btn {
				width: 32px;
				padding: 0.5rem;
				border: 1px solid var(--danger-color);
				border-radius: 4px;
				background: transparent;
				font-size: 1.25rem;
				line-height: 1;
				color: var(--danger-color);
				cursor: pointer;

				&:hover {
					background: var(--danger-color);
					color: white;
				}
			}
		}

		.add-image-btn {
			padding: 0.5rem 1rem;
			border: 1px dashed var(--border-color);
			border-radius: 4px;
			background: transparent;
			color: var(--text-secondary);
			cursor: pointer;

			&:hover {
				border-color: var(--primary-color);
				color: var(--primary-color);
			}
		}
	}

	.form-actions {
		margin-top: 1rem;
		text-align: right;

		button {
			padding: 0.75rem 2rem;
			border: none;
			border-radius: 4px;
			background: var(--primary-color);
			font-weight: 500;
			color: white;
			cursor: pointer;

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&:not(:disabled):hover {
				opacity: 0.9;
			}
		}
	}
}

.admin-only,
.login-prompt {
	margin-bottom: 2rem;
	padding: 2rem;
	border-radius: 8px;
	background: var(--bg-secondary);
	text-align: center;

	a {
		text-decoration: none;
		color: var(--primary-color);

		&:hover {
			text-decoration: underline;
		}
	}
}

.moments-list {
	.loading,
	.empty {
		padding: 3rem;
		text-align: center;
		color: var(--text-secondary);
	}
}

.moment-item {
	position: relative;
	margin-bottom: 2rem;
	padding: 1.5rem;
	border: 1px solid var(--c-border);
	border-radius: 1px;
	background-color: var(--c-bg-2);

	.moment-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;

		.author-info {
			display: flex;
			align-items: center;
			gap: 0.75rem;

			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 3px;
				object-fit: cover;
			}

			.author-name {
				font-size: 0.95rem;
				font-weight: 500;
			}
		}

		.header-right {
			display: flex;
			align-items: center;
			gap: 1rem;

			.moment-time {
				font-size: 0.875rem;
				color: var(--text-secondary);
			}

			.delete-btn {
				padding: 0.25rem 0.75rem;
				border: 1px solid var(--danger-color);
				border-radius: 4px;
				background: transparent;
				font-size: 0.875rem;
				color: var(--danger-color);
				cursor: pointer;

				&:hover {
					background: var(--danger-color);
					color: white;
				}
			}
		}
	}

	.moment-content {
		margin-bottom: 1rem;
		padding-left: 52px;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.moment-images {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.5rem;
		padding-left: 52px;

		img {
			width: 100%;
			height: 200px;
			border-radius: 4px;
			object-fit: cover;
		}
	}
}
</style>
