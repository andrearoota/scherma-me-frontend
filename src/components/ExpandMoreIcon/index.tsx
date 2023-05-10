// @mui
import { type SvgIconProps } from '@mui/material'

// Echarts
import { styled } from '@mui/material/styles'
import ExpandMore from '@mui/icons-material/ExpandMore'

// ----------------------------------------------------------------------

interface ExpandMoreProps extends SvgIconProps {
  expand: boolean
}

// ----------------------------------------------------------------------

const StyledExpandMoreIcon = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <ExpandMore {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

// ----------------------------------------------------------------------

export default function ExpandMoreIcon ({ expand }: ExpandMoreProps): JSX.Element {
  return (
        <StyledExpandMoreIcon expand={expand} />
  )
}
