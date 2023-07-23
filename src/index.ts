import express, {Request, Response} from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    debugger;
    let helloMessage = 'Hello incubator';
    res.send(helloMessage)
})

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
