import api from './config'

export const getSearch = async (search: string): Promise<any> => {
  try {
    const response = await api.get(
      'search',
      {
        params: {
          q: search
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}
