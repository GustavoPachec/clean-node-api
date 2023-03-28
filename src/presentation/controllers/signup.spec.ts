// eslint-disable-next-line max-classes-per-file
import { SignUpController } from "./signup"
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { EmailValidator } from '../protocols'

/* Estrutura que define a sintaxe para as classes. As classes derivadas de uma interface devem seguir a estrutura fornecida por sua interface */
interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

// Cria uma variável e atribui a ela uma arrow function que recebe uma tipagem do tipo EmailValidator, ou seja tudo o que foi passado para o objeto EmailValidator, Aqui na classe vai ter que retonar o que foi designado em EmailValidator
// Logo após a função isValid implementa o que foi atribuido ao EmalValidator
// Por fim retorna uma instância de EmailValidator, que sera um objeto que de fato que vai representar EmailValidator
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub
}

// const makeSut recebe os valores do tipo SutTypes logo após a const emailValidatorStub recebe a função makeEmailValidator
// sut recebe uma nova instância de SignUpController que recebe emailValidatorStub e depois temos um return de sut, e emailValidatorStub
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut =  new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

// Describe é usado para agrupar um conjunto de testes relacionados em um bloco.
describe('SignUp Controller', () => {
  //
  test('Should return 400 if no name is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual( new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confitmation is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const {sut, emailValidatorStub} = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email ', () => {
    const {sut, emailValidatorStub} = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if an invalid email is provided', () => {
    const {sut, emailValidatorStub} = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(500)
    expect (httpResponse.body).toEqual(new ServerError())
  })
})
