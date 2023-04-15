import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {
  private readonly emailvalidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailvalidator = emailValidator;
  }

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
    const isValid = this.emailvalidator.isValid(httpRequest.body.email);
    if (!isValid) {
      return new Promise((resolve) =>
        resolve(badRequest(new InvalidParamError('email')))
      );
    }
  }
}
