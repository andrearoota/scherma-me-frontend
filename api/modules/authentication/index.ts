import { SignInError, SignInRequest, SignInResponse } from './interfaces'
import { AxiosClient, AxiosClientAuth } from '../../axios'

//const basePath = ''

export async function signIn(data: SignInRequest) {
    await AxiosClient.get('/sanctum/csrf-cookie', {
        withCredentials: true,
        withXSRFToken: true,
    })

    return await AxiosClient.post<SignInResponse | SignInError>(
        '/login',
        data,
        {
            withCredentials: true,
            withXSRFToken: true,
        }
    )
}

export async function signOut() {
    return await AxiosClientAuth.post('/logout')
}
