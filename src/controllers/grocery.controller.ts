import type {Request, Response} from 'express'
import {InsufficientQuantity, InvalidQuantity} from '../errors'
import * as groceryService from '../service/grocery.service'

export async function create(req: Request, res: Response) {
	const created = await groceryService.create(req.body)
	res.status(201).json(created)
}

export async function getAll(req: Request, res: Response) {
	res.status(200)
		.json(await groceryService.getAll())
}

export async function update(req: Request, res: Response) {
	const updated = await groceryService.update(+req.params.id, req.body)
	res.status(200).json(updated)
}

export async function remove(req: Request, res: Response) {
	const deleted = await groceryService.remove(+req.params.id)
	res.status(200).json(deleted)
}

export async function addQuantity(req: Request, res: Response) {
	const updated = await groceryService.addQuantity(+req.params.id, req.body.quantity)
	res.status(200)
		.json(updated)
}

export async function deductQuantity(req: Request, res: Response) {
	try {
		const updated = await groceryService.deductQuantity(+req.params.id, req.body.quantity)
		res.status(200)
			.json(updated)
	} catch (e) {
		if (e instanceof InsufficientQuantity) {
			res.status(421).json({message: e.message})
		}
		throw e
	}
}

export async function forceSetQuantity(req: Request, res: Response) {
	try {
		const updated = await groceryService.forceSetQuantity(+req.params.id, req.body.quantity)
		res.status(200)
			.json(updated)
	} catch (e) {
		if (e instanceof InvalidQuantity) {
			res.status(421).json({message: e.message})
		}
		throw e
	}
}

export async function getUserItems(req: Request, res: Response) {
	const data = await groceryService.getUserItems()

	res.status(200).json(data)
}

export async function createOrder(req: Request, res: Response) {
	try {
		await groceryService.createOrder(req.body)

		res.sendStatus(200)
	} catch (e) {
		if (e instanceof InsufficientQuantity) {
			res.status(421).json({message: e.message})
		}
		throw e
	}
}
