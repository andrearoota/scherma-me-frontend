import { Category, Gender, Season, Weapon } from '@/api/utils/commonInterfaces';

export interface Athlete {
  fullName: string;
  birthYear: number;
  fisCode: string;
}

export interface Club {
  codeLetter: string;
  name: string | null;
}

export interface Row {
  id: number;
  position: number;
  totalPoints: number;
  athlete: Athlete;
  club: Club;
}

export interface RankingResponse {
  id: number;
  date: string;
  weapon: Weapon;
  category: Category;
  gender: Gender;
  season: Season;
  rows: Row[];
}

export interface ListRankingsResponse {
  id: number;
  date: string;
  season: number;
}

export interface HistoryRankingsResponse {
  position: number;
  clubName?: string;
  clubCodeLetter: string;
  weaponName: string;
  date: string;
}
