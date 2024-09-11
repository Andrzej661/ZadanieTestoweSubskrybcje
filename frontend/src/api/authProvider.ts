import axios, { AxiosError } from "axios"
import { isUserLoggedIn } from "../context/isUserLoggedIn"

// Define the backend URL, ensuring it's defined
const backendUrl = import.meta.env.VITE_BACKEND_URL

// Define the shape of the request and response data
interface AuthDataCreate {
	email: string
	password: string
	username: string
}

interface AuthDataLogin {
	email: string
	password: string
}

interface AuthResponse {
	user: string // Replace `any` with a more specific type based on your response structure
}

export async function submitAuthDataSignup({
	email,
	password,
	username
}: AuthDataCreate): Promise<AuthResponse> {
	try {
		const response = await axios.post(`${backendUrl}/register`, {
			name: username,
			email,
			password
		})
		console.log("Success:", response.data)
		return response.data // Resolve the promise with response data
	} catch (error) {
		// Type the error response properly
		if (axios.isAxiosError(error) && error.response) {
			console.error("Error submitting auth data:", error.response.data)
			throw new Error(error.response.data.message || "Error during signup.")
		} else {
			console.error("Unexpected error:", error)
			throw new Error("Error during signup.")
		}
	}
}

export async function submitAuthDataSignin({
	email,
	password
}: AuthDataLogin): Promise<AuthResponse> {
	try {
		console.log(email, password)

		// Make the HTTP POST request
		const response = await axios.post(
			`${backendUrl}/login`,
			{ email, password },
			{ withCredentials: true } // Send credentials with the request
		)

		console.log("Success:", response.data)

		// Return the response data
		return response.data
	} catch (error) {
		// Handle errors properly
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError
			const errorMessage =
				axiosError.response?.data || "Wrong email or password"
			console.error("Error submitting login data:", axiosError.response?.data)
			throw new Error(errorMessage.toString())
		} else {
			console.error("Unexpected error:", error)
			throw new Error("An unexpected error occurred during login.")
		}
	}
}

export async function submitAuthDataLogout(): Promise<void> {
	try {
		const response = await axios.post(`${backendUrl}/logout`, {
			withCredentials: true
		})
		isUserLoggedIn() //  for avatar dropdawn
		window.location.reload() // Reload the page to reflect logout
		console.log("Success:", response.data)
	} catch (error) {
		// Type the error response
		if (axios.isAxiosError(error) && error.response) {
			console.error("Error when logging out:", error.response.data)
			throw new Error(error.response.data.message || "Error during logout.")
		} else {
			console.error("Unexpected error:", error)
			throw new Error("Error during logout.")
		}
	}
}
