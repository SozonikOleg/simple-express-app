import request from 'supertest';
import {app} from '../src/index';
import {HTTP_STATUSES} from "../src/index";

describe('/course', () => {

    beforeAll( async () => {
        await request(app).delete('/__test__/data')
    })

    it("Should return 200 and empty array", async() => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it("Should return 404 for not existing video", async() => {
        await request(app)
            .get('/videos/9999')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it("Should create video with incorrect input data", async() => {
        await request(app)
            .get('/videos/9999')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it("Should create video with incorrect input data", async() => {
        await request(app)
            .post('/videos')
            .send({title: ''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdVideo: any = null;

    it("Should create video with correct input data", async() => {
       const createdResponse =  await request(app)
            .post('/videos')
            .send({title: 'Video1'})
            .expect(HTTP_STATUSES.CREATED_201)

      createdVideo = createdResponse.body;

       expect(createdVideo).toEqual({
           id: expect.any(Number),
           title: 'Video1',
           publicationDate:  "2023-07-24T11:49:49.897Z",
           minAgeRestriction: null,
           createdAt: expect.any(String),
           canBeDownloaded: true,
           availableResolutions: [ "P144",]
       })

        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [createdVideo])
    })

    it("Should'nt create video with incorrect input data", async() => {
       await request(app)
            .post('/videos' + createdVideo.id)
            .send({title: 'Video1'})
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it("Should'nt update course that not exist", async() => {
       await request(app)
            .put('/videos/987')
            .send({title: 'Video2'})
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it("Should update course with correct input data", async() =>   {
        await request(app)
            .put('/videos/' + createdVideo.id)
            .send({title: 'Video2'})
            .expect(HTTP_STATUSES.OK_200)

        await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdVideo,
                title: 'Video2'
            })
    })

    it("Should delete course", async() =>   {
        await request(app)
            .delete('/videos/' + createdVideo.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })




})