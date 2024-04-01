import {PrismaClient} from '@prisma/client'
import {DB_CONFIG} from '../config'
import GroceryRepo from './grocery.repo'

const prismaClient = new PrismaClient({
	datasources: {
		db: {
			url: DB_CONFIG.URL,
		},
	},
})

export const groceryRepo = GroceryRepo(prismaClient)
