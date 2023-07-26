import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

export const app = express();
const port = 3000;

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null,
    createdAt: Date,
    publicationDate: string,
    availableResolutions: string[]
}

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

const videosDb  = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 2,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    }
]



// MIDDLEWARE
const parserMiddleware = bodyParser();
app.use(parserMiddleware);


// CREATE
app.post('/videos', (req: any, res: Response<VideoType>) => {
   const newVideo = {
       id: +(new Date()),
       title: req.body.title,
       author: req.body.author,
       canBeDownloaded: true,
       minAgeRestriction: null,
       createdAt: new Date(),
       publicationDate: "2023-07-24T11:49:49.897Z",
       availableResolutions: [
           "P144"
       ]}

    videosDb.push(newVideo as any)
    res.status(201).send(newVideo)
})


// GET
app.get('/videos', (req: Request<{},{},{},{}>, res: any) => {
    res.send(videosDb)
})

app.get('/videos/:id', (req: Request<{id: string},{},{},{}>, res: any) => {
    let videos = videosDb.find((v: any)  => v.id === +req.params.id);

    if(videos){
        res.send(videos)
    } else {
        res.send(404)
    }
})


// UPDATE
app.put('/videos/:id', (req: any, res: any ) => {
    let video= videosDb.find((v: any)  => v.id === +req.params.id);
    console.log("req.body.title")

    if(video){
        video.title = req.body.title
        res.send(video)
    } else{
        res.send(404)
    }
})



// DELETE
app.delete('/videos/:id', (req: Request<{id: string},{},{},{}>, res: Response) => {
    let videos = videosDb.find((v: any)  => v.id === +req.params.id);

    if(videos){
        for(let i = 0; i < videosDb.length; i++){
            if(videosDb[i].id === +req.params.id){
                videosDb.splice(i, 1);
                res.send(204);
                return;
            }
        }
    } else {
        res.send(404)
    }
})




app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
