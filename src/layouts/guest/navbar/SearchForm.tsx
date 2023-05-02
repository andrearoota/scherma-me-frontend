import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'
import LargeScreenSearch from './LargeScreenSearch'
import ClearIcon from '@mui/icons-material/Clear'
import { useQuery } from '@tanstack/react-query'

import * as React from 'react'
import { type ListItemProps, Typography } from '@mui/material'
import SmallScreenSearch from './SmallScreenSearch'

import { getSearch } from '../../../api/search'

const StyledLargeScreenSearch = styled(LargeScreenSearch)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const StyledSmallScreenSearch = styled(SmallScreenSearch)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}))

interface SearchApiResponse {
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

interface SearchResultType {
  full_name?: string
  fis_code?: string
  type?: string
  birth_year?: number
  code_letter?: string
  code_fis?: string
  name?: string
}

export default function SearchForm (): JSX.Element {
  const [inputValue, setInputValue] = React.useState('')

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
    options: data?.hits ?? [],
    // "you will need to disable the built-in filtering of the Autocomplete component by overriding the filterOptions prop"
    filterOptions: (x: any) => x,
    noOptionsText: 'Nessun risultato',
    getOptionLabel: (option: SearchResultType) => option.fis_code,
    renderOption: (props: ListItemProps, option: SearchResultType) => (
            <li {...props}>
                <Grid container alignItems="center">
                    <Grid sx={{ display: 'flex', width: 44 }}>
                        {option.type === 'club'
                          ? <GroupsIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
                          : <PersonIcon sx={{ color: (theme) => theme.palette.text.secondary }} />}
                    </Grid>
                    <Grid sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                        <Typography variant="body1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
                            {option.full_name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {option.type === 'club' ? option.fis_code : option.birth_year}
                        </Typography>
                    </Grid>
                </Grid>
            </li>
    ),
    clearIcon: (<ClearIcon fontSize="medium" />)
  }

  return (
        <>
            <StyledLargeScreenSearch
                {...params}
            />
            <StyledSmallScreenSearch
                {...params}
            />
        </>

  )
}
