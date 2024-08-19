import {ApiResponse} from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import {uploadImageOnColudinary,uploadVideoOnCloudinary,deleteImageFromCloudinary,deleteVideoFromCloudinary} from '../utils/cloudinary.js'
import { Video } from '../models/video.models.js'
import {Like} from '../models/like.models.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'


const registerUser = async(req,res) => {
       try {
              const {email,username,fullName,password} = req.body
              if([username,email,fullName,password].some((ele) => ele.trim() === '')){
                     return res.status(404).json(new ApiResponse(404,{},"All fields are required",false))
              }
              const existedUser = await User.findOne({
                     $or:[{username},{email}]
              })
              if(existedUser){
                     return res.status(403).json(new ApiResponse(403,{},"User already exist ",false))
              }
              let avatarLocalPath = null;
              if(req.files && req.files.avatar && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
                     avatarLocalPath = req.files.avatar[0].path
              }
              if(!avatarLocalPath){
                    return res.status(404).json(new ApiResponse(404,{},"Avatar is required",false))
              }

              let avatarResponse = await uploadImageOnColudinary(avatarLocalPath)

              if(!avatarResponse){
                     return res.status(500).json(new ApiResponse(500,{},"Error on server side while uploading avatar on cloudinary",false))
              }

              let coverImageLocalPath = null;
              if(req.files && req.files.coverImage && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
                     coverImageLocalPath = req.files.coverImage[0].path
              }
              let coverImageResponse = null
              if(coverImageLocalPath){
                     coverImageResponse = await uploadImageOnColudinary(coverImageLocalPath)
              }

              const user = await User.create({
                     username : username,
                     fullName,
                     email,
                     password,
                     avatar : avatarResponse.url, 
                     coverImage : coverImageResponse?.url,
                     public_idOfAvatarOnCloudinary : avatarResponse.public_id,
                     public_idOfCoverImageOnCloudinary : coverImageResponse?.public_id
              })

              if(!user){
                     return res.status(500).json(new ApiResponse(500,{},"Error while creating user in backend",false))
              }

              const createdUser = await User.findById(user._id).select("-password -refreshToken")
               if(!createdUser){
                     return res.status(500).json(new ApiResponse(500,{},"Error occured while fetching userdata from database in registerUser component",false))
               }

               return res.status(200).json(new ApiResponse(200,createdUser,"User registered successfully",true))

       } catch (error) {
              return res.status(404).json(new ApiResponse(404,{},"Error in registeruser function in backend",false))
       }
}


const generateAccessAndRefreshToken = async(userId) => {
       try {
            const user = await User.findById(userId)  
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
            user.refreshToken = refreshToken
            await user.save({validateBeforeSave:true})

            return {accessToken,refreshToken}
       } catch (error) {
              res.status(500).json(new ApiResponse(500,{},"Error in generating access token and refresh token",false))
       }
}

const loginUser = async(req,res) => {
       try {
              const {username,email,password} = req.body
              if(!username && !email){
                     return res.status(404).json(new ApiResponse(404,{},"Username or email is required",false))
              }

              const user = await User.findOne(
                     {
                            $or:[{username},{email}]
                     }
              )

              if(!user){
                    return  res.status(401).json(new ApiResponse(401,{},"User doesn't exist",false))
              }
              const isPasswordValid = await user.isPasswordCorrect(password)

              if(!isPasswordValid){
                     return res.status(403).json(new ApiResponse(403,{},"Invalid password",false))
              }

              const options = {
                     secure : true,
                     httpOnly : true
              }

              const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
              const userAfterRefreshTokenSaved = await User.findById(user._id).select("-password -refreshToken")
       
              return res.status(200)
              .cookie("accessToken",accessToken,options)
              .cookie("refreshToken",refreshToken,options)
              .json(new ApiResponse(200,
                     {
                            user: userAfterRefreshTokenSaved,
                            accessToken,
                            refreshToken
                     }
                     ,"User logged in successfully"))
       
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error occured while logging in current user",false))
       }
}

