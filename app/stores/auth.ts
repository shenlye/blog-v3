export const useAuthStore = defineStore('auth', () => {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const isAuthenticated = computed(() => !!user.value)

	const adminEmails = [
		'582783985@qq.com',
	]

	const isAdmin = computed(() => {
		if (!user.value?.email)
			return false
		return adminEmails.includes(user.value.email)
	})

	async function signIn(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})
		if (error)
			throw error
		return data
	}

	async function signUp(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})
		if (error)
			throw error
		return data
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut()
		if (error)
			throw error
	}

	async function signInWithMagicLink(email: string) {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/callback`,
			},
		})
		if (error)
			throw error
	}

	return {
		user,
		isAuthenticated,
		isAdmin,
		signIn,
		signUp,
		signOut,
		signInWithMagicLink,
	}
})
