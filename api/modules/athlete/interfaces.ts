import { Category } from '../../../models/Category'

export interface AthleteForSearchResponse {
    full_name: string
    fis_code: string
}

export interface AthleteAndStatsResponse {
    full_name: string
    fis_code: string
    current_club?: {
        name?: string
        code_letter: string
    }
    categoriesCurrent?: string[]
    categoriesHistory?: Category[]
    rowsCurrent?: {
        position: number
        weaponName: string
        categoryName: string
    }[]
    weaponsCurrent?: string[]
    lastResults?: LastResultResponse[]
    nextEvents?: {
        date_start: string
        date_end: string
        name: string
        placeName: string
        weaponName: string
        categoryName: string
    }[]
}

export interface LastResultResponse {
    position: number
    competitionId: number
    competitionName: string
    dateStart: string
    dateEnd: string
    weaponName: string
    categoryName: string
}
