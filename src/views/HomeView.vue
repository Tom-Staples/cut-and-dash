<script setup>
	import { ref } from 'vue';
	// Static state
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
	const error = ref('');
	const passError = ref('');

	// Methods
	const changeForm = () => {
		let formName = 'login';
		if (whichForm.value === 'login') {
			formName = 'register';
		}
		resetForms();
		whichForm.value = formName;
	};
	const resetForms = () => {
		loginDetails.value = { ...initialLoginFormState };
		registerDetails.value = { ...initialRegisterFormState };
		error.value = '';
	};
	const handleLogin = () => {};
	const handleRegister = () => {};

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

		//check password length and characters
		// if (
		// 	!password.match(
		// 		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
		// 	)
		// ) {
		// 	passError.value =
		// 		'Password must be a minimum of 8 characters long and contain at least one number, one letter and one special character';
		// 	return false;
		// }
	};
</script>

<template>
	<form
		v-if="whichForm === 'login'"
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
		<a href="javascript: void(0)" @click="changeForm">Not registered?</a>
	</form>
	<form v-else class="registerForm" @submit.prevent="handleRegister">
		<h2>Register</h2>
		<label>First Name:</label>
		<input type="text" v-model="registerDetails.firstName" required />
		<label>Last Name:</label>
		<input type="text" v-model="registerDetails.lastName" required />
		<label>Email:</label>
		<input type="email" v-model="registerDetails.email" required />
		<label>Password:</label>
		<input type="password" v-model="registerDetails.password" required />
		<label>Confirm Password:</label>
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
		<a href="javascript: void(0)" @click="changeForm">Back to login</a>
	</form>
</template>

<style scoped>
	.loginForm,
	.registerForm {
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
		margin-top: 50px;
	}
	h2 {
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
		margin: 10px auto 30px;
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
		text-align: center;
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
</style>
