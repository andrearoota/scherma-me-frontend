// @mui
import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemButton } from '@mui/material'

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props: any) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius
}))

export const StyledNavItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 24,
  height: 24,
  color: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  paddingRight: theme.spacing(1.5),
  paddingLeft: theme.spacing(2)
}))
