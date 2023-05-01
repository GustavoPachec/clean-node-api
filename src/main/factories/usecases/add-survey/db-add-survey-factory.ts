import { AddSurvey } from '../../../../domain/usecases/add-survey';
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository';
import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey';

export const makeDbAddsurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
