import { ref } from 'vue';

const postData = () => {
	const data = ref(null);
	const error = ref('');
	const loading = ref(false);

	const submitData = async (url, params = undefined) => {
		try {
			loading.value = true;
			const response = await fetch(url, params);
			const result = await response.json();
			if (response.ok) {
				data.value = result;
			} else {
				error.value = Array.isArray(result.message)
					? result.message[0]
					: result.message;
			}
			loading.value = false;
		} catch (err) {
			console.log(err);
			error.value = err;
			loading.value = false;
		}
	};

	const resetData = () => {
		data.value = null;
		error.value = '';
		loading.value = false;
	};
	return { data, error, loading, submitData, resetData };
};

export default postData;
