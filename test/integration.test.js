import { expect as _expect, use} from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
const expect = _expect;

use(chaiHttp);

import {app} from '../app.js'; // Replace 'your-app' with the actual file that sets up your Express app
const server = app.listen(3000); // Replace 3000 with the port your app is running on

describe('API Tests', () => {
  after(() => {
    server.close(); // Close the server after tests are done
  });

  it('', (done) => {
    chai.request(app)
      .get('/healthz') // Replace with the actual endpoint you want to test
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  // Add more test cases as needed
});
