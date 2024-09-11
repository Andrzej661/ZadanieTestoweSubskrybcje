export type SubscriptionProps = {
	id: string
	title: string
	subtitle: string
	price: number
	bonuses: string[]
	minuses: string[]
}
export interface Subscription {
	id: string
	title: string
	subtitle: string
	price: number
	bonuses: string[]
	minuses: string[]
}