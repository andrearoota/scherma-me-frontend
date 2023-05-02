import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// @mui
import { styled, useTheme } from '@mui/material/styles'
import { Box, Link, Drawer, Typography, Stack, Divider } from '@mui/material'

// hooks
import useResponsive from '../../../hooks/useResponsive'
// components
import NavSection from '../../../components/nav-section'
// routes
import { firstConfig, rankingConfig } from './config'
// icons
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import CoffeeIcon from '@mui/icons-material/Coffee'
// theme
import Logo from '../../../components/Logo'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const NAV_HEIGHT = 64

// ----------------------------------------------------------------------

LateralDrawer.propTypes = {
  openNav: PropTypes.bool.isRequired,
  onCloseNav: PropTypes.func.isRequired
}

// ----------------------------------------------------------------------

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  }
}))

const StyledNavSection = styled(NavSection)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingTop: `${NAV_HEIGHT}px`,
    marginTop: theme.spacing(2)
  }
}))

export default function LateralDrawer ({ openNav, onCloseNav }: PropTypes.InferProps<typeof LateralDrawer.propTypes>): JSX.Element {
  const { pathname } = useLocation()

  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const theme = useTheme()

  const renderContent = (
        <>
            <StyledHeader alignItems="center" justifyContent="flex-start" sx={{ pt: 3, px: 1.5, direction: 'row' }}>
                <Logo sx={{ width: '80%' }} />
            </StyledHeader>

            <StyledNavSection data={firstConfig} sx={{ px: 1.5, pt: 1.5 }} />

            <Divider sx={{ pt: 1, mx: 3.5 }} />

            <Typography variant="body2" sx={{ px: 1.5, pt: 1.5 }}>
                Ranking
            </Typography>

            <NavSection data={rankingConfig} sx={{ px: 1.5, pt: 1.5 }} />

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ px: 1.5, py: 3 }}>
                <Stack alignItems="center" spacing={3} sx={{ borderRadius: 2, position: 'relative' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                            Seguici
                        </Typography>

                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ pb: 1 }}>
                            <Link href="https://www.instagram.com/scherma.me/" target="_blank">
                                <InstagramIcon fontSize="large"></InstagramIcon>
                            </Link>
                            <Link href="https://www.facebook.com/scherma.me" target="_blank">
                                <FacebookIcon fontSize="large"></FacebookIcon>
                            </Link>
                        </Stack>

                        <Link href="https://paypal.me/rota98?locale.x=it_IT" target="_blank">
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Offrici un caffè
                                <CoffeeIcon fontSize='inherit' sx={{ verticalAlign: 'text-bottom' }}></CoffeeIcon>
                            </Typography>
                        </Link>
                    </Box>
                </Stack>
            </Box>
        </>
  )

  return (
        <Box
            component="nav"
            sx={{
              flexShrink: { lg: 0 },
              width: { lg: DRAWER_WIDTH },
              borderRadius: 25
            }}
        >
            {isDesktop
              ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                      sx: {
                        width: DRAWER_WIDTH,
                        bgcolor: 'background.default'
                      }
                    }}
                >
                    {renderContent}
                </Drawer>
                )
              : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                      keepMounted: true
                    }}
                    PaperProps={{
                      sx: {
                        width: DRAWER_WIDTH,
                        borderEndEndRadius: theme.shape.borderRadius,
                        borderStartEndRadius: theme.shape.borderRadius
                      }
                    }}
                >
                    {renderContent}
                </Drawer>
                )}
        </Box>
  )
}
