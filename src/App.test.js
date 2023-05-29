import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import App from './App.vue';

describe('App tests', () => {
	beforeEach(() => {
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
