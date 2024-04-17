import { Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import CardGenderStats from '../../../components/cards/CardGenderStats'
import CardWeaponStats from '../../../components/cards/CardWeaponStats'
import CardClubStats from '../../../components/cards/CardClubStats'
import { type Athlete } from '../../../pages/RankingGeneralPage'
import CardClubsPoints from '../../../components/cards/CardClubsPoints'
import CardClubsAthletes from '../../../components/cards/CardClubsAthletes'
import CardClubsRatio from '../../../components/cards/CardClubsRatio'

// ----------------------------------
// Interface

export interface ChartsData extends Athlete {
  gender: string
  weapon: string
  club: string
  points: number
}

export interface PropsData {
  athletes: ChartsData[]
  uniqueAthletes: ChartsData[]
  clubs: any
}

// ----------------------------------

export default function StatsRankingSection ({ athletes, uniqueAthletes, clubs }: PropsData): JSX.Element {
  return (
    <>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                Statistiche
        </Typography>
        <Grid container spacing={2}>
            <Grid xs={12} md={6} xl>
            <CardGenderStats chartData={uniqueAthletes} tableData={clubs} />
            </Grid>
            <Grid xs={12} md={6} xl>
            <CardWeaponStats chartData={athletes} tableData={clubs} />
            </Grid>
            <Grid xs={12} md={6} xl>
            <CardClubStats chartData={athletes} />
            </Grid>
        </Grid>

        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
            Classifiche club
        </Typography>
        <Grid container spacing={2}>
            <Grid xs={12} md={6} xl>
            <CardClubsPoints tableData={clubs} />
            </Grid>
            <Grid xs={12} md={6} xl>
            <CardClubsAthletes tableData={clubs} />
            </Grid>
            <Grid xs={12} md={6} xl>
            <CardClubsRatio tableData={clubs} />
            </Grid>
        </Grid>
    </>
  )
}
