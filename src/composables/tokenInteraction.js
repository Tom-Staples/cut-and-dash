import { ref } from 'vue';

const tokenInteraction = () => {
	const getToken = () => {
		let accessToken = localStorage.getItem('token');
		accessToken = JSON.parse(accessToken);
		return accessToken;
	};

	const token = ref(getToken());

	const setToken = accessToken => {
		localStorage.setItem('token', JSON.stringify(accessToken));
		token.value = accessToken;
	};

	return { token, setToken };
};

export default tokenInteraction;
