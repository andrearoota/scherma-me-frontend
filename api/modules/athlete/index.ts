import { AxiosClient } from '../../axios'
import { buildRequestConfig } from '../../utils/helper'
import { AthleteAndStatsResponse, AthleteForSearchResponse } from './interfaces'

export const basePath = 'athletes'

export async function search(search: string) {
    const config = buildRequestConfig({ search })
    const { data } = await AxiosClient.get<AthleteForSearchResponse[]>(
        basePath,
        config
    )
    return data
}

export async function get(fisCode: string) {
    const { data } = await AxiosClient.get<AthleteAndStatsResponse>(
        `${basePath}/${fisCode}`
    )
    return data
}
