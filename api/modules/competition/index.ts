import { AthleteApi } from '../..'
import { AxiosClient } from '../../axios'
import { buildRequestConfig } from '../../utils/helper'
import { Pagination } from '../../utils/pagination'
import { FinalRankingResponse, HistoryCompetitionResponse } from './interfaces'

const basePath = 'competitions'

export async function get(fisCode: string, params: object) {
    const config = buildRequestConfig(params)
    const { data } = await AxiosClient.get<
        Pagination<HistoryCompetitionResponse>
    >(`${AthleteApi.basePath}/${fisCode}/${basePath}`, config)
    return data
}

export async function getFinalRanking(id: number) {
    const { data } = await AxiosClient.get<FinalRankingResponse[]>(
        `${basePath}/${id}/final-ranking`
    )
    return data
}
