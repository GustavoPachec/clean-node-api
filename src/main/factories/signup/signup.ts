import { SignUpController } from '../../../presentation/controllers/signup/signup';
import { DbAddAccount } from '../../../data/usecases/db-add-account';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log';
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log';
import { makeSignUpValidation } from './signup-validation';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bycrytAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bycrytAdapter, accountMongoRepository);
  const signuUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation()
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signuUpController, logMongoRepository);
};