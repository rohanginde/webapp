import  get  from 'axios';
import { expect } from 'chai';

describe('/health Endpoint Integration Tests', () => {
  it('should return a 200 status code for MySQL', async () => {
    const response = await get('http://localhost:3000/healthz');
    expect(response.status).to.equal(200);
    // Additional assertions based on the response content
  });


});
