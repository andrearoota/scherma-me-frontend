import axios, { AxiosError } from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

class AxiosConfiguration {
    private static readonly baseURL: string = import.meta.env.VITE_API_BASE_URL
    private static readonly authPath: string = '/auth'
    private static readonly headers: Partial<AxiosRequestHeaders> = {
        'Content-Type': 'application/json',
    }

    public axios: AxiosInstance

    constructor(isAuth = false, config?: AxiosRequestConfig) {
        this.axios = axios.create({
            baseURL: AxiosConfiguration.baseURL,
            headers: AxiosConfiguration.headers,
            ...config,
        })

        if (isAuth) {
            this.axios = this.withAuth()
        }

        this.axios.interceptors.response.use(
            (response) => response,
            (error: AxiosError<unknown, unknown>) => {
                this.handleRequestError(error)
                throw error
            }
        )
    }

    protected handleRequestError(error: AxiosError): void {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response.data)
            console.error('Status code:', error.response.status)
            if (
                error.response.status === 401 ||
                error.response.status === 419
            ) {
                localStorage.removeItem('authenticated')
                window.location.href = '/login'
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message)
        }
    }

    withAuth(): AxiosInstance {
        // Apply authentication headers or any other modifications
        this.axios.defaults.withCredentials = true
        this.axios.defaults.withXSRFToken = true
        this.axios.defaults.baseURL =
            AxiosConfiguration.baseURL + AxiosConfiguration.authPath
        return this.axios
    }
}

export const AxiosClientAuth: AxiosInstance = new AxiosConfiguration(true).axios
export const AxiosClient: AxiosInstance = new AxiosConfiguration().axios
