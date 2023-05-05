import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answers: [
                {
                  answer: 'Answers 1',
                  image: 'http://imagem.com',
                },
                {
                  answers: 'Answers 2',
                },
              ],
            },
          ],
        });
      expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const { insertedId: id } = await accountCollection.insertOne({
        name: 'Guga',
        email: 'guga@gmail.com',
        password: 'guga123',
        role: 'admin',
      });
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            accessToken,
          },
        }
      );

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answers: [
                {
                  answer: 'Answers 1',
                  image: 'http://imagem.com',
                },
                {
                  answers: 'Answers 2',
                },
              ],
            },
          ],
        });
      expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app).get('/api/surveys');
      expect(403);
    });
  });
});
