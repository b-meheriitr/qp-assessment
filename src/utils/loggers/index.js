import winston from 'winston'
import {LOGGING_CONFIG} from '../../config'
import {winstonLevelColors} from './constants.logger'
import createDefaultLogger, {createConsoleLogger} from './factory.logger'

winston.addColors(winstonLevelColors)

const logger = createDefaultLogger(LOGGING_CONFIG.LOGGERS)
export default logger

export const consoleLogger = createConsoleLogger()

if (LOGGING_CONFIG.OVERRIDE_GLOBAL_CONSOLE_METHODS) {
	['info', 'debug', 'error', 'warn', 'trace']
		.forEach(logLevel => {
			// eslint-disable-next-line no-console
			console[logLevel] = function () {
				// eslint-disable-next-line prefer-rest-params
				consoleLogger[logLevel](...arguments)
			}
		})
}
