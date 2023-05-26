import { RouterLinkStub, mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import SideNav from './SideNav.vue';

describe('SideNav tests', () => {
	test('nav element exists', () => {
		const wrapper = shallowMount(SideNav);
		expect(wrapper.find('#sideNav').exists()).toBeTruthy();
	});
	test('ul element exists', () => {
		const wrapper = shallowMount(SideNav);
		expect(wrapper.find('ul').exists()).toBeTruthy();
	});
	test('correct amount of links, lists, and spans displayed', () => {
		const wrapper = mount(SideNav, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				}
			}
		});
		expect(wrapper.findAll('li').length).toEqual(6);
		expect(wrapper.findAll('a').length).toEqual(6);
		expect(wrapper.findAll('span').length).toEqual(12);
	});
	test('text content of span items is correct', () => {
		const navIcons = {
			dashboard: 'space_dashboard',
			schedule: 'calendar_month',
			customers: 'groups',
			barbers: 'account_box',
			reports: 'lab_profile',
			users: 'group_add'
		};
		const wrapper = mount(SideNav, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				}
			}
		});
		const listItems = wrapper.findAll('li');
		listItems.forEach((li, index) => {
			const navIconsArray = Object.entries(navIcons);
			const currentNavIcon = navIconsArray[index];
			expect(li.text()).toEqual(
				currentNavIcon[1] +
					currentNavIcon[0][0].toUpperCase() +
					currentNavIcon[0].substring(1)
			);
		});
	});
});
