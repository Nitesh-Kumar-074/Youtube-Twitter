import { Router } from "express";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import {uploadVideo,deleteVideo,getAllVideos,getVideo,getAllVideosOfParticularUser} from '../controllers/video.controllers.js'

const router = Router()

router.route("/upload-video").post(
       upload.fields([
              {
                     name : "videoFile",
                     maxCount : 1
              },
              {
                     name : "thumbNail",
                     maxCount : 1
              }
       ]),verifyJWT,uploadVideo
)

router.route("/delete-video/:videoId").delete(deleteVideo)
router.route("/get-video/:videoId").get(getVideo)
router.route('/get-all-videos').get(getAllVideos)
router.route(`/get-all-videos-of-a-particular-user/:userId`).get(getAllVideosOfParticularUser)

export default router