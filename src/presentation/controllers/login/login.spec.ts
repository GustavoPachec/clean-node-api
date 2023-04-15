import { LoginController } from './login';
import { badRequest } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController();
    const HttpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const HttpResponse = await sut.handle(HttpRequest);
    expect(HttpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no password is provided', async () => {
    const sut = new LoginController();
    const HttpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };
    const HttpResponse = await sut.handle(HttpRequest);
    expect(HttpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
});
