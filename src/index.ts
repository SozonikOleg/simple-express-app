const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
    debugger;
    let helloMessage = 'Hello incubator';
    res.send(helloMessage)
})

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
