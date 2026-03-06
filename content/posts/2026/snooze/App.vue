<script setup lang="ts">
import { ref } from 'vue'
import Counter from './Counter.vue'

const message = ref('Hello from Sandpack!')
</script>

<template>
<div style="padding: 16px; font-family: sans-serif;">
	<h2>{{ message }}</h2>
	<input v-model="message" placeholder="输入一些文字…" style=" width: 100%; margin-bottom: 12px;padding: 4px 8px;">
	<Counter />
</div>
</template>
