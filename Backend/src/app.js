import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({ 
       origin : process.env.CORS_ORIGIN,
       credentials : true
})) 
app.use(express.json()) // what about limit 
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public/temp"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
app.use("/youtube-tweeter/user",userRouter) 

import tweetRouter from './routes/tweet.routes.js'
app.use("/youtube-tweeter/tweet",tweetRouter)

import commentRouter from './routes/comment.routes.js'
app.use('/youtube-tweeter/comment',commentRouter)

import videoRouter from './routes/video.routes.js'
app.use('/youtube-tweeter/video',videoRouter)

import likeRouter from './routes/like.routes.js'
app.use('/youtube-tweeter/like',likeRouter)

import subscriptionRouter from './routes/subscription.routes.js'
app.use('/youtube-tweeter/subscription',subscriptionRouter)

app.get("/",(req,res) => {
       res.status(200).json("Server to chal raha hai")
})


export {app}