<script setup lang="ts">
import { useNotifier } from './composables/notifier';

const notifier = useNotifier();
function incrementer() {
	notifier.$emit(val => val + 1);
	// or notifier.$emit(notifier.$state.value + 1);
}
</script>

<template>
	<button style="margin: 5rem; padding: 2rem; border-radius: 50%" @click="incrementer()">Increase Count</button>
</template>
