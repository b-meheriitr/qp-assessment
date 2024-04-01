import {PrismaClient} from '@prisma/client'
import {DB_CONFIG} from '../config'

const prismaClient = new PrismaClient({
	datasources: {
		db: {
			url: DB_CONFIG.URL,
		},
	},
})
