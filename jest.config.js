/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	testEnvironment: 'node',
	transform: {
		"^.+\\.js?$": "babel-jest",
		"^.+\\.ts?$": "ts-jest",
	},
	testMatch: ['**/test/**/*test.(js|ts)'],
}
