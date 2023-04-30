import { SignUpController } from '../../presentation/controllers/signup/signup-controller';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account-mongo-repository';
import { Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log-controller-decorator';
import { LogMongoRepository } from '../../infra/db/mongodb/log/log-mongo-repository';
import { makeSignUpValidation } from './controllers/signup/signup-validation-factory';
import { makeDbAuthentication } from './usecases/authentication/db-authentication-factory';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bycrytAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bycrytAdapter, accountMongoRepository);
  const signuUpController = new SignUpController(dbAddAccount, makeSignUpValidation(), makeDbAuthentication());
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signuUpController, logMongoRepository);
};
