import request from 'supertest';
import app from '../app';

describe('Content-Type Middleware', () => {
  test('Should return default Content-Type as JSON', async () => {
    app.get('/test_content_type', (_req, res) => res.send(''));

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  test('Should return xml Content-Type when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml');
      return res.send('');
    });

    await request(app).get('/test_content_type_xml').expect('content-type', /xml/);
  });
});
