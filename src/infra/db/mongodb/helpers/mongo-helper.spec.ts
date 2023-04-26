import { MongoHelper as sut } from './mongo-helper';

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string);
  });
  afterAll(async () => {
    await sut.disconnect();
  });
  test('Should reconnect to MongoDB if client is down', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.disconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
