import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Schedule from '../views/Schedule.vue';
import Customers from '../views/Customers.vue';
import Barbers from '../views/Barbers.vue';
import Reports from '../views/Reports.vue';
import Users from '../views/Users.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/schedule',
			name: 'schedule',
			component: Schedule
		},
		{
			path: '/customers',
			name: 'customers',
			component: Customers
		},
		{
			path: '/barbers',
			name: 'barbers',
			component: Barbers
		},
		{
			path: '/reports',
			name: 'reports',
			component: Reports
		},
		{
			path: '/users',
			name: 'users',
			component: Users
		}
	]
});

export default router;
