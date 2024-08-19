import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

import {app} from './app.js'
import {connectDB} from './db/index.js'

const port = process.env.PORT || 7007

connectDB().then(() => {
       app.listen(port,() => {
              console.log("MONGODB connected ")
              console.log("App is listening on port ",port)
       })
})
.catch((error) => {
       console.log("An error occured while connecting with mongodb")
})