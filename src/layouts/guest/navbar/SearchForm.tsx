import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'
import LargeScreenSearch from './LargeScreenSearch'
import ClearIcon from '@mui/icons-material/Clear'
import { useQuery } from '@tanstack/react-query'

import * as React from 'react'
import { type ListItemButtonProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SmallScreenSearch from './SmallScreenSearch'

import { getSearch } from '../../../api/search'

import Cookies from 'universal-cookie'
import useResponsive from '../../../hooks/useResponsive'

// ----------------------------------------------------------------------

export interface SearchApiResponse {
  data: {
    hits: SearchResultType[]
    hitsPerPage: number
    page: number
    processingTimeMs: number
    query: string
    totalHits: number
    totalPages: number
  }
  message?: string
}

export interface SearchResultType {
  full_name?: string
  fis_code?: string
  type?: string
  birth_year?: number
  code_letter?: string
  code_fis?: string
  name?: string
}

// ----------------------------------------------------------------------

export default function SearchForm (): JSX.Element {
  const cookies = new Cookies()

  const [inputValue, setInputValue] = React.useState('')
  const [recentSearches, setRecentSearches] = React.useState<SearchResultType[]>(cookies.get('recentSearches') ?? [])

  const { data } = useQuery({
    queryKey: ['searchData', inputValue],
    queryFn: async () => {
      const data = await getSearch(inputValue) as SearchApiResponse
      data.data.hits = data.data.hits.map((item) => {
        item.type = item.full_name === undefined ? 'club' : 'athlete'
        if (item.type === 'club') {
          item.full_name = item.name?.length === 0 ? item.code_letter : item.name?.toLowerCase()
          item.fis_code = item.code_letter
          delete item.name
          delete item.code_fis
        }
        return item
      })
      return data.data
    },
    enabled: inputValue.length > 1
  })

  const params = {
    freeSolo: true,
    onInputChange: (event: Event, newInputValue: string) => { setInputValue(newInputValue) },
    options: data?.hits ?? recentSearches,
    // "you will need to disable the built-in filtering of the Autocomplete component by overriding the filterOptions prop"
    filterOptions: (x: any) => x,
    noOptionsText: 'Nessun risultato',
    getOptionLabel: (option: SearchResultType) => option.full_name,
    onChange: (event: Event, newValue: SearchResultType | null) => { if (newValue !== null) setRecentSearches(setCookiesSearch(cookies, newValue)) },
    ListboxProps: { dense: true },
    renderOption: (props: ListItemButtonProps, option: SearchResultType) =>
      (
      <ListItemButton {...props} sx={{ borderRadius: (theme) => theme.shape.borderRadius }}>
        <ListItemIcon>
        {option.type === 'club'
          ? <GroupsIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
          : <PersonIcon sx={{ color: (theme) => theme.palette.text.secondary }} />}
        </ListItemIcon>
        <ListItemText // DA CAPITALIZZARE
          primary={option.full_name}
          secondary={option.type === 'club' ? option.fis_code : option.birth_year}
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        />
      </ListItemButton>
      ),
    clearIcon: (<ClearIcon fontSize="medium" />)
  }

  return (
    useResponsive('up', 'lg')
      ? <LargeScreenSearch {...params} />
      : <SmallScreenSearch {...params} />

  )
}

function setCookiesSearch (cookies: Cookies, option: SearchResultType): SearchResultType[] {
  const cookiesOptions = {
    path: '/',
    maxAge: 3600 * 24 * 7
  }

  let recentSearches: SearchResultType[] = []

  try {
    recentSearches = (cookies.get('recentSearches') ?? []).filter((item: SearchResultType) => item.fis_code !== option.fis_code).slice(0, 7)
    recentSearches.unshift(option) // add to the beginning of the array, now because "unshift" returns the new length of the array
    cookies.set('recentSearches', recentSearches, cookiesOptions)
  } catch (error) {
    cookies.remove('recentSearches', cookiesOptions)
  }

  return recentSearches
}
