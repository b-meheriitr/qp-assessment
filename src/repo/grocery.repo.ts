import {Prisma, PrismaClient} from '@prisma/client'
import {FindAll, GroceryRepo} from '../types/db.type'
import {AvailableQuantity, GroceryItem} from '../types/model.type'

class GroceryRepoImpl implements GroceryRepo {
	private model: Prisma.GroceryItemDelegate

	private conn: PrismaClient

	constructor(conn: PrismaClient) {
		this.model = conn.groceryItem
		this.conn = conn
	}

	transactional<T>(action: (model: GroceryRepo) => Promise<T>): Promise<T> {
		return this.conn.$transaction(conn => {
			return action(new GroceryRepoImpl(conn as PrismaClient))
		})
	}

	create(data: GroceryItem): Promise<GroceryItem> {
		return this.model
			.create({data})
	}

	findAll(query: FindAll): Promise<GroceryItem[]> {
		return this.model.findMany(query)
	}

	update(data: GroceryItem): Promise<GroceryItem> {
		return this.model.update({
			data,
			where: {id: data.id},
		})
	}

	remove(id: number): Promise<GroceryItem> {
		return this.model.delete({
			where: {id},
		})
	}

	addQuantity(id: number, quantity: number): Promise<AvailableQuantity> {
		return this.model.update({
			where: {id},
			data: {availableQuantity: {increment: quantity}},
			select: {
				availableQuantity: true,
			},
		})
	}

	deductQuantity(id: number, quantity: number): Promise<AvailableQuantity> {
		return this.model.update({
			where: {id},
			data: {availableQuantity: {decrement: quantity}},
			select: {
				availableQuantity: true,
			},
		})
	}
}

export default (conn: PrismaClient): GroceryRepo => (new GroceryRepoImpl(conn))