const logoutUser = async(req,res) => {
       try {
              await User.findByIdAndUpdate(
                     req.user._id,
                     {
                            $unset:{
                                   refreshToken : 1
                            }
                     },
                     {
                            new : true
                     }
              )
              const options = {
                     httpOnly : true,
                     secure : true
              }
       
              return res.status(200)
              .clearCookie("accessToken",options)
              .clearCookie("refreshToken",options)
              .json(new ApiResponse(200,{},"User loggedout successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error occured while logging out current user",false))    
       }
}

const getCurrentUser = async(req,res) => {
       try {
              return res.status(200)
              .json(new ApiResponse(200,req.user,"Current user fetched successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error occured while getting current user",false))  
       }
}

const refreshAccessToken = async(req,res) => {
       try {
              const incomingRefreshToken = req.cookies.refreshToken
              if(!incomingRefreshToken){
                     return res.status(404).json(new ApiResponse(404,{},"Refresh token is missing",false))
              }
              const decodedToken = jwt.verify(
                     incomingRefreshToken,
                     process.env.REFRESH_TOKEN_SECRET
              )
              const user = await User.findById(decodedToken?._id)
              if(!user){
                     return res.status(404).json(new ApiResponse(404,{},"Invalid access token",false))
              }
              if(incomingRefreshToken !== user?.refreshToken){
                     return res.status(401).json(new ApiResponse(401,{},"Refresh token is expired or used"))
              }
              const options = {
                     httpOnly : true,
                     secure : true
              }
       
              const {accessToken,refreshToken : newRefreshToken} = await generateAccessAndRefreshToken(user._id)
       
              return res.status(200)
              .cookie("accessToken",accessToken,options)
              .cookie("refreshToken",newRefreshToken,options)
              .json(
                     new ApiResponse(
                            200,
                            {accessToken,refreshToken : newRefreshToken},
                            "Access token refershed"
                     )
              )
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to refresh access token",false))
       }
}

const changeCurrentPassword = async(req,res) => {
       try {
              const {oldPassword,newPassword} = req.body
       if(!oldPassword || !newPassword){
              return res.status(404).json(new ApiResponse(404,{},"Both oldpassword and new password are required",false))
       }
       const user = req?.user
       if(!user){
              return res.status(404).json(new ApiResponse(404,{},"User is missing in req.user",false))
       }
       const currentUser = await User.findById(req.user?._id)
       if(!currentUser){
              return res.status(404).json(new ApiResponse(404,{},"Couldn't find user",false))
       }
       let isPasswordCorrect = currentUser.isPasswordCorrect(oldPassword)
       if(!isPasswordCorrect){
              return res.status(401).json(new ApiResponse(401,{},"Incorrect password ",false))
       }
       currentUser.password = newPassword
       await currentUser.save({validateBeforeSave:false})

       return res.status(200).json(new ApiResponse(200,{},"Password is updated successfully",true))
       } 
       catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in changeCurrentPassword",false))
       }
}

const updateAccountDetails = async(req,res) => {
       try {
              const {username,fullName} = req?.body
              if(!username || !fullName){
                     return res.status(404).json(new ApiResponse(404,{},"Both fullName and username field is required",false))
              }
              const updatedUser = await User.findByIdAndUpdate(
                     req.user?._id,
                     {
                            $set:{
                                   fullName : fullName,
                                   username : username.toLowerCase()
                            }
                     },{
                            new : true
                     }
              ).select("-password -refreshToken")

              if(!updatedUser){
                     return res.status(500).json(new ApiResponse(500,{},"Error in updating username and password",false))
              }
              return res.status(200).json(new ApiResponse(200,updatedUser,"Updated username and fullName successfully",true))  
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in updating username and password",false))
       }
}

