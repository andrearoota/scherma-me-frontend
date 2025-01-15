export interface StatsResponse {
  avgWinningPoolCoefficient: number;
  avgMaxDirectElimination: string;
  avgDifferenceHitsPool: number;
  avgCountDirectEliminationPerCompetition: number;
  hits: {
    pool: {
      given: number;
      received: number;
      diffWinner: number;
      diffLoser: number;
    };
    directElimination: {
      given: number;
      received: number;
      diffWinner: number;
      diffLoser: number;
    };
  };
  matches: {
    type: string;
    winner_count: string;
    loser_count: string;
    other_count: string;
  }[];
  poolsWinningCoefficients: Record<string, number>;
}

export interface GeneralStatsResponse {
  birthdays: BirthdaysForStatsResponse[];
  athletes: AthletesForStatsResponse[];
  clubs: ClubsForStatsResponse[];
  points: PointsForStatsResponse;
  matches: MatchesForStatsResponse;
}

export interface BirthdaysForStatsResponse {
  fullName: string;
  birthYear: number;
  fisCode: string;
  name: string | null;
  codeLetter: string;
}

export interface AthletesForStatsResponse {
  gender: string;
  count: number;
}

export interface ClubsForStatsResponse {
  weapon: string;
  count: number;
}

export interface PointsForStatsResponse {
  winner: number;
  loser: number;
}

export interface MatchesForStatsResponse {
  pool: number;
  directElimination: number;
}
