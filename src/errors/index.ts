export class InsufficientQuantity extends Error {
	constructor(groceryId: number, actual: number, asked: number) {
		super(`Insufficient Quantity for grocery:${groceryId}. Available: ${actual}, Asked: ${asked}`)
	}
}

export class InvalidQuantity extends Error {
}
