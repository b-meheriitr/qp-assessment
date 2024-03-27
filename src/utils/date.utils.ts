import moment from 'moment/moment'
import {DATE_FORMAT} from '../config'

export const dateString = (format = DATE_FORMAT) => moment().format(format)
