export type GroceryItem = {
	id?: number
	name: string
	price: number
	availableQuantity?: number
	createdOn?: Date
	updatedOn?: Date
}

export type AvailableQuantity = {
	availableQuantity: number
}

export type Id = {
	id: number
}
