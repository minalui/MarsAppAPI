import express = require('express');
const axios = require('axios').default;

const app = express();
const port = 8000;

const apikey = "cwS3LbOcP8yskjoV7O8oSHWeoaw70O1Jvxa3hk9z";

let nasaResponse: any;

axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=' + apikey)
    .then(function (response: any) {
        console.log(response);
        nasaResponse = response.data;
    })


app.use(express.json());
const router = express.Router();
router.get('/test', (req:any, res:any) => res.send('Hello world !'));
router.get('/rovers', (req:any, res:any) => res.send(nasaResponse));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});