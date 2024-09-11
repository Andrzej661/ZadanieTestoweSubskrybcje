import { useEffect, useState } from "react"
import ContentTable from "../../components/menage/ContentTable"
import { Button } from "@nextui-org/react"
import { deleteSubscription } from "../../api/subscriptionDelete"
import { fetchUserSubscription } from "../../api/userSubscriptionProvider"

const MenagePage = () => {
	const onClickDelete = async () => {
		await deleteSubscription()

		// After successful deletion, set subscription to null
		setSubscription({ title: null, price: null })
	}

	const [subscription, setSubscription] = useState<{
		title: string | null
		price: number | null
	}>({
		title: null,
		price: null
	})

	// Fetch subscription data when the component mounts
	useEffect(() => {
		const getSubscriptionData = async () => {
			const data = await fetchUserSubscription()
			setSubscription(data)
		}

		getSubscriptionData()
	}, [])

	// Destructure subscription data
	const { title, price } = subscription
	return (
		<div className="flex flex-col items-center">
			<div className="my-16 text-center text-4xl">
				Menage your subscriptions{" "}
			</div>
			<div className="w-3/4 rounded-xl ">
				<ContentTable title={title} price={price} />
				<div className="flex justify-end">
					<Button
						onClick={onClickDelete}
						className="mt-4 border-2 border-foreground bg-inherit px-8 font-semibold text-foreground">
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MenagePage
