import {Comment} from '../models/comment.models.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import mongoose from 'mongoose' 

const addComment = async(req,res) => {
       try {
              const {videoId} = req.params
              if(!videoId){
                     return res.status(404).json(new ApiResponse(404,{},"videoId is missing in params",false))
              }
              const userId = req.user?._id
              if(!userId){ 
                     return res.status(404).json(new ApiResponse(404,{},"userId is missing in req.user",false))
              }
              const {content} = req.body
              if(!content){
                     return res.status(404).json(new ApiResponse(404,{},"Content is missing in req.body",false))
              }
              const commentInstance = await Comment.create({
                     content,
                     video : videoId,
                     owner : userId
              })
              if(!commentInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to comment on this video",false))
              }
              return res.status(201).json(new ApiResponse(201,commentInstance,"Comment added on current video successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to add comment on current  video",false))
       }
}

const deleteComment = async(req,res) => {
       try {
              const {commentId} = req.params
              if(!commentId){
                     return res.status(404).json(new ApiResponse(404,{},"commentId is missing in params",false))
              }
              const deletedCommentInstance = await Comment.findByIdAndDelete(commentId)
              if(!deletedCommentInstance){
                     return res.status(500).json(new ApiResponse(500,{},"Unable to delete comment",false))
              }
              return res.status(200).json(new ApiResponse(200,deletedCommentInstance,"Comment deleted successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to add comment on current  video",false))
       }
}

const readComments = async(req,res) => {
       try {
              const {videoId} = req.params
              if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
                     return res.status(404).json(new ApiResponse(404,{},"videoId is missing in params",false))
              }
              const comments = await Comment.find({video : videoId})
              return res.status(200).json(new ApiResponse(200,comments,"Comments fetched successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in reading comment"))
       }
}

const countNumberOfComments = async(req,res) => {
       try {
              const {videoId} = req.params
              if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
                     return res.status(404).json(new ApiResponse(404,{},"videoId is missing in params",false))
              }
              const numberOfComments = await Comment.countDocuments({video : videoId})
              return res.status(200).json(new ApiResponse(200,numberOfComments,"Number of comments fetched successfully",true))
       } catch (error) {
           return res.status(500).jaon(new ApiResponse(500,{},"Error occured while fetching number of comments on this video"))   
       }
}

export {
       addComment,
       deleteComment,
       readComments,
       countNumberOfComments,
}