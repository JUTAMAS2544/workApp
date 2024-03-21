export interface ScoreType {
  id:        number;
  userId:    number;
  ans1_tc:   number;
  ans2_tc:   number;
  ans3_tc:   number;
  ans4_tc:   number;
  ans5_tc:   number;
  ans6_tc:   number;
  ans7_tc:   number;
  ans8_tc:   number;
  ans9_tc:   number;
  ans10_sp:  number;
  ans11_sp:  number;
  ans12_sp:  number;
  ans13_it:  number;
  ans14_it:  number;
  ans15_it:  number;
  ans16_it:  number;
  ans17_it:  number;
  ans18_it:  number;
  ans19_it:  number;
  ans20_ec:  number;
  ans21_ec:  number;
  ans22_ec:  number;
  ans23_ec:  number;
  ans24_ec:  number;
  ans25_ec:  number;
  ans26_ec:  number;
  ans27_ec:  number;
  ans28_ec:  number;
  ans29_ec:  number;
  ans30_ec:  number;
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