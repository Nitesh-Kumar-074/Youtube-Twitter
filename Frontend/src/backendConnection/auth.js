import axios from 'axios'

async function  registerUser(formdata){
       try {
              const userAccount = await axios.post("/youtube-tweeter/user/register-user",formdata,{
                     headers : {
                            'Content-Type' : 'multipart/form-data'
                     }
              })
              if(userAccount){
                     return await loginUser(formdata)
              }
       } catch (error) {
              console.log("Error in registerUser function ")
              return null
       }
}

 async function loginUser(formdata){
       try {
              const loggedInUser  = await axios.post("/youtube-tweeter/user/login",formdata,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return loggedInUser?.data?.data
       } catch (error) {
              console.log("Error in loginUser function ")
              return null
       }
}

async function logoutUser() {
       try {
              const loggedOutUser = await axios.post("/youtube-tweeter/user/logout")
              return loggedOutUser?.data?.data
       } catch (error) {
              console.log("Error in logoutUser function ")
              return null
       }
}

async function getCurrentUser(){
       try {
              const currentUser =  await axios.get("/youtube-tweeter/user/current-user",{
                     withCredentials : true
              })
              return currentUser?.data?.data
       } catch (error) {
              console.log("Error in getCurrentUser function ")
              return null
       }
}

async function refreshToken(){
       try {
             const token = await axios.post("/videoTube/users/refresh-token")
             return token?.data?.data
       } catch (error) {
             console.log("Error in refreshToken function")
             return null
       }
}

 async function updateAccountDetails(formdata){
       try {
            const updatedAccountDetails =  await axios.patch("/youtube-tweeter/user/update-account",formdata,{
              headers :{ 
                     'Content-Type' : 'application/json'
              }
            }) 
            return updatedAccountDetails?.data?.data 
       } catch (error) {
              console.log("Error in update account function")
              return null
       }
 }

 async function updateAvatar(formdata){
       try {
              const updatedAvatar = await axios.patch("/youtube-tweeter/user/avatar",formdata,{
                     headers:{
                            'Content-Type' : 'multipart/form-data'
                     }
              })
              return updatedAvatar?.data?.data
       } catch (error) {
              console.log("Error in update Avatar function")
              return null
       }
 }

 async function updateCoverImage(formdata) {
       try {
              const updatedCoverImage = await axios.patch("/youtube-tweeter/user/cover-image",formdata,{
                     headers : {
                            'Content-Type' : 'multipart/form-data'
                     }
              })
              return updatedCoverImage?.data?.data
       } catch (error) {
              console.log("Error in update cover image function")
              return null
       }
 }

 async function getUserProfile(username){
       try {
            const user = await axios.get(`/youtube-tweeter/user/c/get-user-profile/${username}`)  
            return user?.data?.data
       } catch (error) {
              console.log("Error in getUserProfile function")
              return null
       }
}

async function getUserDetailsFromUsername(username){
       try {
              const user = await axios.get(`/youtube-tweeter/user/get-user-from-username/${username}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return user?.data?.data
       } catch (error) {
              console.log("Error in getUserDetailsFromUsername function ")
       }
}



export {
       registerUser,
       loginUser,
       logoutUser,
       getCurrentUser,
       refreshToken,
       updateAccountDetails,
       updateAvatar,
       updateCoverImage,
       getUserProfile,
       getUserDetailsFromUsername
}