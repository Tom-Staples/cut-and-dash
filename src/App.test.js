import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App.vue';

describe('App tests', () => {
	beforeEach(() => {
		vi.mock('vue-router', () => ({
			useRouter: () => ({
				beforeEach: vi.fn()
			}),
			RouterView: vi.fn(),
			RouterLink: vi.fn()
		}));
		localStorage.clear();
	});

	test('does not render div by default', () => {
		const wrapper = shallowMount(App);
		expect(wrapper.find('#navContainer').exists()).toBeFalsy();
	});
	test('does render div when token in local storage', () => {
		localStorage.setItem(
			'token',
			JSON.stringify({ access_token: 'tjjadjhdbjha' })
		);
		const wrapper = shallowMount(App);
		expect(wrapper.find('#navContainer').exists()).toBeTruthy();
	});
});
