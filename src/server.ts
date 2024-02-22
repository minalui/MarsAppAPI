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

router.get('/rovers/:roverName/photos/:cameraType', async (req:any, res:any) => {

    let roverPhotoList;
    try {
        roverPhotoList = await requestHelper.getRoverPhotos(req.params.roverName, req.params.cameraType);
        console.log(roverPhotoList);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

    if (roverPhotoList != null) {
        let roverPhotoImages: string [] = [];
        roverPhotoList.photos.map((photo) => {
            roverPhotoImages.push(photo.img_src);
        })
        if(roverPhotoImages.length != 0) {
            res.send(roverPhotoImages);
        } else {
            res.send("No images found");
        }
    }

})
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});