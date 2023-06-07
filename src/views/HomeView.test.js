import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import Homeview from './HomeView.vue';

const mockFetchData = () => ({
	ok: true,
	json: () => new Promise(resolve => resolve({ data: 'data' }))
});
const mockFetchError = () => ({
	ok: false,
	json: () => new Promise(resolve => resolve({ message: 'error' }))
});

describe('HomeView tests', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(Homeview);
		vi.mock('vue-router', () => ({
			useRouter: () => ({
				push: vi.fn()
			})
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});
	describe('Login form', () => {
		test('Only login form is displayed initially', () => {
			expect(wrapper.find('.loginForm').exists()).toBeTruthy();
			expect(wrapper.find('.registerForm').exists()).toBeFalsy();
			expect(wrapper.find('.success').exists()).toBeFalsy();
		});
		test('All login form elements are displayed', () => {
			expect(wrapper.find('h2').exists()).toBeTruthy();
			expect(wrapper.findAll('label').length).toEqual(2);
			expect(wrapper.findAll('input').length).toEqual(2);
			expect(wrapper.find('button').exists()).toBeTruthy();
			expect(wrapper.find('a').exists()).toBeTruthy();
		});
		test('button is disabled by default', () => {
			expect(wrapper.find('button').element.disabled).toBe(true);
		});
		test('button is enabled when both inputs are filled', async () => {
			const inputs = wrapper.findAll('input');

			await inputs[0].setValue('test@email.com');
			await inputs[1].setValue('password');

			expect(wrapper.find('button').element.disabled).toBe(false);
		});
		test('inputs display correct text', async () => {
			const inputs = wrapper.findAll('input');

			expect(inputs[0].element.value).toEqual('');
			expect(inputs[1].element.value).toEqual('');

			await inputs[0].setValue('test@email.com');
			await inputs[1].setValue('password');

			expect(inputs[0].element.value).toEqual('test@email.com');
			expect(inputs[1].element.value).toEqual('password');
		});
	});
	describe('Register form', () => {
		let link;

		beforeEach(async () => {
			link = wrapper.find('a');
			await link.trigger('click');
		});
		test('register form is displayed when link clicked', async () => {
			expect(wrapper.find('.registerForm').exists()).toBeTruthy();
		});
		test('register form elements are displayed', async () => {
			expect(wrapper.find('h2').exists()).toBeTruthy();
			expect(wrapper.findAll('label').length).toEqual(6);
			expect(wrapper.findAll('input').length).toEqual(6);
			expect(wrapper.findAll('span').length).toEqual(5);
			expect(wrapper.find('a').exists()).toBeTruthy();
			expect(wrapper.find('button').exists()).toBeTruthy();
		});
		test('inputs display correct text', async () => {
			const inputs = wrapper.findAll('input');

			inputs.forEach((input, index) => {
				if (index === inputs.length - 1) {
					expect(input.element.checked).toBeFalsy();
				} else {
					expect(input.text()).toEqual('');
				}
			});

			await inputs[0].setValue('firstName');
			await inputs[1].setValue('lastName');
			await inputs[2].setValue('test@email.com');
			await inputs[3].setValue('pass');
			await inputs[4].setValue('pass');
			await inputs[5].setChecked();

			expect(inputs[0].element.value).toEqual('firstName');
			expect(inputs[1].element.value).toEqual('lastName');
			expect(inputs[2].element.value).toEqual('test@email.com');
			expect(inputs[3].element.value).toEqual('pass');
			expect(inputs[4].element.value).toEqual('pass');
			expect(inputs[5].element.checked).toBeTruthy();
		});
		test('button is disbaled by default', async () => {
			const button = wrapper.find('button');

			expect(button.element.disabled).toBeTruthy();
		});
		test('button is enabled when inputs are complete', async () => {
			const inputs = wrapper.findAll('input');
			const button = wrapper.find('button');

			await inputs[0].setValue('firstName');
			await inputs[1].setValue('lastName');
			await inputs[2].setValue('test@email.com');
			await inputs[3].setValue('pass');
			await inputs[4].setValue('pass');
			await inputs[5].setChecked();

			expect(button.element.disabled).toBeFalsy();
		});
		test('password error does not display by default', async () => {
			const passError = wrapper.find('.passError');

			expect(passError.exists()).toBeFalsy();
		});
		test('password error displays when no match', async () => {
			const inputs = wrapper.findAll('input');

			await inputs[0].setValue('firstName');
			await inputs[1].setValue('lastName');
			await inputs[2].setValue('test@email.com');
			await inputs[3].setValue('pass');
			await inputs[4].setValue('pass');
			await inputs[5].setChecked();

			expect(wrapper.find('.passError').exists()).toBeFalsy();

			await inputs[4].setValue('pass1234');
			expect(wrapper.find('.passError').exists()).toBeTruthy();
			expect(wrapper.find('.passError').text()).toEqual(
				'Passwords do not match'
			);
		});
		test('login form shows when link is clicked', async () => {
			const logLink = wrapper.find('a');
			await logLink.trigger('click');
			expect(wrapper.find('.loginForm').exists()).toBeTruthy();
		});
		test('registration error shows if unsuccessful', async () => {
			global.fetch = vi.fn().mockImplementation(mockFetchError);
			const inputs = wrapper.findAll('input');

			await inputs[0].setValue('firstName');
			await inputs[1].setValue('lastName');
			await inputs[2].setValue('test@email.com');
			await inputs[3].setValue('pass');
			await inputs[4].setValue('pass');
			await inputs[5].setChecked();

			const form = wrapper.find('.registerForm');
			expect(wrapper.find('.errorContainer').exists()).toBeFalsy();
			await form.trigger('submit.prevent');
			expect(wrapper.find('.errorContainer').exists()).toBeTruthy();
		});
	});
	describe('Registration message', () => {
		let link;

		beforeEach(async () => {
			global.fetch = vi.fn().mockImplementation(mockFetchData);
			link = wrapper.find('a');
			await link.trigger('click');

			const inputs = wrapper.findAll('input');

			await inputs[0].setValue('firstName');
			await inputs[1].setValue('lastName');
			await inputs[2].setValue('test@email.com');
			await inputs[3].setValue('pass');
			await inputs[4].setValue('pass');
			await inputs[5].setChecked();

			const form = wrapper.find('.registerForm');
			await form.trigger('submit.prevent');
		});
		test('registration successful container is displayed', () => {
			expect(wrapper.find('.success').exists()).toBeTruthy();
		});
		test('correct elements are displayed', () => {
			expect(wrapper.find('h2').exists()).toBeTruthy();
			expect(wrapper.find('p').exists()).toBeTruthy();
			expect(wrapper.find('a').exists()).toBeTruthy();
		});
		test('login form shows when link is clicked', async () => {
			expect(wrapper.find('.loginForm').exists()).toBeFalsy();
			await wrapper.find('a').trigger('click');
			expect(wrapper.find('.loginForm').exists()).toBeTruthy();
		});
	});
});
