import PropTypes from 'prop-types'
// @mui
import { styled } from '@mui/material/styles'
import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
// icon
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
//
import SearchForm from './SearchForm'
import Logo from '../../../components/Logo'

// ----------------------------------------------------------------------

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer - 1,
  flexGrow: 1,
  [theme.breakpoints.up('lg')]: {
    zIndex: theme.zIndex.drawer + 1
  }
}))

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  position: 'fixed'
}))

// ----------------------------------------------------------------------

Navbar.propTypes = {
  onOpenNav: PropTypes.func.isRequired
}

function Navbar ({ onOpenNav }: PropTypes.InferProps<typeof Navbar.propTypes>): JSX.Element {
  return (
        <StyledBox>
            <StyledAppBar>
                <Toolbar sx={{ px: 2, justifyContent: 'space-between' }}>
                  <Box
                      sx={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        display: 'flex'
                      }}>
                      <IconButton
                          onClick={onOpenNav}
                          size="large"
                          edge="start"
                          aria-label="open drawer"
                          sx={{
                            mr: { xs: 0, md: 2 },
                            color: 'inherit',
                            display: { lg: 'none' }
                          }}
                      >
                          <MenuIcon />
                      </IconButton>
                      <Logo onLight={false} sx={{ height: '18px', width: 'calc(18px * 8.333)' }}/>
                  </Box>

                  <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: { xs: 'flex-end', lg: 'center' } }}>
                      <SearchForm />
                  </Box>

                  <Box>
                      <IconButton
                          sx={{
                            ml: { xs: 0, md: 2 },
                            color: 'inherit'
                          }}>
                          <LoginIcon />
                      </IconButton>
                  </Box>

                </Toolbar>
            </StyledAppBar>
        </StyledBox >
  )
}

export default Navbar
