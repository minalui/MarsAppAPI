import axios from 'axios'

interface RoversList {
    rovers: Rover[]
}
interface Rover {
    "id":number,
    "name":string,
    "landing_date":string,
    "launch_date":string,
    "status":string,
    "max_sol":number,
    "max_date":string,
    "total_photos":number,
    "cameras": [
        {
            "name":string,
            "full_name":string
        }
    ]
}

interface RoverPhotos {
    photos: RoverPhoto[]
}

interface RoverPhoto {
    id: number,
    sol: number,
    camera: {
        id: number,
        "name": string,
        "rover_id": number,
        "full_name": string,
    },
    img_src: string,
    earth_date: string,
    rover: Rover,
}

type cameraTypes = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES';

export class RequestHelper {
    // private api
    private apiKey = "cwS3LbOcP8yskjoV7O8oSHWeoaw70O1Jvxa3hk9z";

    constructor() {
    }

    public async getRovers(): Promise<RoversList> {
        const nasaRoversResponse = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=' + this.apiKey);
        let data = nasaRoversResponse.data;
        return data;
    }

    public async getRoverPhotos(roverName: string, cameraType: cameraTypes): Promise<RoverPhotos> {
        try {
            const roverPhotoResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=0&camera=${cameraType}&api_key=${this.apiKey}`)
            const data = roverPhotoResponse.data;
            return data;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

}

// // someFunc
// function aaaa(callback: (data) => void) {
//     someFunc()
//         .then((aaaaaa) => {
//             callback(aaaaaa)
//         })
//         .catch(e => {
//
//         })
// }
// //
// // aaaa((data) => {console.log(data)})
// //
// async function bbbbbb(): Promise<void> {
//     try {
//         const aaaaa = await someFunc()
//         ///
//     } catch (e) {
//         //
//     }
//
//     return aaaaa
// }
//
// enum RoverError
//

