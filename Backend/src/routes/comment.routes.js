import { Router } from "express";
import {addComment,deleteComment,readComments,countNumberOfComments} from '../controllers/comment.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/add-comment/:videoId").post(verifyJWT,addComment)
router.route("/delete-comment/:commentId").delete(verifyJWT,deleteComment)
router.route("/read-comments/:videoId").get(readComments)
router.route("/count-comments/:videoId").get(countNumberOfComments)

export default router   