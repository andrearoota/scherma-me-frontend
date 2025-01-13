export interface HistoryCompetitionResponse {
    categoryName: string
    competitionId: number
    competitionName: string
    date_end: string
    date_start: string
    position: number
    weaponName: string
}

export interface FinalRankingResponse {
    position: number
    full_name: string
    penalty?: string
}
