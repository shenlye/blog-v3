<script setup lang="ts">
const appConfig = useAppConfig()
const layoutStore = useLayoutStore()
const searchStore = useSearchStore()

const { word } = storeToRefs(searchStore)
const keycut = computed(() => navigator?.userAgent.includes('Mac OS') ? '⌘K' : 'Ctrl+K')
</script>

<template>
<Transition>
	<!-- FIXME: 评估是否能公用 bgmask 减少冗余 -->
	<div v-if="layoutStore.isOpen('sidebar')" id="z-sidebar-bgmask" @click="layoutStore.toggle('sidebar')" />
</Transition>
<!-- 此处不能使用 Transition，因为半宽屏状态始终显示 -->
<aside id="z-sidebar" :class="{ show: layoutStore.isOpen('sidebar') }">
	<ZhiluHeader class="sidebar-header" to="/" />

	<nav class="sidebar-nav scrollcheck-y">
		<div class="search-btn gradient-card" @click="layoutStore.toggle('search')">
			<Icon name="ph:magnifying-glass-bold" />
			<span class="nav-text">{{ word || '搜索' }}</span>
			<span class="keycut widescreen-only">{{ keycut }}</span>
		</div>

		<template v-for="(group, groupIndex) in appConfig.nav" :key="groupIndex">
			<h3 v-if="group.title">
				{{ group.title }}
			</h3>

			<menu>
				<li v-for="(item, itemIndex) in group.items" :key="itemIndex">
					<ZRawLink :to="item.url" class="sidebar-nav-item" @click="layoutStore.toggle('sidebar')">
						<Icon :name="item.icon" />
						<span class="nav-text">{{ item.text }}</span>
						<Icon v-if="isExtLink(item.url)" class="external-tip" name="ph:arrow-up-right" />
						<div class="square-grid">
							<div v-for="i in 16" :key="i" class="square" />
						</div>
					</ZRawLink>
				</li>
			</menu>
		</template>
	</nav>

	<footer class="sidebar-footer">
		<ThemeToggle />
		<ZIconNavList :list="appConfig.footer.iconNav" />
	</footer>
</aside>
</template>

<style lang="scss" scoped>
#z-sidebar {
	display: flex;
	flex-direction: column;
	color: var(--c-text-2);

	&:hover {
		color: currentcolor;
	}

	@media (max-width: $breakpoint-mobile) {
		position: fixed;
		left: 0;
		width: 320px;
		max-width: 100%;
		background-color: var(--ld-bg-blur);
		backdrop-filter: blur(0.5rem);
		color: currentcolor;
		transform: translateX(-100%);
		transition: transform 0.2s;
		z-index: 100;

		&.show {
			box-shadow: 0 0 1rem var(--ld-shadow);
			transform: none;
		}
	}
}

#z-sidebar-bgmask {
	position: fixed;
	inset: 0;
	background-color: #0003;
	transition: opacity 0.2s;
	z-index: 100;

	&.v-enter-from,
	&.v-leave-to {
		opacity: 0;
	}

	@media (min-width: $breakpoint-mobile) {
		display: none;
	}
}

.sidebar-nav {
	flex-grow: 1;
	padding: 0 5%;
	font-size: 0.9em;

	h3 {
		margin: 2em 0 1em 1em;
		font: inherit;
		color: var(--c-text-2);
	}

	li {
		margin: 0.5em 0;
	}
}

.sidebar-nav-item {
	display: flex;
	align-items: center;
	gap: 0.5em;
	position: relative;
	height: 40px;
	padding: 0 1em;
	border: 1px solid var(--c-border);
	box-sizing: border-box;
	background-color: var(--c-bg-1);
	font-size: 0.9em;
	transition: all 0.2s;

	&::after {
		content: "";
		position: absolute;
		top: -1px;
		left: 0;
		width: 15%;
		height: 3px;
		background-color: var(--c-border);
		clip-path: polygon(0 1%, 100% 0%, 93% 100%, 0 100%);
	}

	&:hover,
	&.router-link-active {
		position: relative;
		border-color: var(--c-primary);
		border-right-color: transparent;
		border-bottom: 4px solid var(--c-primary);
		border-left-color: transparent;
		background-color: var(--c-bg-soft);
		color: var(--c-text);

		&::after {
			background-color: var(--c-primary);
		}

		&::before {
			content: "";
			position: absolute;
			opacity: 0.3;
			right: 0;
			bottom: -4px;
			left: 0;
			height: 20px;
			background-color: var(--c-primary);
			filter: blur(10px);
			z-index: -1;
		}
	}

	.iconify {
		font-size: 1.5em;
	}

	.nav-text {
		flex-grow: 1;
	}

	.external-tip {
		opacity: 0.5;
		font-size: 1em;
	}

	.square-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 1px;
		position: absolute;
		top: 8px;
		right: 8px;
		width: 7px;
		height: 7px;
	}

	.square {
		background-color: var(--c-text-3);
		transition: background-color 0.2s ease;
	}
}

.search-btn {
	display: flex;
	align-items: center;
	gap: 0.5em;
	margin: 1rem 0;
	padding: 0.5em 1em;
	outline: 1px solid var(--c-border);
	outline-offset: -1px;
	cursor: text;

	&:hover {
		outline-color: transparent;
		background-color: transparent;
	}

	.nav-text {
		opacity: 0.5;
	}

	.keycut {
		opacity: 0.5;
		padding: 0 0.2em;
		border-radius: 0.2em;
		background-color: var(--c-bg-soft);
		font-size: 0.8em;
	}
}

.sidebar-footer {
	--gap: clamp(0.5rem, 3vh, 1rem);

	display: grid;
	gap: var(--gap);
	padding: var(--gap);
	font-size: 0.8em;
	text-align: center;
	color: var(--c-text-2);
}
</style>
