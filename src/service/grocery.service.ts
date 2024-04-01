import {InsufficientQuantity, InvalidQuantity} from '../errors'
import {groceryRepo} from '../repo'
import {GroceryRepo} from '../types/db.type'
import {Order, PostGroceryItem, UpdateGroceryItem, UserGroceryItem} from '../types/dto.type'
import {AvailableQuantity, GroceryItem, Id} from '../types/model.type'

export function update(id: number, updateData: UpdateGroceryItem) {
	return groceryRepo.update({
		id,
		...updateData,
	})
}

export function create(data: PostGroceryItem) {
	return groceryRepo.create({
		name: data.name,
		price: data.price,
		availableQuantity: data.initialQuantity,
	})
}

export function getAll() {
	return groceryRepo.findAll()
}

export async function remove(id: number): Promise<Id> {
	return groceryRepo.remove(id)
		.then(deleted => ({id: deleted.id} as Id))
}

export async function addQuantity(id: number, quantity: number) {
	return groceryRepo.addQuantity(id, quantity)
}

export async function deductQuantity(id: number, quantity: number, repo?: GroceryRepo): Promise<AvailableQuantity> {
	if (repo) {
		const updated = await repo.deductQuantity(id, quantity)

		if (updated.availableQuantity < 0) {
			throw new InsufficientQuantity(id, updated.availableQuantity + quantity, quantity)
		}

		return updated
	}

	return groceryRepo.transactional(async (tx: GroceryRepo) => {
		return deductQuantity(id, quantity, tx)
	})
}

export async function forceSetQuantity(id: number, quantity: number): Promise<AvailableQuantity> {
	if (quantity < 0) throw new InvalidQuantity('Invalid quantity')

	return groceryRepo.update(
		{
			id,
			availableQuantity: quantity,
		} as GroceryItem,
	)
		.then(({availableQuantity}) => ({availableQuantity} as AvailableQuantity))
}

export function getUserItems(): Promise<UserGroceryItem[]> {
	return groceryRepo.findAll({
		select: {
			id: true,
			name: true,
			price: true,
			availableQuantity: true,
		},
		where: {
			availableQuantity: {
				gt: 0,
			},
		},
	})
}

export async function createOrder(order: Order[]) {
	return groceryRepo.transactional(repo => {
		return Promise.all(
			order.map(orderItem => deductQuantity(orderItem.groceryId, orderItem.quantity, repo)),
		)
	})
}
