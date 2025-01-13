export interface Pagination<T> {
    current_page: number
    next_page_url: string | null
    prev_page_url: string | null
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
    total: number
    data: T[]
}
