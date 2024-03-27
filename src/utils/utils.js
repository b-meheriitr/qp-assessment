import _ from 'lodash'
import * as util from 'util'
import {v4 as uuidv4} from 'uuid'

export const uuid = () => uuidv4()

export function throwIfNull(value, errSupplier) {
	if (value) {
		return value
	}

	throw errSupplier()
}

export const toWhiteSpaceSeparatedString = array => {
	return array.filter(Boolean)
		.map(item => util.format(item))
		.join(', ')
}

export const kebabCaseObjectToLowerCamelCaseObj = obj => _.mapKeys(obj, (value, key) => _.camelCase(key))