const updateUserCoverImage = async(req,res) => {
       try {
              const coverImageLocalPath = req.file?.path

       if(!coverImageLocalPath){
              return res.status(404).json(new ApiResponse(404,{},"localPath of coverImage is missing",false))
       }

       const previousCoverImagePublicId = req.user?.public_idOfCoverImageOnCloudinary

       const coverImageResponse = await uploadImageOnColudinary(coverImageLocalPath)
       if(!coverImageResponse){
              return res.status(500).json(new ApiResponse(500,{},"Error in uploading coverImage on cloudinary",false))
       }

       const user = await User.findByIdAndUpdate(
              req.user?._id,
              {
                     $set:{
                            public_idOfCoverImageOnCloudinary : coverImageResponse.public_id,
                            coverImage : coverImageResponse.url
                     }
              },
              {
                     new : true
              }
       ).select("-password -refreshToken")

       if(previousCoverImagePublicId){
              // await deleteFromCloudinary(previousCoverImagePublicId)
              await deleteImageFromCloudinary(previousCoverImagePublicId)
       }
       if(!user){
              return res.status(404).json(new ApiResponse(404,{},"User is not available in database",false))
       }

       return res.status(200).json(new ApiResponse(200,user,"Cover image updated successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Unable to update coverImage",false))
       }
}

const updateUserAvatar = async(req,res) => {
       try {
              const avatarLocalPath = req.file?.path
       const previousAvatarPublicId = req.user.public_idOfAvatarOnCloudinary

       if(!avatarLocalPath){
              return res.status(404).json(new ApiResponse(404,{},"Avatar local path is missing",false))
       }
       const avatarResponse = await uploadImageOnColudinary(avatarLocalPath)
       if(!avatarResponse){
              return res.status(500).json(new ApiResponse(500,{},"Error occured while uploading avatar on cloudinary",false))
       }
              //i.e. new avatarfile uploaded on cloudinary
       const user = await User.findByIdAndUpdate(
                     req.user?._id,
                     {
                            $set:{
                                   avatar : avatarResponse.url,
                                   public_idOfAvatarOnCloudinary : avatarResponse.public_id
                            }
                     },
                     {
                            new: true
                     }
              ).select("-password -refreshToken")

       // await deleteFromCloudinary(previousAvatarPublicId)
       await deleteImageFromCloudinary(previousAvatarPublicId)
       if(!user){
              return res.status(500).json(new ApiResponse(500,{},"Error in updating avatar",false))
       }
       return res.status(200)
       .json(
              new ApiResponse(200,user,"Avatar updated successfully",true)
       )

       } catch (error) {
             return res.status(500).json(new ApiResponse(500,{},"Error in updating avatar",false))
       }
}

const getUserProfile = async(req,res) => {
       try {
              const {username} = req.params
       if(!username){
              return res.status(400).json(new ApiResponse(400,{},"Username is missing in params",false))
       }
       const channel = await User.aggregate([
              {
                     $match: {
                            username : username.toLowerCase()
                     }
              },
              {
                     $lookup:{
                            from: "subscriptions",
                            localField:"channel",
                            foreignField:"_id",
                            as : "subscribers"
                     }
              },
              {
                     $lookup:{
                            from: "subscriptions",
                            localField:"subscriber",
                            foreignField:"_id",
                            as:"subscribedTo"
                     }
              },
              {
                     $addFields:{
                            subscribersCount: {
                                   $size: "$subscribers"
                            },
                            subscribedToChannelsCount: {
                                   $size : "$subscribedTo"
                            },
                            isSubscribed : {
                                   $cond: {
                                          if: {$in:[req.user?._id,"$subscribers.subscriber"]},
                                          then: true,
                                          else: false
                                   }
                            }
                     }
              },
              {
                     $project:{
                            fullName: 1,
                            username: 1,
                            email: 1,
                            subscribersCount: 1,
                            subscribedToChannelsCount: 1,
                            coverImage: 1,
                            avatar: 1,
                            isSubscribed: 1
                     }
              }
       ])

       if(!channel.length){
              return res.status(500).json(new ApiResponse(500,{},"Unable to fetch channel details",false))
       }

       return res.status(200).json(
              new ApiResponse(200,channel[0],"Channel data fetched successfully")
       )
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error happened in getUserProfile function in backend/user.controller",false))
       }
}

