import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
       cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
       api_key : process.env.CLOUDINARY_API_KEY,
       api_secret : process.env.CLOUDINARY_API_SECRET
})
 
const uploadImageOnColudinary = async(localFilePath) => {
       try {
              if(!localFilePath){
                     return null;
              }
              const response = await cloudinary.uploader.upload(localFilePath,{resource_type : "image"})
              fs.unlinkSync(localFilePath)
              return response
       } catch (error) {
              fs.unlinkSync(localFilePath)
              return null
       }
}

const uploadVideoOnCloudinary = async(localFilePath) => {
       try {
              if(!localFilePath){
                     return null;
              }
              const response = await cloudinary.uploader.upload(localFilePath,{resource_type : "video"})
              fs.unlinkSync(localFilePath)
              return response
       } catch (error) {
              fs.unlinkSync(localFilePath)
              return null 
       }
}

const deleteImageFromCloudinary = async(fileId) => {
       try {
              if(!fileId) return null
              const result = await cloudinary.uploader.destroy(fileId,{resource_type: "image"})
              return result
       } catch (error) {
              console.log(error)
              return null
       }
}

const deleteVideoFromCloudinary = async(fileId) => {
       try {
              if(!fileId) return null
              const result = await cloudinary.uploader.destroy(fileId,{resource_type: "video"})
              return result
       } catch (error) {
              console.log(error)
              return null
       }
}

export {uploadImageOnColudinary,uploadVideoOnCloudinary,deleteImageFromCloudinary,deleteVideoFromCloudinary}