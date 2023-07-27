import express, {Request, Response} from 'express';
import videoValidator from "../validator/videoValidation";
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

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

let videosDb = [
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
app.post('/videos', (req: Request, res: Response) => {
   const newVideo = {
       id: +(new Date()),
       title: req.body.title,
       author: req.body.author,
       canBeDownloaded: req.body.canBeDownloaded,
       minAgeRestriction: req.body.minAgeRestriction,
       createdAt: new Date().toISOString(),
       publicationDate: new Date().toISOString(),
       availableResolutions: [
           ...req.body.availableResolutions
       ]}

    const { title, author, availableResolutions } = req.body;
    const errs = videoValidator.check({ title, author, availableResolutions });
    if (errs.length > 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: errs
        });
        return;
    }

    videosDb.push(newVideo as any)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})


// GET
app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(videosDb)
})

app.get('/videos/:id', (req: Request<{id: string},{},{},{}>, res: any) => {
    let videos = videosDb.find((v: any)  => v.id === +req.params.id);

    if(videos){
        res.status(HTTP_STATUSES.OK_200).send(videos)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})


// UPDATE
app.put('/videos/:id', (req: Request, res: Response ) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const errs = videoValidator.check({ title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate });

    if (errs.length > 0 || !req.params.id) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: errs
        });
        return;
    }

    let video= videosDb.find((v: any)  => v.id === +req.params.id);
    if(video){
        video.title = req.body.title
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(video)
    }
})



// DELETE
app.delete('/videos/:id', (req: Request<{id: string},{},{},{}>, res: Response) => {
    let videos = videosDb.find((v: any)  => v.id === +req.params.id);
    if(videos){
        for(let i = 0; i < videosDb.length; i++){
            if(videosDb[i].id === +req.params.id){
                videosDb.splice(i, 1);
                res.send(HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/testing/all-data', (req, res) => {
    videosDb = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})




app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
