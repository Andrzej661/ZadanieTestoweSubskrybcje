import axios from "axios"

// Define the interface for the API response
interface SubscriptionResponse {
	status: boolean
	message: string
	data: {
		title: string
		price: number
	}
}

export const fetchUserSubscription = async (): Promise<{
	title: string | null
	price: number | null
}> => {
	try {
		// Retrieve the JWT token from cookies

		// Make the HTTP request to fetch the user's subscription details
		const response = await axios.get<SubscriptionResponse>(
			`${import.meta.env.VITE_BACKEND_URL}/subscriptions/my-subscription`,
			{
				withCredentials: true // This sends cookies with the request
			}
		)

		// Check if the response status is successful
		if (response.data.status) {
			return {
				title: response.data.data.title,
				price: response.data.data.price
			}
		} else {
			console.error(response.data.message)
			return {
				title: null,
				price: null
			}
		}
	} catch (error) {
		console.error("Error fetching user subscription:", error)
		return {
			title: null,
			price: null
		}
	}
}
