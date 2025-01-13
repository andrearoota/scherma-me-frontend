import { MassURLUpdateRequest } from './interfaces'
import { AxiosClientAuth } from '../../axios'

const basePath = 'events'

export async function massUpdateUrl(request: MassURLUpdateRequest) {
    await AxiosClientAuth.put(`${basePath}/mass-url-update`, request)
}
