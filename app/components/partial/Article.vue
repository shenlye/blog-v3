<script setup lang="ts">
import type ArticleProps from '~/types/article'

const props = defineProps<{ useUpdated?: boolean } & ArticleProps>()

const appConfig = useAppConfig()

const showAllDate = isTimeDiffSignificant(props.date, props.updated)

const categoryLabel = computed(() => props.categories?.[0])
const categoryColor = computed(() => appConfig.article.categories[categoryLabel.value!]?.color)
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))
</script>

<template>
<ZRawLink class="article-card card">
	<div class="card-hover-overlay" />
	<NuxtImg v-if="image" class="article-cover" :src="image" :alt="title" />
	<article class="article-content">
		<h2 class="article-title text-creative">
			{{ title }}
		</h2>

		<p v-if="description" class="article-descrption">
			{{ description }}
		</p>

		<div class="article-info" data-allow-mismatch>
			<time
				v-if="showAllDate || !useUpdated"
				:datetime="getIsoDatetime(date)"
				:title="getLocaleDatetime(date)"
			>
				<Icon name="ph:calendar-dots-bold" />
				{{ getPostDate(date) }}
			</time>

			<!-- 带查询参数时会水合错误 -->
			<ClientOnly>
				<span
					v-if="categoryLabel"
					class="article-category"
					:style="{ '--cg-color': categoryColor }"
				>
					<Icon :name="categoryIcon" />
					{{ categoryLabel }}
				</span>
			</ClientOnly>
		</div>
	</article>
</ZRawLink>
</template>

<style lang="scss" scoped>
.article-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
}

.card-hover-overlay {
	position: absolute;
	opacity: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: all 0.2s;
	z-index: -1;

	.article-card:hover & {
		opacity: 1;
		box-shadow: inset 0 1px 0 0 rgb(148 163 184 / 10%);
		background-color: var(--ld-bg-card);
	}
}

.article-card {
	container-type: inline-size;
	position: relative;
	margin: 1rem 0;
	color: var(--c-text);
	animation: float-in 0.2s var(--delay) backwards;

	> article {
		gap: 0.5rem;
		padding: 1rem;
	}
}

.article-info {
	display: flex;
	flex-wrap: wrap;
	justify-content: end;
	gap: 0.5em clamp(1em, 5%, 1.5em);
	width: 100%;
	font-size: 0.8em;
	text-align: center;
	color: var(--c-text-1);

	&:empty {
		display: none;
	}

	.use-updated {
		order: -1;
	}
}

.article-title {
	font-size: 1.1em;
	text-align: center;
	color: var(--c-text);
}

.article-descrption {
	display: -webkit-box;
	overflow: hidden;
	max-height: calc(1.4em * 3);
	padding: 0 1em;
	font-size: 0.9em;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	line-height: 1.4;
	text-align: left;
	text-overflow: ellipsis;
	color: var(--c-text-2);
	-webkit-box-orient: vertical;
}

.article-category {
	color: var(--cg-color);
}

.article-cover {
	position: absolute;
	opacity: 0.6;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	transition: all 0.2s;
	object-fit: cover;

	:hover > & {
		opacity: 1;
	}

	& + article {
		position: relative;
	}

	@mixin cover-narrow {
		position: revert;
		width: 100%;
		height: auto;
		max-width: none;
		max-height: 256px;
		aspect-ratio: 2.4;
		margin-bottom: -10%;
		mask-image: linear-gradient(#FFF 50%, transparent);

		& + article {
			width: auto;
			background-color: var(--ld-bg-card);
		}
	}

	@media (max-width: $breakpoint-phone) {
		@include cover-narrow;
	}

	@container (max-width: #{$breakpoint-phone}) {
		@include cover-narrow;
	}
}
</style>
