import { Router } from "express";
import { likeTweet, likeVideo, dislikeTweet,dislikeVideo,numberOfLikesOnCurrentTweet,numberOfLikesOnCurrentVideo,
       isCurrentTweetLiked,isCurrentVideoLiked
} from '../controllers/like.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/like-video/:videoId").post(verifyJWT,likeVideo)
router.route("/like-tweet/:tweetId").post(verifyJWT,likeTweet)
router.route("/dislike-video/:videoId").delete(verifyJWT,dislikeVideo)
router.route("/dislike-tweet/:tweetId").delete(verifyJWT,dislikeTweet)
router.route("/likes-on-video/:videoId").get(numberOfLikesOnCurrentVideo)
router.route("/likes-on-tweet/:tweetId").get(numberOfLikesOnCurrentTweet)
router.route("/is-tweet-liked/:tweetId").get(verifyJWT,isCurrentTweetLiked)
router.route("/is-video-liked/:videoId").get(verifyJWT,isCurrentVideoLiked)

export default router 