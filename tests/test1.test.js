
const request = require('supertest');
const app = require('../server');

describe('GET /register', () => {
  it('responds with 200 and students list when data fetched successfully', (done) => {
    request(app)
      .get('/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with 500 and error message when data fetching fails', (done) => {
    const mockDb = jest.spyOn(require('../db'), 'query').mockImplementation((query, callback) => {
      callback(new Error('Error fetching data from the database'), null);
    });
    request(app)
      .get('/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, { error: 'An error occurred while fetching data from the database' }, () => {
        mockDb.mockRestore();
        done();
      });
  });
});
