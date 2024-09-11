import axios from "axios"

// Function to handle the purchase API call
export const deleteSubscription = async () => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/subscriptions/delete`,
			{},
			{ withCredentials: true } // Include credentials if needed
		)
		console.log("All subscriptions cleared successfully:", response.data)
	} catch (error) {
		console.error("Error clearing subscriptions:", error)
	}
}
