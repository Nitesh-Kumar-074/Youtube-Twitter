import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'

import {registerUser,loginUser,logoutUser,generateAccessAndRefreshToken,
       getCurrentUser,refreshAccessToken,changeCurrentPassword,updateAccountDetails,
       updateUserAvatar,updateUserCoverImage,getUserProfile,getAuthorDetails,getUserDetailsFromUsername
} from '../controllers/user.controllers.js'

const router = Router()

router.route("/register-user").post(upload.fields([
       {
              name : 'avatar',
              maxCount : 1
       },
       {
              name : "coverImage",
              maxCount : 1
       }
]),registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refrsh-token").post(refreshAccessToken)
router.route("/change-password").patch(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/get-user-profile/:username").get(verifyJWT,getUserProfile)
router.route("/author-details/:userId").get(getAuthorDetails)
router.route("/get-user-from-username/:username").get(getUserDetailsFromUsername)


export default router