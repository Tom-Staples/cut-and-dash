<script setup>
	defineProps(['message']);
</script>

<template>
	<span class="errorMessage">Error: {{ message }}</span>
</template>

<style>
	.errorMessage {
		text-align: center;
		margin: 10px 0;
		color: red;
	}
</style>
