import express = require('express');
import { RequestHelper } from "./requests";
// import express from 'express'

const app = express();
const port = 8000;
const requestHelper = new RequestHelper();

app.use(express.json());
const router = express.Router();
router.get('/test', (req:any, res:any) => res.send('Hello world !'));
router.get('/rovers', async (req:any, res:any) => {
    const roversList = await requestHelper.getRovers();

    res.send(roversList);
});

router.get('/rovers/photos', async (req:any, res:any) => {
    const roverPhotoList = await requestHelper.getRoverPhotos();
    let roverPhotoImages: string [] = [];
    roverPhotoList.photos.map((photo) => {
        roverPhotoImages.push(photo.img_src);
    })
    console.log(roverPhotoImages);
    roverPhotoImages.forEach((photo) => {

    })
    res.send(roverPhotoImages);
})
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});