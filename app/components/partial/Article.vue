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
	<NuxtImg v-if="image" class="article-cover" :src="image" :alt="title" />
	<article>
		<div class="article-info" data-allow-mismatch>
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

			<time
				v-if="showAllDate || !useUpdated"
				class="hover-show"
				:datetime="getIsoDatetime(date)"
				:title="getLocaleDatetime(date)"
			>
				<Icon name="ph:calendar-dots-bold" />
				{{ getPostDate(date) }}
			</time>

			<time
				v-if="showAllDate || useUpdated"
				:class="{ 'use-updated': useUpdated }"
				class="hover-show"
				:datetime="getIsoDatetime(updated)"
				:title="getLocaleDatetime(updated)"
			>
				<Icon name="ph:calendar-plus-bold" />
				{{ getPostDate(props.updated) }}
			</time>

			<span v-if="readingTime?.words" class="article-words hover-show">
				<Icon name="ph:paragraph-bold" />
				{{ formatNumber(readingTime?.words) }}字
			</span>
		</div>

		<h2 class="article-title text-creative">
			{{ title }}
		</h2>

		<p v-if="description" class="article-descrption">
			{{ description }}
		</p>
	</article>
</ZRawLink>
</template>

<style lang="scss" scoped>
.article-card {
	container-type: inline-size;
	position: relative;
	border-top: 1px solid var(--c-border);
	color: var(--c-text);
	transition: all 0.3s ease;
	animation: float-in 0.8s var(--delay) backwards;

	&:hover {
		border-top-color: var(--c-primary);
		box-shadow: 0 0.5em 1em var(--ld-shadow);
		transform: translateY(-3px);

		&::before {
			content: "";
			position: absolute;
			opacity: 0.5;
			top: -4px;
			right: 0;
			left: 0;
			height: 1em;
			background-color: var(--c-primary);
			filter: blur(32px);
			z-index: -1;
		}

		.article-category {
			background-color: var(--c-primary);
			color: var(--c-bg);
		}
	}

	> article {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
	}
}

.article-info {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em clamp(0.8em, 5%, 1em);
	order: -1;
	font-size: 0.7em;
	color: var(--c-text-2);

	&:empty {
		display: none;
	}

	.use-updated {
		order: -1;
	}

	.hover-show {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.article-card:hover & .hover-show {
		opacity: 1;
	}
}

.article-title {
	display: inline-block;
	position: relative;
	width: fit-content;
	max-width: 100%;
	font-size: 1.1em;
	color: var(--c-text);

	&::before {
		content: "";
		position: absolute;
		top: 6px;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: radial-gradient(circle, var(--c-text-3) 0.1px, transparent 0.5px);
		background-size: 4px 4px;
		pointer-events: none;
		z-index: -1;
	}
}

.article-descrption {
	font-size: 0.8em;
	color: var(--c-text-2);
}

.article-category {
	padding: 1px 5px;
	color: var(--cg-color);
}

.article-cover {
	position: absolute;
	opacity: 0.8;
	top: 0;
	right: 0;
	width: min(320px, 50%);
	height: 100%;
	margin: 0;
	mask-image: linear-gradient(to right, transparent, #FFF 50%);
	transition: all 0.2s;
	object-fit: cover;

	:hover > & {
		opacity: 1;
	}

	& + article {
		position: relative;
		width: 60%;
		text-shadow: 0 0 0.5rem var(--ld-bg-card), 0 0 1rem var(--ld-bg-card);
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
