import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

class AxiosConfiguration {
  private static readonly baseURL: string = process.env.API_BASE_URL || 'http://localhost/api';
  private static readonly authPath: string = '/auth';
  private static readonly headers: Partial<AxiosRequestHeaders> = {
    'Content-Type': 'application/json',
  };

  public axios: AxiosInstance;

  constructor(isAuth = false, config?: AxiosRequestConfig) {
    this.axios = axios.create({
      baseURL: AxiosConfiguration.baseURL,
      headers: AxiosConfiguration.headers,
      ...config,
    });

    if (isAuth) {
      this.axios = this.withAuth();
    }

    // Apply case middleware to convert snake_case to camelCase
    this.axios = applyCaseMiddleware(this.axios);

    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError<unknown, unknown>) => {
        this.handleRequestError(error);
        throw error;
      }
    );
  }

  protected handleRequestError(error: AxiosError): void {
    console.error('Request error:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      console.error('Status code:', error.response.status);
      if (error.response.status === 401 || error.response.status === 419) {
        localStorage.removeItem('authenticated');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }

  withAuth(): AxiosInstance {
    // Apply authentication headers or any other modifications
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.withXSRFToken = true;
    this.axios.defaults.baseURL = AxiosConfiguration.baseURL + AxiosConfiguration.authPath;
    return this.axios;
  }
}

export const AxiosClientAuth: AxiosInstance = new AxiosConfiguration(true).axios;
export const AxiosClient: AxiosInstance = new AxiosConfiguration().axios;
