<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
<div style="display: flex; align-items: center; gap: 8px;">
	<button style="padding: 4px 12px;" @click="count--">
		-
	</button>
	<span style="min-width: 2em; text-align: center;">{{ count }}</span>
	<button style="padding: 4px 12px;" @click="count++">
		+
	</button>
</div>
</template>
