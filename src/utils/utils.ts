import _ from 'lodash'
import * as util from 'util'
import {v4 as uuidv4} from 'uuid'

export const uuid = () => uuidv4()

export function throwIfNull(value: object, errSupplier: () => Error) {
	if (value) {
		return value
	}

	throw errSupplier()
}

export const toWhiteSpaceSeparatedString = (array: string[]): string => {
	return array.filter(Boolean)
		.map(item => util.format(item))
		.join(', ')
}

export const kebabCaseObjectToLowerCamelCaseObj = <T>(obj: T): T => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return _.mapKeys(obj, (value, key) => _.camelCase(key))
}
