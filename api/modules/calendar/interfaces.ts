import { Category } from '../../../models/Category'

export interface CalendarResponse {
    date: string
    source_file: string | null
    events: EventResponse[]
}

interface EventResponse {
    name: string
    start: string | null
    end: string | null
    isNew: boolean
    place: string
    country: string
    type: string | null
    categories: Category[]
    event_formulas: { name: string }[]
    event_gender_weapons: {
        weapon: string
        gender: string
    }[]
    url: string | undefined
}
