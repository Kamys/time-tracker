import * as moment from 'moment'

export const formatSecond = second => {
    return moment()
        .startOf('day')
        .seconds(second)
        .format('H:mm:ss');
}
