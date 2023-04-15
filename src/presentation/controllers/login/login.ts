import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  // eslint-disable-next-line consistent-return
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email')))
      );
    }
    if (!httpRequest.body.password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      );
    }
  }
}