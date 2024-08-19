import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
       username:{
              type: String,
              required: true,
              trim: true,
              index: true,
              lowercase : true,
              unique: true,
       },
       email:{
              type: String,
              required: true,
              trim: true,
              unique: true,
              lowercase: true,
              // index: true
       },
       fullName:{
              type: String,
              required: true,
              trim: true,
              // index: true
       },
       avatar:{//Cloudinary url
              type: String,
              required: true
       },
       coverImage:{//Cloudinary url
              type: String,
              required: true
       },
       watchHistory:[
              {
                     type : Schema.Types.ObjectId,
                     ref: "Video"
              }
       ],
       password:{
              type: String,
              required: true,
       },
       refreshToken:{
              type: String
       },
       public_idOfAvatarOnCloudinary:{
              type: String
       },
       public_idOfCoverImageOnCloudinary:{
              type : String
       }
},{timestamps:true})

userSchema.pre("save",async function(next){
       if(!this.isModified("password"))
             return next()
       this.password = await bcrypt.hash(this.password,10)
       return next()
})

userSchema.methods.isPasswordCorrect = async function(password){
       return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
       return jwt.sign(
              {
                     _id : this._id,
                     username : this.username,
                     fullName : this.fullName,
                     email : this.email
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                     expiresIn : process.env.ACCESS_TOKEN_EXPIRY
              }
       )
}

userSchema.methods.generateRefreshToken = function(){
       return jwt.sign(
              {
                     _id : this._id,
              },
              process.env.REFRESH_TOKEN_SECRET,
              {
                     expiresIn : process.env.REFRESH_TOKEN_EXPIRY
              }
       )
}

const User = mongoose.model("User",userSchema)

export {User}