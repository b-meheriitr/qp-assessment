import request from 'supertest'
import app from '../src/app'

describe('GET /api/test', () => {
	it('should respond with status 200 and JSON message', async () => {
		const response = await request(app).get('/api/test')

		expect(response.status).toBe(200)
		expect(response.body).toMatchObject({
			msg: expect.stringMatching('hello test'),
		})
	})
})
