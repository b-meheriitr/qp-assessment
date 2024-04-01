import {GroceryItem} from './model.type'

export type PostGroceryItem = {
	name: string,
	price: number,
	initialQuantity: number,
}

export type UpdateGroceryItem = {
	name: string,
	price: number,
}

export type UserGroceryItem = Exclude<GroceryItem, ['createdOn', 'updatedOn']>

export type Order = {
	groceryId: number,
	quantity: number,
}
