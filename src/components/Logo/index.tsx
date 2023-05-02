import { Link as RouterLink } from 'react-router-dom'
// @mui
import { Box, type BoxProps, Link } from '@mui/material'
import { ReactComponent as ReactLogoOnLight } from '../../assets/logoOnLight.svg'
import { ReactComponent as ReactLogoOnDark } from '../../assets/logoOnDark.svg'
// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  onLight?: boolean
  disabledLink?: boolean
}

// ----------------------------------------------------------------------

export default function Logo (props: LogoProps): JSX.Element {
  const { disabledLink, sx, onLight, ...otherProps } = props
  const logo = (
        <Box
            component="div"
            sx={{
              width: 'auto',
              height: 40,
              display: 'inline-flex',
              ...sx
            }}
            {...otherProps}
        >
          { (onLight ?? true) ? <ReactLogoOnLight /> : <ReactLogoOnDark />}
        </Box>
  )

  if (disabledLink ?? false) {
    return <>{logo}</>
  }

  return (
        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
            {logo}
        </Link>
  )
}
