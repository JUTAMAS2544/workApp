export interface QuestionTC {
  id:         number;
  title:      string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
  question_8: string;
  question_9: string;
}

export interface QuestionSP {
  id:         number;
  title:      string;
  question_1: string;
  question_2: string;
  question_3: string;
}

export interface QuestionIT {
  id:         number;
  title:      string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
}

export interface QuestionEC {
  id:         number;
  title:      string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
  question_8: string;
  question_9: string;
  question_10: string;
  question_11: string;
}

export interface Answer {
  userId:   number;
  tc:       Tc;
  sp:       Sp;
  it:       It;
  ec:       Ec;
}

export interface Tc {
  ans1_tc:  number;
  ans2_tc:  number;
  ans3_tc:  number;
  ans4_tc:  number;
  ans5_tc:  number;
  ans6_tc:  number;
  ans7_tc:  number;
  ans8_tc:  number;
  ans9_tc:  number;
}
export interface Sp {
  ans10_sp: number;
  ans11_sp: number;
  ans12_sp: number;
}
export interface It {
  ans13_it: number;
  ans14_it: number;
  ans15_it: number;
  ans16_it: number;
  ans17_it: number;
  ans18_it: number;
  ans19_it: number;
}
export interface Ec {
  ans20_ec: number;
  ans21_ec: number;
  ans22_ec: number;
  ans23_ec: number;
  ans24_ec: number;
  ans25_ec: number;
  ans26_ec: number;
  ans27_ec: number;
  ans28_ec: number;
  ans29_ec: number;
  ans30_ec: number;
}