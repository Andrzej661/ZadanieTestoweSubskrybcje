import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from "@nextui-org/react"

interface ContentTableProps {
	title: string | null
	price: number | null
}

const ContentTable: React.FC<ContentTableProps> = ({ title, price }) => {
	// State to store the subscription data

	return (
		<Table aria-label="SubscriptionTable">
			<TableHeader>
				<TableColumn>NAME</TableColumn>
				<TableColumn>PRICE</TableColumn>
			</TableHeader>
			<TableBody>
				{title && price !== null ? (
					<TableRow key="1">
						<TableCell>{title}</TableCell>
						<TableCell>{price.toFixed(2)} zł</TableCell>
					</TableRow>
				) : (
					<TableRow>
						<TableCell>{"No subscription data available"}</TableCell>
						<TableCell>{"No subscription data available"}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default ContentTable
