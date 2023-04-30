export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswer[];
}

export interface SurveyAnswer {
  image: string;
  anser: string;
}

export interface AddSurvey {
  add(account: AddSurveyModel): Promise<void>;
}
