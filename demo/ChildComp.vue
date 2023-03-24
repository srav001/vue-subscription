<script setup lang="ts">
import { useEventBus } from './composables/eventBus';

const eventBus = useEventBus();
function incrementer() {
	eventBus.$emit(eventBus.$state.value + 1);
}
</script>

<template>
	<button style="margin: 5rem; padding: 2rem; border-radius: 50%" @click="incrementer()">Increase Count</button>
</template>
