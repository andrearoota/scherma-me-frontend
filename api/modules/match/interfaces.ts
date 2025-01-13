export interface MatchResponseSchema {
    type: string
    winnerPoints: number
    loserPoints: number
    winner: string
    loser: string
    winnerName: string
    loserName: string
    weaponName: string
    competitionName: string
    competitionDateStart: string
    competitionDateEnd: string
    competitionId: number
    categoryName: string
}
