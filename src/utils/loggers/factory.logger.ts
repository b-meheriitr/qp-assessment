import {createLogger, format, Logger, transports} from 'winston'
import {CustomLogger, Log, LogType} from '../../types/config.type'
import {levelNames, SPLAT_SYMBOL, winstonLevels} from './constants.logger'
import {colorizeMessage, commonLogFormat, exactLogLevelMatch, printLog, unsetConsoleTransportFlag} from './fromats'
import {getMinLogLevel} from './utils.logger'

const loggerTransports: {[Property in LogType]: any} = {
	file: (loggerConfig: Log) => {
		const commonFormat = format.combine(
			unsetConsoleTransportFlag,
			commonLogFormat,
		)

		return [
			...levelNames.map(({level}) => new transports.File({
				filename: `${loggerConfig.rootPath}/${level}.log`,
				format: format.combine(
					commonFormat,
					exactLogLevelMatch(level),
					printLog,
				),
			})),
			new transports.File({
				filename: `${loggerConfig.rootPath}/all.log`,
				format: format.combine(
					commonFormat,
					printLog,
				),
			}),
		]
	},

	console: () => {
		const commonFormat = format.combine(commonLogFormat)

		return [
			...levelNames.map(({level}) => new transports.Console({
				format: format.combine(
					commonFormat,
					exactLogLevelMatch(level),
					colorizeMessage,
					printLog,
				),
			})),
		]
	},
}

function getCombinedTransports(loggerConfigs: Log[]) {
	return loggerConfigs.map(loggerConfig => loggerTransports[loggerConfig.logger](loggerConfig))
		.flat()
}

export default (loggerConfigs: Log[]) => {
	const lgr = createLogger({
		level: getMinLogLevel(),
		levels: winstonLevels,
		transports: getCombinedTransports(loggerConfigs),
	}) as CustomLogger

	lgr.error = (err, ...others) => {
		if (err instanceof Error) {
			lgr.log({level: 'error', message: `${err.stack || err}`, [SPLAT_SYMBOL]: others})
		} else {
			lgr.log({level: 'error', message: err, [SPLAT_SYMBOL]: others})
		}
	}

	return lgr
}

export const createConsoleLogger = (): Logger => {
	return createLogger({
		level: getMinLogLevel(),
		levels: winstonLevels,
		transports: new transports.Console({
			format: printLog,
		}),
		format: format.combine(
			commonLogFormat,
			colorizeMessage,
		),
	})
}
