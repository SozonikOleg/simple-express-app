import request from 'supertest';
import {app} from '../src/index';

describe('/course', () => {

    it("Should return 200 and empty array", async() => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    })
})