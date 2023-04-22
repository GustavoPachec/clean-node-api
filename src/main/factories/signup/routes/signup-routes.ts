import { Router } from 'express';
import { makeSignUpController } from '../signup';
import { adaptRoute } from '../../../adapters/express-routes-adapter';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
