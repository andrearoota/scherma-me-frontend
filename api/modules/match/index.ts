import { AthleteApi } from '../..'
import { AxiosClient } from '../../axios'
import { buildRequestConfig } from '../../utils/helper'
import { Pagination } from '../../utils/pagination'
import { MatchResponseSchema } from './interfaces'

const basePath = 'matches'

export async function get(fisCode: string, params: object) {
    const config = buildRequestConfig(params)
    const { data } = await AxiosClient.get<Pagination<MatchResponseSchema>>(
        `${AthleteApi.basePath}/${fisCode}/${basePath}`,
        config
    )
    return data
}
