import axios from "axios"

// Function to handle the purchase API call
export const purchaseSubscription = async (subscriptionId: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/subscriptions/purchase`,
			{ subscriptionId },
			{
				withCredentials: true // This sends cookies with the request
			}
		)
		return response.data // Handle response data accordingly
	} catch (error) {
		console.error("Error purchasing subscription:", error)
		throw error
	}
}
