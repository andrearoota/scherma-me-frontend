import { AxiosRequestConfig } from 'axios'

export function buildRequestConfig(options: unknown) {
    const query: AxiosRequestConfig = {
        params: options,
    }
    return query
}
