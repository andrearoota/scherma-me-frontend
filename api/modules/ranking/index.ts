import { AthleteApi } from '../..'
import { AxiosClient } from '../../axios'
import { buildRequestConfig } from '../../utils/helper'
import { HistoryRankingsResponse } from './interfaces'

const basePath = 'rankings'

export async function rows(fisCode: string, params: object) {
    const config = buildRequestConfig(params)
    const { data } = await AxiosClient.get<HistoryRankingsResponse[]>(
        `${AthleteApi.basePath}/${fisCode}/${basePath}`,
        config
    )
    return data
}
