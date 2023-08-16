import moment from 'moment'

export function fixOffsetDate (date: string): string {
  return moment(date).subtract(process.env.TIME_ZONE, 'h').format()
}
