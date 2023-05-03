import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators';
import { Validation } from '../../../../../presentation/protocols/validation';
import { makeLoginValidation } from '../../login/login/login-validation-factory';

jest.mock('../../../../validation/validators/validation-composite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of ['question', 'answer']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
