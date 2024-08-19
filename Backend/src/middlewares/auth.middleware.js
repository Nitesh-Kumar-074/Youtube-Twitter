import jwt from 'jsonwebtoken'
import {User} from '../models/user.models.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const verifyJWT = async(req,res,next) => {
       try {
              const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
              if(!token){
                     return res.status(400).json(new ApiResponse(400,{},"Token is missing in req in middleware"))
              }
              const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

              const user = await User.findById(decodedToken._id).select("-password -refreshToken")
              if(!user){
                     return res.status(403).json(new ApiResponse("Invalid access token"))
              }
              req.user = user
              next()
       } catch (error) {
              throw new ApiError(403,error?.message || "Invalid access token")
       }
}

export {verifyJWT}