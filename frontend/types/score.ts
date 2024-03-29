export interface ScoreType {
  id:         number;
  value:      number;
  questionId: number;
  userId:     number;
}

export interface SendType {
  value:      number;
  questionId: number;
}

export interface SummaryType {
  id:     number;
  userId: number;
  tc_1:   number;
  tc_2:   number;
  tc_3:   number;
  tc_4:   number;
  sp_1:   number;
  it_1:   number;
  it_2:   number;
  it_3:   number;
  ec_1:   number;
  ec_2:   number;
  ec_3:   number;
  ec_4:   number;
  score:  number;
}

export interface SuggesstionType {
  suggesstions: Suggesstion[];
  tc:           number;
  sp:           number;
  it:           number;
  ec:           number;
  score:        number;
}

export interface Suggesstion {
  id:       number;
  topic:    string;
  topic_th: string;
  lower:    number;
  upper:    number;
  content:  string;
}

export interface ScoreDataType {
  id:     number;
  nameTH: string;
  nameEN: string;
  value:  number;
}
