export interface QuestionType {
  id:       number;
  text:     string;
  category: Category;
}

export enum Category {
  Ec = "EC",
  It = "IT",
  SP = "SP",
  Tc = "TC",
}