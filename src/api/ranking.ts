import api from './config'

import {
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState
} from 'material-react-table'

interface TableParams {
  globalFilter: string
  columnFilters: MRT_ColumnFiltersState
  pagination: MRT_PaginationState
  sorting: MRT_SortingState
}

export const getRanking = async (url: string, tableParams: TableParams = {
  globalFilter: '',
  columnFilters: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  sorting: []
}): Promise<any> => {
  const response = await api.get(
    `/rankings${url}`,
    {
      params: {
        start: `${(tableParams.pagination.pageIndex * tableParams.pagination.pageSize)}`,
        size: `${tableParams.pagination.pageSize}`,
        filters: JSON.stringify(tableParams.columnFilters ?? []),
        globalFilter: tableParams.globalFilter ?? '',
        sorting: JSON.stringify(tableParams.sorting ?? [])
      }
    }
  )

  return response.data
}

export const getListRankings = async (url: string): Promise<any> => {
  try {
    return (await api.get(`/rankings${url}`)).data.data
  } catch (error) {
    console.error(error)
    return error
  }
}
