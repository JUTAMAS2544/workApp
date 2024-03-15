export interface UserType {
  id:                      number;
  email:                   string;
  password:                string;
  sex:                     string;
  status:                  string;
  age:                     string;
  education_level:         string;
  occupation:              string;
  working_period_agrofood: string;
  type_sme:                string;
  working_period:          string;
  num_personnel:           string;
  answer_1:                string;
  answer_2:                string;
  answer_3:                string;
  answer_4:                string;
  answer_5:                string;
  answer_6:                string;
}

export interface LoginType {
  email: string
  password: string
}