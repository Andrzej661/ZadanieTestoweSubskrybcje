import { useEffect, useState } from "react"
import SubscriptionTile from "./SubscriptionTile"
import { fetchSubscriptions } from "../../api/subscriptionsProvider"
import { Subscription } from "./SubscriptionTypesProps"

const Subscriptions = () => {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]) // Initialize as an empty array
	const [error, setError] = useState<string | null>(null) // For error handling
	const [loading, setLoading] = useState<boolean>(true) // For loading state

	useEffect(() => {
		// Define an async function inside useEffect
		const loadSubscriptions = async () => {
			try {
				const fetchedSubscriptions = await fetchSubscriptions()
				setSubscriptions(fetchedSubscriptions) // Assuming the response is an array of subscriptions
			} catch (err) {
				console.error("Error fetching subscriptions:", err)
				setError("Failed to load subscriptions.")
			} finally {
				setLoading(false) // Turn off loading spinner once the data is fetched
			}
		}

		// Call the async function
		loadSubscriptions()
	}, []) // Empty dependency array means this effect runs once after the initial render

	if (loading) {
		return <div>Loading subscriptions...</div> // Display loading while fetching
	}

	if (error) {
		return <div>Error: {error}</div> // Display error message
	}

	return (
		<div className="mt-16 flex flex-col items-center justify-center px-4 xl:px-0">
			<div className="mb-16 text-4xl ">Choose your subscription plan</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:w-3/4">
				{Array.isArray(subscriptions) && subscriptions.length > 0 ? (
					subscriptions.map(subscription => (
						<SubscriptionTile
							id={subscription.id}
							title={subscription.title}
							subtitle={subscription.subtitle}
							price={subscription.price}
							bonuses={subscription.bonuses}
							minuses={subscription.minuses}
						/>
					))
				) : (
					<div>No subscriptions available</div> // Handle empty or non-array data
				)}
			</div>
		</div>
	)
}

export default Subscriptions
