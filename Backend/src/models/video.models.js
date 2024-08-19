import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const videoSchema = new Schema(
       {
              videoFile:{//Cloudinary url
                     type: String,
                     required: true
              },
              thumbNail:{
                     type: String,
                     required: true
              },
              owner:{
                     type: Schema.Types.ObjectId,
                     ref: "User"
              },
              title:{
                     type: String,
                     required: true  
              },
              description:{
                     type: String,
                     required: true
              },
              duration:{//Duration will come from cloudinary
                     type: Number,
                     required: true
              },
              views:{
                     type: Number,
                     default: 0
              },
              isPublished:{
                     type: Boolean,
                     default: true
              },
              idOfVideoFileOnCloudinary: {
                     type: String,
                     required: true
              },
              idOfThumbNailOnCloudinary : {
                     type : String,
                     required : true
              }

       }
       ,
       {timestamps:true})

// videoSchema.plugin(mongooseAggregatePaginate)

const Video = mongoose.model("Video",videoSchema)

export {Video}