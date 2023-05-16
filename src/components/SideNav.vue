<script setup>
	import { RouterLink } from 'vue-router';
	const navIcons = {
		dashboard: 'space_dashboard',
		schedule: 'calendar_month',
		customers: 'groups',
		barbers: 'account_box',
		reports: 'lab_profile',
		users: 'group_add'
	};
</script>

<template>
	<nav id="sideNav">
		<ul v-for="link in Object.keys(navIcons)" :key="link">
			<RouterLink :to="link"
				><li>
					<span class="material-symbols-outlined"> {{ navIcons[link] }} </span>
					<span>{{ link[0].toUpperCase() + link.substring(1) }}</span>
				</li></RouterLink
			>
		</ul>
	</nav>
</template>

<style>
	#sideNav ul {
		list-style-type: none;
		position: relative;
	}
	#sideNav li {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		padding: 20px;
		margin: 10px -40px;
		width: 225px;
	}
	#sideNav a {
		color: #000000;
		text-decoration: none;
	}
	#sideNav .router-link-active.router-link-exact-active li {
		background: rgb(97, 199, 237);
		color: #ffffff;
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48;
		position: relative;
		top: 5px;
		right: 5px;
	}
</style>
