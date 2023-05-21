// component
import HomeIcon from '@mui/icons-material/Home'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'

// ----------------------------------------------------------------------
interface ItemType {
  title: string
  path: string
  icon: JSX.Element
  children: ItemType[]
}

// ----------------------------------------------------------------------

const firstConfig: ItemType[] = [
  {
    title: 'Homepage',
    path: '/',
    icon: <HomeIcon></HomeIcon>,
    children: []
  },
  {
    title: 'Club',
    path: '/dashboard/products',
    icon: <GroupsIcon></GroupsIcon>,
    children: []
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: <HomeIcon sx={{ color: (theme) => theme.palette.primary.main }}></HomeIcon>,
    children: []
  },
  {
    title: 'login',
    path: '/login',
    icon: <HomeIcon sx={{ color: (theme) => theme.palette.primary.main }}></HomeIcon>,
    children: []
  },
  {
    title: 'Not found',
    path: '/404',
    icon: <HomeIcon sx={{ color: (theme) => theme.palette.primary.main }}></HomeIcon>,
    children: []
  }
]

const rankingConfig: ItemType[] = [
  {
    title: 'Under 14',
    path: '/rankings/under14',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  },
  {
    title: 'Cadetti',
    path: '/rankings/cadetti',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  },
  {
    title: 'Giovani',
    path: '/rankings/giovani',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  },
  {
    title: 'Assoluti',
    path: '/rankings/assoluti',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  },
  {
    title: 'Master',
    path: '/rankings/master',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  },
  {
    title: 'Paralimpico',
    path: '/rankings/paralimpico',
    icon: <EmojiEventsIcon></EmojiEventsIcon>,
    children: []
  }
]

export { firstConfig, rankingConfig }
export type { ItemType }
