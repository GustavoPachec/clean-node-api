import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogErrorRepository } from '../../data/protocols/db/log-error-repository';

// responsavel por registrar os erros que ocorrem durante o processamento da requisição no servidor.
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  // decorator vai chamar o controller com a request correta
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
export { LogErrorRepository };
