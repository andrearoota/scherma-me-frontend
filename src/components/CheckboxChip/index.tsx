import CheckIcon from '@mui/icons-material/Check'
import { Box, Chip, Divider, type IconProps, Typography } from '@mui/material'
import { type ChipProps } from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

import * as React from 'react'

// ----------------------------------------------------------------------

interface CheckboxChipProps extends ChipProps {
  selected?: boolean
  title: string
  listOfChips: Array<{ label: string, value: string }>
  setSelectedChips: React.Dispatch<React.SetStateAction<string[]>>
  selectedChips: string[]
}

interface StyledChipProps extends IconProps {
  selected: boolean
}

// ----------------------------------------------------------------------

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<StyledChipProps>(({ selected, theme }) => ({
  borderRadius: '.5rem',
  boxShadow: 'none',
  transition: theme.transitions.create(['marginLeft', 'paddingLeft', 'width']),
  '& .MuiChip-icon': {
    marginLeft: '0px',
    marginRight: '0px'
  },
  '& .MuiChip-label': {
    paddingRight: '16px',
    paddingLeft: '16px'
  },
  ...(selected &&
    {
      '& .MuiChip-label': {
        paddingLeft: '8px'
      },
      '& .MuiChip-icon': {
        marginRight: '0px',
        marginLeft: '8px'
      }
    })
}))

const StyledCheckIcon = styled(CheckIcon, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<StyledChipProps>(({ selected, theme }) => ({
  zIndex: 1,
  pointerEvents: 'none',
  fontSize: '18px',
  width: '0px',
  transition: theme.transitions.create(['width']),
  ...(selected &&
    {
      width: 'auto'
    })
}))

// ----------------------------------------------------------------------

export default function CheckboxChip (props: CheckboxChipProps): JSX.Element {
  const { title, listOfChips, selectedChips, setSelectedChips, ...otherProps } = props

  const isAllSelected = selectedChips.includes('all')

  const updateStateCheckBox = (key: string, isSelected: boolean = true): void => {
    if (key === 'all') {
      setSelectedChips(isSelected ? ['all', ...listOfChips.map(x => x.value)] : [])
    } else {
      setSelectedChips(isSelected ? [...selectedChips, key] : selectedChips.filter(e => e !== key))

      if (isSelected && selectedChips.length + 1 === listOfChips.length) {
        updateStateCheckBox('all')
      } else if (!isSelected && selectedChips.length === listOfChips.length + 1) {
        setSelectedChips(listOfChips.filter(e => e.value !== key).map(x => x.value))
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box>
        <Typography variant='body1' mb={1} fontWeight={'bold'}>
          {title}
        </Typography>
        <Box
          role="group"
          aria-labelledby="fav-movie"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
          <StyledChip
            {...otherProps}
            key='all'
            variant={isAllSelected ? 'filled' : 'outlined'}
            selected={isAllSelected}
            color='primary'
            clickable
            label='Tutti'
            icon={<StyledCheckIcon selected={isAllSelected}/>}
            onClick={() => { updateStateCheckBox('all', !isAllSelected) }}
            sx={{ backgroundColor: isAllSelected ? 'primary.light' : 'transparent', color: isAllSelected ? 'primary.contrastText' : 'primary.main' }}
          />

          <Divider orientation='vertical' variant="middle" flexItem />

          {listOfChips.map((item) => {
            const checked = selectedChips.includes(item.value)
            return (
              <StyledChip
                {...otherProps}
                key={item.value}
                variant={checked ? 'filled' : 'outlined'}
                selected={checked}
                color='primary'
                clickable
                label={item.label}
                icon={<StyledCheckIcon selected={checked}/>}
                onClick={() => { updateStateCheckBox(item.value, !checked) }}
                sx={{ backgroundColor: checked ? 'primary.light' : 'transparent', color: checked ? 'primary.contrastText' : 'primary.main' }}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
