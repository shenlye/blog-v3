export interface Moment {
	id: string
	content: string
	images: string[]
	created_at: string
	updated_at?: string
	user?: {
		email: string
		avatar_url?: string
		display_name?: string
	}
}

export interface CreateMomentInput {
	content: string
	images?: string[]
}