const isCurrentVideoLiked = async(req,res) => {
       try {
              const {videoId} = req.params
       if(!videoId){
              return res.status(404).json(new ApiResponse(404,{},"videoId is missing in paramters",false))
       }
       if(!req.user){
              return res.status(404).json(new ApiResponse(404,{},"user is missing in request",false))
       }
       const user = await User.findById(req.user?._id)
       if(!user){
             return res.status(404).json(new ApiResponse(404,{},"User is not available in database",false))
       }
       // const video = await Video.findById(videoId)
       // if(!video){
       //        return res.status(404).json(new ApiResponse(404,{},"Current video is not found",false))
       // }

       const response = await Like.findOne({
              likedBy : mongoose.Types.ObjectId(user._id),
              video : mongoose.Types.ObjectId(videoId)
       })

       if(response){
              return res.status(200).json(new ApiResponse(200,{isVideoLiked : true},"Current video is already liked by user",true))
       }
       else{
              return res.status(200).json(new ApiResponse(200,{isVideoLiked:false},"Current video is not previously liked by user",true))
       }

       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error while finding current video is already liked or not",false))
       }
}

const isCurrentTweetLiked = async(req,res) => {
       try {
              const {tweetId} = req.params
       if(!tweetId){
              return res.status(404).json(new ApiResponse(404,{},"tweetId is missing in parameters",false))
       }
       if(!req.user){
              return res.status(404).json(new ApiResponse(404,{},"user is missing in cookies",false))
       }
       const user = await User.findById(req.user?._id)
       if(!user){
              return res.status(500).json(new ApiResponse(500,{},"User doesn't exist",false))
       }

       const response = await Like.findOne({
              likedBy : mongoose.Types.ObjectId(user._id),
              tweet : mongoose.Types.ObjectId(tweetId)
       })

       if(response){
              return res.status(200).json(new ApiResponse(200,{isTweetLiked:true},"Current tweet is already liked by user",true))
       }
       else{
              return res.status(200).json(new ApiResponse(200,{isTweetLiked:false},"Current tweet is not previously liked by user",true))
       }
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error while fetching current tweet is already liked by user or not",false))
       }
}

const getAuthorDetails = async(req,res) => {
       try {
              const {userId} = req.params
              if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new ApiResponse(404,{},"Error in getting author's detail",false))
              }

              const user = await User.findById(userId)
              if(!user){
                     return res.status(404).json(new ApiResponse(404,{},"No user is available ",false))
              }
              return res.status(200).json(new ApiResponse(200,user,"User fetched successfully",true))

       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error while fetching author details",false))
       }
}

const getUserDetailsFromUsername = async(req,res) => {
       try {
              const {username} = req.params
              if(!username){
                     return res.status(404).json(new ApiResponse(404,{},"username is missing in parameter",false))
              }
              const user = await User.find({username : username})
              if(!user){
                     return res.status(404).json(new ApiResponse(404,{},"No user available",false))
              }
              return res.status(200).json(new ApiResponse(200,user,"User fetched successfully using username ",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in finding uer from username in backend",false))
       }
}

export {
       registerUser,
       loginUser,
       logoutUser,
       generateAccessAndRefreshToken,
       getCurrentUser,
       refreshAccessToken,
       changeCurrentPassword,
       updateAccountDetails,
       updateUserAvatar,
       updateUserCoverImage,
       getUserProfile,
       isCurrentTweetLiked,
       isCurrentVideoLiked,
       getAuthorDetails,
       getUserDetailsFromUsername
}