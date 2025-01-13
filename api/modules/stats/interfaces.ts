export interface StatsResponse {
    avgWinningPoolCoefficient: number
    avgMaxDirectElimination: string
    avgDifferenceHitsPool: number
    avgCountDirectEliminationPerCompetition: number
    hits: {
        pool: {
            given: number
            received: number
            diffWinner: number
            diffLoser: number
        }
        directElimination: {
            given: number
            received: number
            diffWinner: number
            diffLoser: number
        }
    }
    matches: {
        type: string
        winner_count: string
        loser_count: string
        other_count: string
    }[]
    poolsWinningCoefficients: Record<string, number>
}
