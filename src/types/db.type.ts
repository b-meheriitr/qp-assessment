import {Prisma} from '@prisma/client'
import {AvailableQuantity, GroceryItem} from './model.type'

export type FindAll = Prisma.GroceryItemFindManyArgs

export interface GroceryRepo {
	transactional<T>(action: (model: GroceryRepo) => Promise<T>): Promise<T>

	create(data: GroceryItem): Promise<GroceryItem>

	findAll(query?: FindAll): Promise<GroceryItem[]>

	update(data: GroceryItem): Promise<GroceryItem>

	remove(id: number): Promise<GroceryItem>

	addQuantity(id: number, quantity: number): Promise<AvailableQuantity>

	deductQuantity(id: number, quantity: number): Promise<AvailableQuantity>
}
