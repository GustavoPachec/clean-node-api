import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../presentation/helpers/validators';
import { Validation } from '../../../../presentation/protocols/validation';
import { CompareFieldsValidation } from '../../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
