import request from 'supertest';
import app from '../app';

describe('Body Parser Middleware', () => {
  test('', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Gugu' })
      .expect({ name: 'Gugu' });
  });
});
