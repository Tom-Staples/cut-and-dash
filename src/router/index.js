import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import CustomersView from '../views/CustomersView.vue';
import BarbersView from '../views/BarbersView.vue';
import ReportsView from '../views/ReportsView.vue';
import UsersView from '../views/UsersView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView
		},
		{
			path: '/schedule',
			name: 'schedule',
			component: ScheduleView
		},
		{
			path: '/customers',
			name: 'customers',
			component: CustomersView
		},
		{
			path: '/barbers',
			name: 'barbers',
			component: BarbersView
		},
		{
			path: '/reports',
			name: 'reports',
			component: ReportsView
		},
		{
			path: '/users',
			name: 'users',
			component: UsersView
		}
	]
});

export default router;
