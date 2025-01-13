import { CalendarResponse } from './interfaces'
import { AxiosClient } from '../../axios'

const basePath = 'calendars'

export async function latest() {
    const { data } = await AxiosClient.get<CalendarResponse>(
        `${basePath}/latest`
    )
    return data
}
