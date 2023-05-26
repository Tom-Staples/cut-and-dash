import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import ErrorMessage from './ErrorMessage.vue';

describe('ErrorMessage tests', () => {
	const wrapper = mount(ErrorMessage);
	wrapper.setProps({ message: 'test' });

	test('span element is displayed', () => {
		expect(wrapper.find('.errorMessage').exists()).toBeTruthy();
	});
	test('message displayed is test', () => {
		expect(wrapper.get('.errorMessage').text()).toEqual('Error: test');
	});
});
