<script setup>
	import SideNav from './components/SideNav.vue';
	import { RouterLink } from 'vue-router';
</script>

<template>
	<div id="navContainer">
		<RouterLink to="dashboard"><h1>Cut-and-Dash</h1></RouterLink>
		<SideNav />
	</div>
</template>

<style scoped>
	#navContainer {
		display: flex;
		flex-direction: column;
		width: 300px;
	}
	#navContainer h1 {
		margin: 20px 20px;
	}
	#navContainer a {
		text-decoration: none;
		color: rgb(97, 199, 237);
	}
</style>
