import { AccountModel } from '../usecases/db-add-account-protocols';

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>;
}
