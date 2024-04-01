import type {NextFunction, Request, Response} from 'express'
import Joi from 'joi'
import {PostGroceryItem, UpdateGroceryItem} from '../types/dto.type'

const SCHEMA_CREATE: Joi.ObjectSchema<PostGroceryItem> = Joi.object({
	name: Joi.string()
		.pattern(/\w+/)
		.required(),
	price: Joi.number()
		.positive()
		.precision(2)
		.required(),
	initialQuantity: Joi
		.number()
		.min(0)
		.integer(),
})
	.options({allowUnknown: false})

const SCHEMA_UPDATE: Joi.ObjectSchema<UpdateGroceryItem> = Joi.object({
	name: Joi.string()
		.pattern(/\w+/)
		.required(),
	price: Joi.number()
		.positive()
		.precision(2)
		.required(),
})
	.options({allowUnknown: false})

const SCHEMA_QUANTITY_REQUIRED = Joi.object({
	quantity: Joi
		.number()
		.min(1)
		.integer()
		.required(),
})

const SCHEMA_ORDER = Joi.array()
	.items(Joi.object({
		quantity: Joi
			.number()
			.min(1)
			.integer()
			.required(),
		groceryId: Joi.number().integer(),
	}))
	.min(1)

export function create(req: Request, res: Response, next: NextFunction) {
	const {error, value} = SCHEMA_CREATE.validate(req.body)

	if (error) {
		res.status(421).json({error})
		return
	}

	req.body = value
	next()
}

export function update(req: Request, res: Response, next: NextFunction) {
	const {error, value} = SCHEMA_UPDATE.validate(req.body)

	if (error) {
		res.status(421).json({error})
		return
	}

	req.body = value
	next()
}

export function quantity(req: Request, res: Response, next: NextFunction) {
	const {error, value} = SCHEMA_QUANTITY_REQUIRED.validate(req.body)

	if (error) {
		res.status(421).json({error})
		return
	}

	req.body = value
	next()
}

export function order(req: Request, res: Response, next: NextFunction) {
	const {error, value} = SCHEMA_ORDER.validate(req.body)

	if (error) {
		res.status(421).json({error})
		return
	}

	req.body = value
	next()
}
