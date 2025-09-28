export function useThemeColor() {
	// 从 localStorage 获取保存的色相值，默认为 250（蓝色）
	const currentHue = ref(250)

	const updateThemeHue = (hue: number) => {
		if (import.meta.client) {
			currentHue.value = hue
			document.documentElement.style.setProperty('--hue-theme', `${hue}deg`)
			localStorage.setItem('theme-hue', hue.toString())
		}
	}
	// 在客户端初始化时从 localStorage 读取
	onMounted(() => {
		const savedHue = localStorage.getItem('theme-hue')
		if (savedHue) {
			const hue = Number.parseInt(savedHue, 10)
			currentHue.value = hue
			document.documentElement.style.setProperty('--hue-theme', `${hue}deg`)
		}
	})

	// 更新 CSS 变量的函数

	// 重置为默认色相
	const resetThemeHue = () => {
		updateThemeHue(250)
	}

	// 获取当前色相对应的颜色字符串（用于预览）
	const getCurrentColor = computed(() => {
		return `hsl(${currentHue.value}, 100%, 70%)`
	})

	return {
		currentHue: readonly(currentHue),
		updateThemeHue,
		resetThemeHue,
		getCurrentColor,
	}
}
