import type { CreateMomentInput, Moment } from '~/types/moment'

export function useMoments() {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const moments = ref<Moment[]>([])
	const loading = ref(false)
	const error = ref<Error | null>(null)

	async function fetchMoments(limit = 20, offset = 0) {
		loading.value = true
		error.value = null
		try {
			const { data, error: fetchError } = await supabase
				.from('moments')
				.select('*')
				.order('created_at', { ascending: false })
				.range(offset, offset + limit - 1)

			if (fetchError)
				throw fetchError
			moments.value = data || []
			return data
		}
		catch (e) {
			error.value = e as Error
			console.error('Error fetching moments:', e)
			return []
		}
		finally {
			loading.value = false
		}
	}

	async function createMoment(input: CreateMomentInput) {
		if (!user.value)
			throw new Error('User not authenticated')

		loading.value = true
		error.value = null
		try {
			const { data, error: createError } = await supabase
				.from('moments')
				.insert({
					content: input.content,
					images: input.images || [],
				})
				.select()
				.single()

			if (createError)
				throw createError

			await fetchMoments()
			return data
		}
		catch (e) {
			error.value = e as Error
			console.error('Error creating moment:', e)
			throw e
		}
		finally {
			loading.value = false
		}
	}

	async function deleteMoment(id: string) {
		if (!user.value)
			throw new Error('User not authenticated')

		loading.value = true
		error.value = null
		try {
			const { error: deleteError } = await supabase
				.from('moments')
				.delete()
				.eq('id', id)

			if (deleteError)
				throw deleteError

			moments.value = moments.value.filter(m => m.id !== id)
		}
		catch (e) {
			error.value = e as Error
			console.error('Error deleting moment:', e)
			throw e
		}
		finally {
			loading.value = false
		}
	}

	return {
		moments,
		loading,
		error,
		fetchMoments,
		createMoment,
		deleteMoment,
	}
}
