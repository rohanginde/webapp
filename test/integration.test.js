import { expect as _expect, use} from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
const expect = _expect;

use(chaiHttp);

import {app} from '../app.js'; // Replace 'your-app' with the actual file that sets up your Express app


describe('API Tests', () => {
  

  it('', (done) => {
    chai.request(app)
      .get('/healthz') // Replace with the actual endpoint you want to test
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
        process.exit(0)
      });
  });

  // Add more test cases as needed
});
