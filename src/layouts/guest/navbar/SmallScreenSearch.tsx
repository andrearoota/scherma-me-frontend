import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Autocomplete, InputBase, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Paper from '@mui/material/Paper'
import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'

const HEIGHT_SEARCHBAR = 56

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.contrastText
}))

const StyledDialog = styled(Dialog)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  flexDirection: 'column',
  flexGrow: 1,
  '& .MuiAutocomplete-endAdornment, & .MuiAutocomplete-startAdornment': {
    padding: theme.spacing(0, 2)
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: theme.palette.text.secondary
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  borderRadius: '0px',
  backgroundColor: theme.palette.background.paper,
  height: HEIGHT_SEARCHBAR,

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

const StyledPaperAutocomplete = styled(Paper)(({ theme }) => ({
  borderRadius: '0px',
  padding: theme.spacing(0),
  marginTop: theme.spacing(1),
  height: '100%',
  boxShadow: 'none',
  overflow: 'hidden'
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
      <StyledDialog
        fullScreen
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 1300 }}
      >
        <StyledAutocomplete
          {...props}
          sx={{ flexGrow: 0, zIndex: 1300 }}
          fullWidth
          id="custom-input-demo"
          PaperComponent={StyledPaperAutocomplete}
          ListboxProps={{ style: { display: 'none' } }}
          renderOption={() => { return undefined }}
          renderInput={(params) => (
            <>
              <StyledInputBase
                autoFocus
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                placeholder="Cerca un atleta o club"
                startAdornment={<SearchIconWrapper
                  onClick={handleClose}
                  aria-label="close"
                  sx={{ left: 0 }}
                >
                  <ArrowBackIcon />
                </SearchIconWrapper>}
                endAdornment={params.InputProps.endAdornment} />

              <Divider variant="middle" />
            </>
          )}
        />
        {
          props.options.map((option: any) => (
            <List key={option.id} disablePadding sx={{ px: (theme) => theme.spacing(1.5) }} dense>
              <ListItemButton sx={{ borderRadius: (theme) => theme.shape.borderRadius }}>
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
            </List>
          ))
        }
      </StyledDialog>
    </>
  )
}
