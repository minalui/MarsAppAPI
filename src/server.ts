import express = require('express');
import { RequestHelper } from "./requests";
import cors = require('cors');

const app = express();
const port = 8000;
const requestHelper = new RequestHelper();
const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(express.json());
const router = express.Router();
router.get('/test', (req:any, res:any) => res.send('Hello world !'));

router.get('/apod', cors(corsOptions), async (req:any, res:any) => {
    const apodResponse = await requestHelper.getApod();
    res.send(apodResponse);
})
router.get('/rovers', cors(corsOptions), async (req:any, res:any) => {
    const roversListResponse = await requestHelper.getRovers();
    const roversListData = roversListResponse.rovers;
    const roversList:string[] = [];
    roversListData.map((rover) => {
        roversList.push(rover.name);
    })
    res.send(roversList);
});

router.get('/rovers/:roverName', cors(corsOptions), async (req:any, res:any) => {
    const roverCameraListResponse = await requestHelper.getRoverCameras(req.params.roverName);
    const roverCameraListData = roverCameraListResponse.rover.cameras;
    const roverCameraList:string[] = [];
    roverCameraListData.map((camera) => {
        roverCameraList.push(camera.name);
    })
    res.send(roverCameraList);
});

router.get('/rovers/:roverName/photos/:cameraType', cors(corsOptions), async (req:any, res:any) => {

    let roverPhotoList;
    try {
        roverPhotoList = await requestHelper.getRoverPhotos(req.params.roverName, req.params.cameraType);
        console.log(roverPhotoList);
    } catch (error) {
        console.log(error);
    }

    if (roverPhotoList != null) {
        let roverPhotoImages: string [] = [];
        for(let i = 0; i < 5; i++) {
            roverPhotoImages.push(roverPhotoList.photos[i].img_src);
        }
        if(roverPhotoImages.length != 0) {
            res.send(roverPhotoImages);
        } else {
            res.send("No images found");
        }
    } else {
        res.send('Error, please try again');
    }

})
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});