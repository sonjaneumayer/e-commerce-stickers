import multer from 'multer'
import { envConfig } from '../config/env_config'

// TODO: Create the destination directory if it doesn't exist 

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Specify the client-side folder for storing images
        callback(null, `.${envConfig.imagePath}`)
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({ storage: storage })