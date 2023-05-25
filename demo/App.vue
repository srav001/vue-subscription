<script setup lang="ts">
import { ref } from 'vue';
import ChildComp from './childComp.vue';
import { useNotifier } from './composables/notifier';

const testValue = ref(0);
const notifier = useNotifier();
notifier.$on(value => {
	testValue.value = value;
});
</script>

<template>
	<div style="margin: 10rem">
		<h1>{{ testValue }}</h1>

		<hr style="margin-top: 5rem; margin-bottom: 5rem" />
		<h1>{{ notifier.$state.value }}</h1>
		<ChildComp />
	</div>
</template>
