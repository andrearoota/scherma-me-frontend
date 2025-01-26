interface Athlete {
  id: number;
  fisCode: string;
  fullName: string;
  birthYear: number;
  birthDate: string;
  club: number;
  gender: string;
}

interface Club {
  id: number;
  name: string | null;
  codeLetter: string;
  telephone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
}

interface GeneralCompetition {
  id: number;
  name: string;
  season: number;
  dateStart: string | null;
  dateEnd: string | null;
  place: string | null;
  type: string;
}

interface Competition {
  id: number;
  points: number;
  orderInRank: number;
  isValidForTotal: boolean;
  weapon: string;
  gender: string;
  generalCompetition: GeneralCompetition;
}

export interface RowResponse {
  id: number;
  position: number;
  totalPoints: number;
  athlete: Athlete;
  club: Club;
  ranking: number;
  competitions: Competition[];
}