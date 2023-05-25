import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import App from './App.vue';

describe('App tests', () => {
	const wrapper = shallowMount(App);
	it('does not render div by default', () => {
		expect(wrapper.find('#navContainer').exists()).toBeFalsy();
	});
});
