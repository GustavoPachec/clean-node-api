import { HttpRequest, HttpResponse } from './http';

/*  define um Controller para lidar com requisições HTTP e produzir respostas HTTP correspondentes. */
export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
