// React
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
// @mui
import { styled } from '@mui/material/styles'
// components
import Navbar from './navbar'
import LateralDrawer from './lateralDrawer'

// ----------------------------------------------------------------------

const NAVBAR_HEIGHT = 64

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default
}))

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  marginTop: theme.spacing(1),
  paddingTop: NAVBAR_HEIGHT,
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

// ----------------------------------------------------------------------

export default function GuestLayout (): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <StyledRoot>
      <Navbar onOpenNav={() => { setOpen(true) }} />

      <LateralDrawer openNav={open} onCloseNav={() => { setOpen(false) }} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  )
}
