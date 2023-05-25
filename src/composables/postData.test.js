import { afterEach, describe, expect, test, vi } from 'vitest';
import postData from './postData';

const mockFetchData = () => ({
	ok: true,
	json: () => new Promise(resolve => resolve({ data: 'data' }))
});
const mockFetchError = () => ({
	ok: false,
	json: () => new Promise(resolve => resolve({ message: 'error' }))
});

describe('postData tests', () => {
	afterEach(() => {
		vi.clearAllMocks();
		resetData();
	});
	const { data, error, loading, submitData, resetData } = postData();

	test('initial state values should be falsy', () => {
		expect(data.value).toBeFalsy();
		expect(error.value).toBeFalsy();
		expect(loading.value).toBeFalsy();
	});

	test('resetData resets state back to default falsy values', () => {
		resetData();
		expect(data.value).toBeFalsy();
		expect(error.value).toBeFalsy();
		expect(loading.value).toBeFalsy();
	});

	test('submitData no params', async () => {
		await submitData();
		// No params results in an error. Data does not get updated but error does
		expect(data.value).toBeFalsy();
		expect(error.value).toBeTruthy();
	});
	describe('submitData with mock', () => {
		global.fetch = vi.fn();
		test('submitData data return', async () => {
			fetch.mockResolvedValue(mockFetchData());
			await submitData();

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(data.value).toEqual({ data: 'data' });
			expect(error.value).toBeFalsy();
		});
		test('submitData error return', async () => {
			fetch.mockResolvedValue(mockFetchError());
			await submitData();

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(data.value).toBeFalsy();
			expect(error.value).toEqual('error');
		});
	});
});
