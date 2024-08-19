import { Like } from '../models/like.models.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'
import {Tweet} from '../models/tweet.models.js'

const likeVideo = async(req,res) => {
       try {
              const userId = req.user?._id
              if(!userId){
                     return res.status(404).json(new ApiResponse(404,{},"Unable to find userId in parameters",false))
              }
              const {videoId} = req.params
              if(!videoId){
                     return res.status(404).json(new ApiResponse(404,{},"videoId is missing in url",false))
              }
              const likeInstance = await Like.create({
                     video : videoId,
                     likedBy : userId
              })
              if(!likeInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to like this video",false))
              }
              return res.status(201).json(new ApiResponse(201,likeInstance,"Video liked successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to like the current video",false))
       }
}

const likeTweet = async(req,res) => {
       try {
              const userId = req.user?._id
              if(!userId){
                     return res.status(404).json(new ApiResponse(404,{},"Unable to find userId in parameters",false))
              }
              const {tweetId} = req.params
              if(!tweetId){
                     return res.status(404).json(new ApiResponse(404,{},"tweetId is missing in url",false))
              }
              const likeInstance = await Like.create({
                     likedBy : userId,
                     tweet : tweetId
              })
              if(!likeInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to like this tweet",false))
              }
              return res.status(201).json(new ApiResponse(201,likeInstance,"Tweet liked successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to like the tweet",false))
       }
}

const dislikeVideo = async(req,res) => {
       try {
              const userId = req.user?._id
              if(!userId){
                     return res.status(404).json(new ApiResponse(404,{},"Unable to find userId in parameters",false))
              }
              const {videoId} = req.params
              if(!videoId){
                     return res.status(404).json(new ApiResponse(404,{},"videoId is missing in url",false))
              }
              const dislikeInstance = await Like.findOneAndDelete({
                     video : videoId,
                     likedBy : userId
              })
              if(!dislikeInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to unlike current video",false))
              }
              return res.status(200).json(new ApiResponse(200,dislikeInstance,"Video unliked successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to dislike this tweet",false))
       }
}
 
const dislikeTweet = async(req,res)=> {
       try {
              const userId = req.user?._id
              if(!userId){
                     return res.status(404).json(new ApiResponse(404,{},"Unable to find userId in parameters",false))
              }
              const {tweetId} = req.params
              if(!tweetId){
                     return res.status(404).json(new ApiResponse(404,{},"tweetId is missing in url",false))
              }
              const dislikeInstance = await Like.findOneAndDelete({
                     likedBy : userId,
                     tweet : tweetId
              })
              if(!dislikeInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to dislike this tweet",false))
              }
              return res.status(200).json(new ApiResponse(200,dislikeInstance,"Tweet unliked successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to dislike the tweet",false))
       }
}
   
const numberOfLikesOnCurrentTweet = async(req,res) => {
       try {
              const { tweetId } = req.params
              if(!tweetId || !mongoose.Types.ObjectId.isValid(tweetId)){
                     return res.status(404).json(new ApiResponse(404,{},"Missing tweetId in parameter",false))
              }
              const likesCount = await Like.countDocuments({ tweet: tweetId });
              return res.status(200).json(new ApiResponse(200,likesCount,"Number of likes on current tweet is correctly fetched",true))
       } catch (error) {
              console.log("Error in number of like on current tweet in backend")
              return res.status(500).json(new ApiResponse(500,{},"Backend ke aukat ke bahar hai",false))
       }
}

const isCurrentTweetLiked = async(req,res) => {
       try {
              const userId = req.user?._id
              if(!userId  || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new  ApiResponse(404,{},"userId is missing in cookies",false))
              }
              const {tweetId} = req.params
              if(!tweetId || !mongoose.Types.ObjectId.isValid(tweetId)){
                     return res.status(404).json(new ApiResponse(404,{},"tweetId is missing in params",false))
              }
              const likeInstance = await Like.findOne({
                     tweet : tweetId,
                     likedBy : userId
              })
              if(likeInstance){
                     return res.status(200).json(new ApiResponse(200,true,"Current tweet is liked already",true))
              }
              else{
                     return res.status(200).json(new ApiResponse(200,false,"Current tweet is  notliked already",true))
              }
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in isCurrentTweetLiked function",false))
       }
}

const isCurrentVideoLiked = async(req,res) => {
       try {
              const userId = req.user?._id
              const {videoId} = req.params
              if(!userId  || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new  ApiResponse(404,{},"userId is missing in cookies",false))
              }

              if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
                     return res.status(404).json(new ApiResponse(404,{},"tweetId is missing in params",false))
              }

              const likeInstance = await Like.findOne({
                     video : videoId,
                     likedBy : userId
              })
              if(likeInstance){
                     return res.status(200).json(new ApiResponse(200,true,"Current video is liked already",true))
              }
              else{
                     return res.status(200).json(new ApiResponse(200,false,"Current video is  notliked already",true))
              }

       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in isCurrentVideoLiked function",false)) 
       }
}

const numberOfLikesOnCurrentVideo = async(req,res) => {
       try {
            const {videoId} = req.params
            if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
              return res.status(404).json(new ApiResponse(404,{},"Missing videoId in parameters",false))
            }  
            const likeCount = await Like.countDocuments({video : videoId});
            return res.status(200).json(new ApiResponse(200,likeCount,"Number of likes on current  video is correctly fetched",true))
       } catch (error) {
              console.log("Error in number of like on current video in backend")
              return res.status(500).json(new ApiResponse(500,{},"Backend ke aukat ke bahar hai",false))
       }
}

export {
       likeTweet,
       likeVideo,
       dislikeTweet,
       dislikeVideo,
       numberOfLikesOnCurrentTweet,
       isCurrentTweetLiked,
       isCurrentVideoLiked,
       numberOfLikesOnCurrentVideo
}