import {Logger} from 'winston'

export type LogType = 'file' | 'console'

export type Log = {
	logger: LogType
	rootPath?: string
}

export type LoggerConfig = {
	OVERRIDE_GLOBAL_CONSOLE_METHODS: boolean
	LEVEL: string
	LOGGERS: Log[]
	SKIP_MORGAN_REQUESTS_LOG: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface CustomLogger extends Logger {
	error: (a0: Error | string, ...a2: any) => void
}
