// eslint-disable-next-line max-classes-per-file
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { AuthMiddleware } from './auth-middleware';
import { AccountModel } from '../controllers/signup/signup-controller-protocols';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valida_name',
  email: 'valida_email@mail.com',
  password: 'hashed_password',
});

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load(_accessToken: any, _role?: string): Promise<AccountModel> {
        return new Promise((resolve) => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load(_accessToken: any, _role?: string): Promise<AccountModel> {
        return new Promise((resolve) => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toBeCalledWith('any_token');
  });
});
