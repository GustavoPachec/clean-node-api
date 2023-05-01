import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { Middlewares, HttpRequest, HttpResponse } from '../protocols';

export class AuthMiddleware implements Middlewares {
  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise((resolve) => resolve(error));
  }
}
