import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'

import * as React from 'react'

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: theme.transitions.create(['border-radius']),

  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon and ClearIcon
    padding: theme.spacing(1, theme.spacing(7)),
    width: '30vw',
    minWidth: '22ch', // placeholder="Cerca un atleta o club" is 22 char
    maxWidth: '50ch'
  },

  '&:hover, &.Mui-focused': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },

  '&.Mui-focused': {
    borderEndStartRadius: '0px',
    borderEndEndRadius: '0px'
  }
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-paper': {
    borderStartStartRadius: '0px',
    borderStartEndRadius: '0px'
  },
  '& .MuiAutocomplete-endAdornment': {
    padding: theme.spacing(0, 2)
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: theme.palette.primary.contrastText,
    visibility: 'visible',
    top: 'calc(50% - 16px)'
  }
}))

const StyledPaperAutocomplete = styled(Paper)(({ theme }) => ({
  borderStartStartRadius: '0px',
  borderStartEndRadius: '0px',
  padding: theme.spacing(1, 0)
}))

export default function LargeScreenSearch (props: any): JSX.Element {
  return (
        <StyledAutocomplete
            {...props}
            id="custom-input-demo"
            PaperComponent={StyledPaperAutocomplete}
            ListboxProps={{ style: { maxHeight: '85vh' }, ...props.ListboxProps }}
            renderInput={(params) => (
                <StyledInputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder="Cerca un atleta o club"
                    startAdornment={<SearchIconWrapper sx={{ left: 0 }}>
                        <SearchIcon />
                    </SearchIconWrapper>}
                    endAdornment={params.InputProps.endAdornment} />
            )}
        />
  )
}
