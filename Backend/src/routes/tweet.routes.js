import { Router } from "express";
import {createTweet,deleteTweet,updateTweet,getAllTweets,getAllTweetsOfParticularUser} from '../controllers/tweet.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/create-tweet").post(verifyJWT,createTweet)
router.route("/delete-tweet/:tweetId").delete(deleteTweet)
router.route("/update-tweet/:tweetId").patch(updateTweet)
router.route("/get-all-tweets").get(getAllTweets)
router.route("/get-all-tweets-of-particular-user/:userId").get(getAllTweetsOfParticularUser)

export default router 