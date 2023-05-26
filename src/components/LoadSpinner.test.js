import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import LoadSpinner from './LoadSpinner.vue';

describe('LoadSpinner tests', () => {
	const wrapper = mount(LoadSpinner);
	test('span element with class loader exists', () => {
		expect(wrapper.find('.loader').exists()).toBeTruthy();
	});
	test('span has no text content', () => {
		expect(wrapper.get('.loader').text()).toEqual('');
	});
});
