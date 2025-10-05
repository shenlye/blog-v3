<script setup lang="ts">
definePageMeta({
	title: '登录',
	layout: false,
})

const authStore = useAuthStore()
const router = useRouter()

const isSignUp = ref(false)
const loading = ref(false)
const error = ref('')
const magicLinkSent = ref(false)

const form = reactive({
	email: '',
	password: '',
})

function toggleMode() {
	isSignUp.value = !isSignUp.value
	error.value = ''
	magicLinkSent.value = false
}

async function handleSubmit() {
	loading.value = true
	error.value = ''

	try {
		if (isSignUp.value) {
			await authStore.signUp(form.email, form.password)
			alert('注册成功！请检查邮箱验证链接')
		}
		else {
			await authStore.signIn(form.email, form.password)
			router.push('/moments')
		}
	}
	catch (e: any) {
		error.value = e.message || '操作失败，请重试'
	}
	finally {
		loading.value = false
	}
}

async function handleMagicLink() {
	if (!form.email) {
		error.value = '请输入邮箱地址'
		return
	}

	loading.value = true
	error.value = ''

	try {
		await authStore.signInWithMagicLink(form.email)
		magicLinkSent.value = true
		alert('魔法链接已发送到您的邮箱！')
	}
	catch (e: any) {
		error.value = e.message || '发送失败，请重试'
	}
	finally {
		loading.value = false
	}
}
</script>

<template>
<div class="login-page">
	<div class="login-container">
		<h1>{{ isSignUp ? '注册' : '登录' }}</h1>

		<form @submit.prevent="handleSubmit">
			<div class="form-group">
				<label for="email">邮箱</label>
				<input
					id="email"
					v-model="form.email"
					type="email"
					required
					placeholder="your@email.com"
				>
			</div>

			<div class="form-group">
				<label for="password">密码</label>
				<input
					id="password"
					v-model="form.password"
					type="password"
					required
					placeholder="••••••••"
					minlength="6"
				>
			</div>

			<div v-if="error" class="error-message">
				{{ error }}
			</div>

			<button type="submit" :disabled="loading" class="submit-btn">
				{{ loading ? '处理中...' : (isSignUp ? '注册' : '登录') }}
			</button>
		</form>

		<div class="divider">
			或
		</div>

		<button
			type="button"
			class="magic-link-btn"
			:disabled="loading"
			@click="handleMagicLink"
		>
			使用魔法链接登录
		</button>

		<div class="toggle-mode">
			<button type="button" @click="toggleMode">
				{{ isSignUp ? '已有账号？去登录' : '没有账号？去注册' }}
			</button>
		</div>
	</div>
</div>
</template>

<style scoped lang="scss">
.login-page {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	min-height: 100vh;
	padding: 2rem;
}

.login-container {
	position: relative;
	width: 100%;
	max-width: 420px;
	padding: 3rem 2.5rem;

	h1 {
		margin-bottom: 2.5rem;
		font-size: 2rem;
		font-weight: 700;
		text-align: left;
		color: var(--c-text);
	}
}

.form-group {
	margin-bottom: 1.5rem;

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--c-text-1);
	}

	input {
		width: 100%;
		padding: 0.4rem 1rem;
		border: 2px solid var(--c-border);
		border-radius: 8px;
		background: var(--c-bg-1);
		font-family: inherit;
		font-size: 1rem;
		color: var(--c-text-1);
		transition: all 0.3s ease;

		&:focus {
			border-color: var(--c-primary);
			box-shadow: 0 0 0 4px var(--c-primary-soft);
			outline: none;
			background: var(--c-bg);
		}

		&:hover:not(:focus) {
			border-color: var(--c-text-3);
		}
	}
}

.error-message {
	margin-bottom: 1rem;
	padding: 0.875rem 1rem;
	border-left: 4px solid #E53E3E;
	border-radius: 8px;
	background: linear-gradient(90deg, rgb(229 62 62 / 10%) 0%, transparent 100%);
	font-size: 0.875rem;
	color: #E53E3E;
	animation: shake 0.4s ease;
}

@keyframes shake {
	0%, 100% { transform: translateX(0); }
	25% { transform: translateX(-8px); }
	75% { transform: translateX(8px); }
}

.submit-btn,
.magic-link-btn {
	position: relative;
	overflow: hidden;
	width: 100%;
	padding: 0.5rem 1.5rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
	letter-spacing: 0.02em;
	transition: all 0.3s ease;
	cursor: pointer;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgb(255 255 255 / 30%);
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
	}

	&:active::before {
		width: 300px;
		height: 300px;
	}

	&:disabled {
		opacity: 0.6;
		transform: none !important;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		box-shadow: 0 6px 20px var(--ld-shadow);
		transform: translateY(-2px);
	}

	&:not(:disabled):active {
		transform: translateY(0);
	}
}

.submit-btn {
	box-shadow: 0 4px 12px var(--c-primary-soft);
	background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent, var(--c-primary)) 100%);
	color: white;

	&:not(:disabled):hover {
		box-shadow: 0 6px 20px var(--c-primary-soft);
	}
}

.magic-link-btn {
	border: 2px solid var(--c-primary);
	background: var(--c-bg);
	color: var(--c-primary);

	&:not(:disabled):hover {
		border-color: var(--c-primary);
		background: var(--c-primary-soft);
	}
}

.divider {
	position: relative;
	margin: 2rem 0;
	font-size: 0.875rem;
	font-weight: 500;
	text-align: center;
	color: var(--c-text-2);

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		width: calc(50% - 2rem);
		height: 1px;
		background:
			linear-gradient(
				to right,
				transparent,
				var(--c-border),
				transparent
			);
	}

	&::before {
		left: 0;
	}

	&::after {
		right: 0;
	}
}

.toggle-mode {
	margin-top: 2rem;
	padding-top: 1.5rem;
	border-top: 1px solid var(--c-border);
	text-align: center;

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		background: transparent;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--c-primary);
		transition: all 0.2s ease;
		cursor: pointer;

		&:hover {
			background: var(--c-primary-soft);
			transform: translateY(-1px);
		}

		&:active {
			transform: translateY(0);
		}
	}
}
</style>
