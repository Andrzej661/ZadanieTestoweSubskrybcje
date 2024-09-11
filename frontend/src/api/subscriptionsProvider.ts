import axios from "axios"

// Function to fetch all subscriptions
export const fetchSubscriptions = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_URL}/subscriptions`
		) // Replace with your actual API endpoint
		if (response.data.status) {
			return response.data.data // Return the subscriptions array from the "data" field
		} else {
			throw new Error(response.data.message || "Failed to fetch subscriptions")
		}
	} catch (error) {
		console.error("Error fetching subscriptions:", error)
		throw error
	}
}
