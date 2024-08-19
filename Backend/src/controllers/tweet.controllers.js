import { ApiResponse } from '../utils/ApiResponse.js'
import { Tweet } from '../models/tweet.models.js'
import mongoose from 'mongoose'

const createTweet = async(req,res) => {
       try { 
              const {content} = req.body
              if(!content){
                     return res.status(404).json(new ApiResponse(404,{},"Content field is missing"))
              }
              const tweet = await Tweet.create({
                     content,
                     owner : req.user?._id
              })
              if(!tweet){
                     return res.status(500).json(new ApiResponse(500,{},"Error in creating tweet",false))
              }
              return res.status(201).json(new ApiResponse(201,tweet,"Tweet created succesfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in creating post",false))
       }
}

const deleteTweet = async(req,res) =>{
       try {
              const {tweetId} = req.params
              if(!tweetId){
                     return res.status(500).json(new ApiResponse(500,{},"Tweet id is not present in parameter"))
              }
              const response = await Tweet.findByIdAndDelete(tweetId)
              if(!response){
                     return res.status(500).json(new ApiResponse(500,{},"Tweet is not deleted successfully",false))
              }
              return res.status(200).json(new ApiResponse(200,response,"Tweet ius deleted successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in deleting the current tweet",false))
       }
}


const updateTweet = async(req,res) => {
       try {
              const {tweetId} = req.params
              const {content} = req.body
              if(!tweetId || !content){
                     return res.status(404).json(new ApiResponse(404,{},"Tweetid and content are required for updating tweet",false))
              }
              const response = await Tweet.findByIdAndUpdate(
                     tweetId,
                     {
                            $set: {
                                   content,
                            }
                     },
                     {
                            new : true
                     }
              )
              if(!response)
                     return res.status(500).json(new ApiResponse(500,{}," Tweet is not updated",false))
              return res.status(200).json(new ApiResponse(200,response,"Tweet updated successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Tweet is not updataed",false))
       }
}

const getAllTweets = async(req,res) => {
       try {
              const tweets = await Tweet.find()
              return res.status(200).json(new ApiResponse(200,tweets,"All tweets fetched successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error occured in getting all tweets",false))
       }
}

const getAllTweetsOfParticularUser = async(req,res) => {
       try {
              const {userId} = req.params
              if(!userId || !mongoose.Types.ObjectId.isValid(userId))
                     return res.status(404).json(new ApiResponse(404,{},"User id is missing in parameters",false))
              const response = await Tweet.find({owner : userId})
              return res.status(200).json(new ApiResponse(200,response,"All tweets of current user fetched successfully",true))
       } catch (error) {
             return res.status(500).json(new ApiResponse(500,{},"Error occured in getting all tweets of current user",false)) 
       }
}


export {
       createTweet,
       deleteTweet,
       updateTweet,
       getAllTweets,
       getAllTweetsOfParticularUser
}