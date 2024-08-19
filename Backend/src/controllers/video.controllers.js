import {uploadImageOnColudinary,uploadVideoOnCloudinary,deleteImageFromCloudinary,deleteVideoFromCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {Video} from '../models/video.models.js'
import mongoose from 'mongoose'

const uploadVideo = async(req,res) => {
       try {
              const {title,description,isPublished} = req.body 
              if(!title || !description){
                     return res.status(400).json(new ApiResponse(404,{},"Both title and description is required",false))
              }


              let videoFileLocalPath = null;
              if(req.files && req.files.videoFile && Array.isArray(req.files.videoFile) && req.files.videoFile.length > 0){
                     videoFileLocalPath = req.files.videoFile[0].path
              }
              if(!videoFileLocalPath){
                     return res.status(404).json(new ApiResponse(404,{},"Video file is missing",false));
              }
              const videoFileResponse = await uploadVideoOnCloudinary(videoFileLocalPath)
              if(!videoFileResponse){
                     return res.status(500).json(new ApiResponse(500,{},"Error occured in uploading video on cloudinary",false))
              }


              let thumbNailLocalPath = null;
              if(req.files && req.files.thumbNail && Array.isArray(req.files.thumbNail) && req.files.thumbNail.length > 0){
                     thumbNailLocalPath = req.files.thumbNail[0].path
              }
              if(!thumbNailLocalPath){
                     return res.status(404).json(new ApiResponse(404,{},"Thumbnail is missing",false));
              }
              const thumbNailResponse = await uploadImageOnColudinary(thumbNailLocalPath)
              if(!thumbNailResponse){
                     return res.status(500).json(new ApiResponse(500,{},"Error occured in uploading thumbnail on cloudinary",false))
              }

              const idOfVideoFileOnCloudinary = videoFileResponse.public_id

              const idOfThumbNailOnCloudinary = thumbNailResponse.public_id

              const duration = videoFileResponse.duration

              const video = await Video.create({
                     videoFile : videoFileResponse.url,
                     thumbNail : thumbNailResponse.url,
                     owner : req.user?._id,
                     description,
                     title,
                     isPublished,
                     idOfThumbNailOnCloudinary,
                     idOfVideoFileOnCloudinary,
                     duration
              })

              if(!video){
                     return res.status(500).json(new ApiResponse(500,{},"Error while uploading video on cloudinary",false))
              }

              return res.status(201).json(new ApiResponse(201,video,"Video entry created in database",true))


       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Wrong in uploadVideo in video.controller ",false))
       }
}

const deleteVideo = async(req,res) => {
       try {
              const {videoId} = req.params
              if(!videoId){
                     return res.status(404).json(new ApiResponse(404,{},"Video Id is required",false))
              }
              const video = await Video.findByIdAndDelete(videoId)
              if(!video){
                     return res.status(500).json(new ApiResponse(500,{},"Error in backend in deleting video",false))
              }
              await deleteVideoFromCloudinary(video.idOfVideoFileOnCloudinary)
              await deleteImageFromCloudinary(video.idOfThumbnailOnCloudinary)
              return res.status(200).json(new ApiResponse(200,video,"Video entry deleted from database",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Wrong in deleteVideo in video.controller ",false))
       }
}

const getAllVideos = async(req,res) => {
       try {
              const videos = await Video.find({isPublished:true})
              return res.status(200).json(new ApiResponse(200,videos,"All published videos fetched successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in getting all videos"))
       }
}

// const getVideo = async(req,res) => {
//        const {videoId} = req.params;
//        try {
//               if(!videoId){
//                      return res.status(404).json(new ApiResponse(404,{},"videoId is missing in body",false))
//               }
//               if (!mongoose.Types.ObjectId.isValid(videoId)) {
//                      return res.status(400).json(new ApiResponse(400, {}, "Invalid videoId format", false));
//                  }
//               console.log("Video Id in getVideo background",videoId)
//               // const currentVideo = await Video.findById(videoId).exec()
//               let currentVideo;
//         try {
//             currentVideo = await Video.findById(videoId).exec();
//         } catch (queryError) {
//             console.error("Error during query execution:", queryError);
//             return res.status(500).json(new ApiResponse(500, {}, "Error querying the database", false));
//         }

//               if(!currentVideo){
//                      return res.status(404).json(new ApiResponse(404,{},"Video not found with requested id",false))
//               }
//               return res.status(200).json(new ApiResponse(200,currentVideo,"Current video fetched successfully",true))
//        } catch (error) {
//               console.log("Error in getVideo function",error)
//               return res.status(500).json(new ApiResponse(500,videoId,"Error in getting current video",false))
//        }
// }

const getVideo = async (req, res) => {
       const { videoId } = req.params;
       
       try {
           if (!videoId) {
               return res.status(404).json(new ApiResponse(404, {}, "videoId is missing in body", false));
           }
           
           if (!mongoose.Types.ObjectId.isValid(videoId)) {
               return res.status(400).json(new ApiResponse(400, {}, "Invalid videoId format", false));
           }
   
           console.log("Video Id in getVideo background", videoId);
   
           let currentVideo;
           try {
               currentVideo = await Video.findById(videoId).exec();
           } catch (queryError) {
               console.error("Error during query execution:", queryError);
               return res.status(500).json(new ApiResponse(500, {}, "Error querying the database", false));
           }
   
           if (!currentVideo) {
               return res.status(404).json(new ApiResponse(404, {}, "Video not found with requested id", false));
           }
   
           return res.status(200).json(new ApiResponse(200, currentVideo, "Current video fetched successfully", true));
       } catch (error) {
           console.log("Error in getVideo function:", error);
           return res.status(500).json(new ApiResponse(500, videoId, "Error in getting current video", false));
       }
   };
   
const getAllVideosOfParticularUser = async(req,res) => {
       try {
              const {userId} = req.params
              if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new ApiResponse(404,{},"userId is missing in parameters",false))
              }
              const response = await Video.find({owner: userId})
              return res.status(200).json(new ApiResponse(200,response,"User's video fetched successfully",true))
       } catch (error) {
              console.log("Error in getting all videos of a particular user")
              return null 
       }
}

export {
       uploadVideo,
       deleteVideo,
       getAllVideos,
       getVideo,
       getAllVideosOfParticularUser
}