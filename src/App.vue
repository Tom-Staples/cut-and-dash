<script setup>
	import { ref } from 'vue';
	import { RouterLink, RouterView } from 'vue-router';
	import SideNav from './components/SideNav.vue';
	import router from './router';

	// Reactive state
	const token = ref(false);

	//Redirect to login page if user is not authenticated
	router.beforeEach(async to => {
		if (!token.value && to.name !== 'home') {
			return { name: 'home' };
		}
		if (token.value && to.name === 'home') {
			return { name: 'dashboard' };
		}
	});
</script>

<template>
	<main>
		<div v-if="token" id="navContainer">
			<RouterLink to="dashboard"><h1>Cut-and-Dash</h1></RouterLink>
			<SideNav />
		</div>
		<RouterView />
	</main>
</template>

<style scoped>
	main {
		display: grid;
		grid-template-columns: max-content auto;
		height: 100vh;
	}
	#navContainer {
		display: flex;
		flex-direction: column;
		width: 300px;
	}
	#navContainer h1,
	h1 {
		margin: 20px 20px;
	}
	#navContainer a,
	h1 {
		text-decoration: none;
		color: rgb(97, 199, 237);
	}
</style>
