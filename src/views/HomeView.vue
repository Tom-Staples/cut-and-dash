<script setup>
	import Spinner from '../components/LoadSpinner.vue';
	import ErrorMessage from '../components/ErrorMessage.vue';
	import { ref } from 'vue';
	import postData from '../composables/postData';
	import { useRouter } from 'vue-router';

	// Props
	const emit = defineEmits(['setToken']);
	// Static state
	const router = useRouter();
	const initialLoginFormState = {
		email: '',
		password: ''
	};
	const initialRegisterFormState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: false
	};

	// Reactive state
	const whichForm = ref('login');
	const loginDetails = ref({ ...initialLoginFormState });
	const registerDetails = ref({ ...initialRegisterFormState });
	const passError = ref('');

	// Methods
	const changeForm = changeTo => {
		resetForms();
		regResetData();
		whichForm.value = changeTo;
	};
	const resetForms = () => {
		loginDetails.value = { ...initialLoginFormState };
		registerDetails.value = { ...initialRegisterFormState };
		passError.value = '';
	};
	const handleLogin = async () => {
		await logSubmitData('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginDetails.value)
		});
		if (logData.value) {
			emit('setToken', logData.value.access_token);
			router.push('dashboard');
		}
	};
	const handleRegister = () => {
		// eslint-disable-next-line no-unused-vars
		const { terms, confirmPassword, ...rest } = registerDetails.value;
		const data = { ...rest };

		regSubmitData('http://localhost:3000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	};

	// Computed
	const validateLogin = () => {
		// Confirm that both fields have been filled
		const { email, password } = loginDetails.value;
		return !email || !password;
	};
	const validateRegister = () => {
		// Reset error
		passError.value = '';
		// Check all fields have been filled
		const { firstName, lastName, email, password, confirmPassword, terms } =
			registerDetails.value;
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!terms
		) {
			return false;
		}

		// Check passwords are the same
		if (password !== confirmPassword) {
			passError.value = 'Passwords do not match';
			return false;
		}
		return true;
	};

	// Composables
	// Registration
	const {
		data: regData,
		error: regError,
		loading: regLoading,
		submitData: regSubmitData,
		resetData: regResetData
	} = postData();

	// Login
	const {
		data: logData,
		error: logError,
		loading: logLoading,
		submitData: logSubmitData
	} = postData();
</script>

<template>
	<div v-if="regData" class="success">
		<h2>Registration Successful</h2>
		<p>
			Your registration to Cut-and-Dash is complete! Please use the link below
			to login and access the application
		</p>
		<a href="javascript: void(0)" @click="changeForm('login')"
			>Return to login</a
		>
	</div>
	<form
		v-else-if="whichForm === 'login'"
		class="loginForm"
		@submit.prevent="handleLogin"
	>
		<h2>Login</h2>
		<label>Email:</label>
		<span class="material-symbols-outlined"> mail </span>
		<input type="email" v-model="loginDetails.email" required />
		<label>Password:</label>
		<span class="material-symbols-outlined"> lock </span>
		<input type="password" v-model="loginDetails.password" required />
		<button :disabled="validateLogin()">Sign In</button>

		<Spinner v-if="logLoading" />
		<div v-if="logError" class="errorContainer">
			<ErrorMessage :message="logError" />
		</div>
		<a href="javascript: void(0)" @click="changeForm('register')"
			>Not registered?</a
		>
	</form>
	<form v-else class="registerForm" @submit.prevent="handleRegister">
		<h2>Register</h2>
		<label>First Name:</label>
		<span class="material-symbols-outlined"> person </span>
		<input type="text" v-model="registerDetails.firstName" required />
		<label>Last Name:</label>
		<span class="material-symbols-outlined"> person </span>
		<input type="text" v-model="registerDetails.lastName" required />
		<label>Email:</label>
		<span class="material-symbols-outlined"> mail </span>
		<input type="email" v-model="registerDetails.email" required />
		<label>Password:</label>
		<span class="material-symbols-outlined"> lock </span>
		<input type="password" v-model="registerDetails.password" required />
		<label>Confirm Password:</label>
		<span class="material-symbols-outlined"> lock </span>
		<input type="password" v-model="registerDetails.confirmPassword" required />
		<span v-if="passError" class="passError">{{ passError }}</span>
		<label
			>By clicking here, I state that i have read and understood the terms and
			conditions</label
		>
		<input
			type="checkbox"
			id="terms"
			v-model="registerDetails.terms"
			required
		/>
		<button :disabled="!validateRegister()">Register</button>
		<Spinner v-if="regLoading" />
		<div v-if="regError" class="errorContainer">
			<ErrorMessage :message="regError" />
		</div>

		<a href="javascript: void(0)" @click="changeForm('login')">Back to login</a>
	</form>
</template>

<style scoped>
	.loginForm,
	.registerForm,
	.success {
		background: rgb(97, 199, 237);
		color: #ffffff;
		border: solid 1px;
		padding: 20px;
		border-radius: 15px;
		position: absolute;
		display: flex;
		width: 500px;
		flex-direction: column;
		left: 50%;
		margin-left: -250px;
		margin-top: 20px;
	}
	h2,
	p {
		text-align: center;
		margin-bottom: 40px;
	}
	label {
		margin: 0 40px;
		border: none;
	}
	input {
		margin: 0px 40px 40px 40px;
		color: #ffffff;
		border: none;
		border-bottom: solid #ffffff 3px;
		padding: 10px;
		background: rgb(97, 199, 237);
		outline: none;
	}
	button {
		width: 30%;
		margin: 10px auto 10px;
		border-radius: 20px;
		border: none;
		background: #ffffff;
		padding: 10px 0;
	}
	button:hover {
		background: #4ab1e8;
		color: #ffffff;
	}
	button:disabled,
	button[disabled] {
		background: #989797;
		color: rgb(75, 73, 73);
	}
	.material-symbols-outlined {
		position: relative;
		top: 40px;
		left: 10px;
	}
	a {
		color: #ffffff;
		margin: 0 auto;
		width: fit-content;
	}
	#terms {
		position: relative;
		right: 225px;
		bottom: 35px;
	}
	.passError {
		color: red;
		font-weight: bold;
		font-size: small;
		position: relative;
		margin: 0 40px;
		bottom: 20px;
	}
	.success h2 {
		text-decoration: underline;
	}
	.errorContainer {
		margin: 10px auto 10px;
	}
</style>
