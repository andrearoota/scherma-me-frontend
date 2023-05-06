import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Autocomplete, InputBase, List } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const HEIGHT_SEARCHBAR = 56

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.contrastText
}))

const StyledList = styled(List)(({ theme }) => ({
  maxHeight: 'none!important'
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '&.MuiAutocomplete-root': {
    flexGrow: 0
  },
  '& .MuiAutocomplete-endAdornment, & .MuiAutocomplete-startAdornment': {
    padding: theme.spacing(0, 2)
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: theme.palette.text.secondary,
    visibility: 'visible'
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  borderRadius: '0px',
  backgroundColor: theme.palette.background.paper,
  height: HEIGHT_SEARCHBAR,
  width: '100%',

  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon and ClearIcon
    padding: theme.spacing(1, theme.spacing(7))
  }
}))

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1),
  position: 'absolute',
  left: 0,
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  sx: {
    PointerEvent: 'pointer'
  }
}))

export default function SmallScreenSearch (props: any): JSX.Element {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <StyledIconButton onClick={handleClickOpen}>
        <SearchIcon />
      </StyledIconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <StyledAutocomplete
          {...props}
          open={true}
          disablePortal={true}
          sx={{ flexGrow: 1 }}
          fullWidth
          id="custom-input-small-screen-search"
          PaperComponent={'div'}
          ListboxComponent={StyledList}
          renderInput={(params) => {
            // Prevent scroll to top when click on input SAFARI
            params.inputProps.onFocus = () => {
              window.scrollTo(0, 0)
              document.body.scrollTop = 0
            }
            return (
             <>
              <StyledInputBase
                autoFocus
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                placeholder="Cerca un atleta o club"
                startAdornment={
                <SearchIconWrapper
                  onClick={handleClose}
                  aria-label="close"
                  sx={{ left: 0 }}
                >
                  <ArrowBackIcon />
                </SearchIconWrapper>
                }
                endAdornment={params.InputProps.endAdornment} />

              <Divider variant="middle" />
            </>
            )
          }}
        />
      </Dialog>
    </>
  )
}
