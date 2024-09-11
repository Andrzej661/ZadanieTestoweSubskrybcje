import { Button } from "@nextui-org/react"
import React, { useState } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { Subscription } from "./SubscriptionTypesProps"
import { purchaseSubscription } from "../../api/subscriptionPurchase"

const SubscriptionTile: React.FC<Subscription> = ({
	id,
	title,
	subtitle,
	price,
	bonuses,
	minuses
}) => {
	const [isLoading, setIsLoading] = useState(false) // To handle loading state
	const [message, setMessage] = useState<string | null>(null) // To handle success/error message

	const handleBuy = async () => {
		setIsLoading(true)
		setMessage(null)
		try {
			await purchaseSubscription(id)
			setMessage("Purchase successful!") // Handle success
		} catch (error) {
			setMessage("Purchase failed. Please try again.") // Handle failure
		} finally {
			setIsLoading(false) // Stop loading
		}
	}

	return (
		<div className="w-full rounded-xl border-2 border-foreground to-primary p-4 pt-8 text-foreground shadow-xl">
			<div className="min-h-80">
				<div className="text-center text-3xl font-bold">{title}</div>
				<div className="pb-8 text-center text-lg">{subtitle}</div>
				<ul className="text-md mb-4">
					{bonuses.map((bonus, index) => (
						<li key={`bonus-${index}`}>
							<FaCheck className="mb-1 mr-1 inline pr-1 text-green" />
							{bonus}
						</li>
					))}
					{minuses.map((minus, index) => (
						<li key={`minus-${index}`}>
							<FaTimes className="mb-1 mr-1 inline pr-1 text-red-500" />
							{minus}
						</li>
					))}
				</ul>
			</div>
			<div className="flex items-center justify-end gap-4">
				<div className="text-lg font-semibold">{price} zł / msc</div>
				<Button
					className="my-4 bg-primary text-white"
					onClick={handleBuy}
					isLoading={isLoading} // Disable the button when loading
					disabled={isLoading} // Disable the button when loading
				>
					{isLoading ? "Processing..." : "Buy"}
				</Button>
			</div>
			{message && <div className="mt-2 text-center text-sm">{message}</div>}{" "}
			{/* Display success or error message */}
		</div>
	)
}
export default SubscriptionTile
