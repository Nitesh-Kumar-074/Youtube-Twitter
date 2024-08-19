import mongoose from 'mongoose'
import {Subscription} from '../models/subscription.models.js'
import {User} from '../models/user.models.js'
import {ApiResponse} from '../utils/ApiResponse.js'
 
const subscribeChannel = async(req,res) =>{
       try {
             const userId = req.user?._id
             if(!userId){
              return res.status(400).json(new ApiResponse(400,{},"No user is present in req",false))
             } 
             const {username} = req.params
             if(!username){
              return res.status(400).json(new ApiResponse(400,{},"Username is missing in req.params ",false))
             }

             const channel = await User.findOne({username})
             if(!channel){
              return res.status(404).json(new ApiResponse(404,{},"Channel not found",false))
             }
             const subscriptionEntity = await Subscription.create({
              subscriber : userId,
              channel : channel._id
             })
             if(!subscriptionEntity){
              return res.status(500).json(new ApiResponse(500,{},"Unable to subscribe current channel",false))
             }
             return res.status(200).json(new ApiResponse(500,subscriptionEntity,"Channel subscribed successfully",true))

       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Couldn't subscribe the current channel",false))
       }
}

const unSubscribeChannel = async(req,res) => {
       try {
              const userId = req.user?._id
              if(!userId){
               return res.status(400).json(new ApiResponse(400,{},"No user is present in req",false))
              } 
              const {username} = req.params
              if(!username){
               return res.status(400).json(new ApiResponse(400,{},"Username is missing in req.params ",false))
              }
 
              const channel = await User.findOne({username})
              if(!channel){
               return res.status(404).json(new ApiResponse(404,{},"Channel not found",false))
              }

              const unsubscribeEntity = await Subscription.findOneAndDelete({
                     subscriber : mongoose.Types.ObjectId(userId),
                     channel : mongoose.Types.ObjectId(channel._id)
              })
              if(!unsubscribeEntity){
                     return res.status(500).json(new ApiResponse(500,{},"Couldn't unsubscribe the current channel",false))
              }

              return res.status(200).json(new ApiResponse(200,unsubscribeEntity,"Channel unsubscribed successfully",true))
             
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Couldn't unsubscribe the current channel",false))
       }
}



const isCurrentChannelSubscribed = async(req,res) => {
       try {
              const {channelId} = req.params
              if(!channelId || !mongoose.Types.ObjectId.isValid(channelId)){
                     return res.status(404).json(new ApiResponse(404,{},"channelId is missing in parameter",false))
              }
              const userId = req.user?._id
              if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new ApiResponse(404,{},"userId is missing in cookies",false))
              }
              const subscriptionEntity = await Subscription.findOne({
                     $and:[{subscriber : userId},{channel : channelId}]
              })
              if(!subscriptionEntity){
                     return res.status(200).json(new ApiResponse(200,false,"Current channel is not subscribed",true))
              }
              return res.status(200).json(new ApiResponse(200,subscriptionEntity,"Current channel is already subscribed",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Error in fetching whether channel is subscribed or not",false))
       }

}

const subscriberCount = async(req,res) => {
       try {
              const {userId} = req.params
              if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new ApiResponse(404,{},"userId is missing in parameter",false))
              }
              const response = await Subscription.countDocuments({channel : userId})
              return res.status(200).json(new ApiResponse(200,response,"Number of subscribers fetched send successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Cannot send number of subscribers",false))
       }
}

const subscriptionCount = async(req,res) => {
       try {
              const {userId} = req.params
              if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
                     return res.status(404).json(new ApiResponse(404,{},"userId is missing in parameter",false))
              }  
              const response = await Subscription.countDocuments({subscriber : userId})
              return res.status(200).json(new ApiResponse(200,response,"Number of subscriptions fetched send successfully",true))
       } catch (error) {
              return res.status(500).json(new ApiResponse(500,{},"Cannot send number of subscriptions",false))
       }
}


export {
       subscribeChannel,
       unSubscribeChannel,
       isCurrentChannelSubscribed,
       subscriberCount,
       subscriptionCount
}