import { beforeEach, describe, expect, test } from 'vitest';
import tokenInteraction from './tokenInteraction';

describe('tokenInteraction composable', () => {
	const validToken = { access_token: 'ajkbdkfjankdcnka' };
	beforeEach(() => {
		localStorage.clear();
	});
	const { token, setToken } = tokenInteraction();

	test('token is null if localstorage is empty', () => {
		expect(token.value).toBe(null);
	});
	test('setToken stores token in storage and updates token', () => {
		// Set token not called so localstorage empty
		expect(localStorage.getItem('token')).toBe(null);
		setToken(validToken);
		const tokenInStorage = localStorage.getItem('token');

		//Set token called, therefore localstorage has been updated with the value
		expect(tokenInStorage).toBeTruthy();
		expect(JSON.parse(tokenInStorage)).toEqual(validToken);
		expect(token.value).toEqual(validToken);
	});
});
