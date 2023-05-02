import * as React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
// @mui
import { List, type ListItemIconProps, ListItemText } from '@mui/material'
import Box, { type BoxProps } from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
//
import { StyledNavItem, StyledNavItemIcon } from './styles'
// @mui/icons-material
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { type ItemType } from '../../layouts/guest/lateralDrawer/config'

// ----------------------------------------------------------------------

interface PropsNavSection extends BoxProps {
  data: ItemType[]
}

interface PropsNavItem extends ListItemIconProps {
  item: ItemType
}

// ----------------------------------------------------------------------

export default function NavSection ({ data, ...props }: PropsNavSection): JSX.Element {
  return (
    <Box {...props}>
      <List disablePadding>
        {data.map((item: ItemType) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  )
}

// ----------------------------------------------------------------------

function NavItem ({ item }: PropsNavItem): JSX.Element {
  const { title, path, icon, children } = item
  const [open, setOpen] = React.useState(false)

  const handleClick = (): void => {
    setOpen(!open)
  }

  const isChildren = children.length > 0

  return (
    <>
      {isChildren
        ? (
        <StyledNavItem
          onClick={handleClick}
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold'
            },
            '&.active svg': {
              color: 'primary.main'
            }
          }}
        >

          <StyledNavItemIcon>{icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={title} />

          <StyledNavItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</StyledNavItemIcon>

        </StyledNavItem >)
        : (
        <StyledNavItem
          component={RouterLink}
          to={path}
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold'
            },
            '&.active svg': {
              color: 'primary.main'
            }
          }}
        >
          <StyledNavItemIcon>{icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={title} />

        </StyledNavItem >
          )}

      {isChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {children.map((child) => (
              <NavItem key={child.title} item={child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
