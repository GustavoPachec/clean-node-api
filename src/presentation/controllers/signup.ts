export class SignUpController {
  handle (_httpRequest) {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
