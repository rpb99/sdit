import moment from 'moment'
import 'moment/locale/id'

export const dateFormat = (date) => {
    return moment(date).locale('id').format('LL')
}