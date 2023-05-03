import { NextFunction, Request, Response } from 'express';
import { HttpRequest, Middleware } from '../../presentation/protocols';

export const adaptMiddleware = (middleware: Middleware) => async (req: Request, res: Response, next: NextFunction) => {
  const httpRequest: HttpRequest = {
    headers: req.headers,
  };
  const httpResponse = await middleware.handle(httpRequest);
  Object.assign(req, httpResponse.body);
  if (httpResponse.statusCode === 200) {
    next();
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};
