import { AxiosClientAuth } from '../../axios'

//const basePath = ''

export async function get() {
    return await AxiosClientAuth.get('user')
}
