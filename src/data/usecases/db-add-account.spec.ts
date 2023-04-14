// eslint-disable-next-line max-classes-per-file
import { DbAddAccount } from './db-add-account';
import {
  AccountModel,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from './db-add-account-protocols';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterStub();
};
const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_accountData: AddAccountModel): Promise<AccountModel> {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
});
interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(makeFakeAccountData());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      })
    );
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository correct values ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });
  test('Should return an account on success ', async () => {
    const { sut } = makeSut();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const account = await sut.add(accountData);
    expect(account).toEqual(makeFakeAccount());
  });
});
