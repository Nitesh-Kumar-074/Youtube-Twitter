import axios from 'axios'


async function uploadVideo(formdata) {
       try{
              const uploadedVideo = await axios.post(`/youtube-tweeter/video/upload-video`,formdata,{
                     headers : {
                            'Content-Type' : 'multipart/form-data'
                     }
              })
              return uploadedVideo?.data?.data
       }
       catch(error){
              console.log("Error in uploadVideo function")
              return null
       }
}

async function deleteVideo(videoId){
       try {
              const deletedVideo = await axios.delete(`/youtube-tweeter/video/delete-video/${videoId}`)
              return deletedVideo?.data?.data
       } catch (error) {
              console.log("Error in deleteVideo function")
              return null
       }
}

async function getVideo(videoId){
       try {
              const video  = await axios.get(`/youtube-tweeter/video/get-video/${videoId}`,{
                     headers :{
                            'Content-Type' : 'application/json'
                     }
              })
              return video?.data?.data
       } catch (error) {
              console.log("Error in getVideo function")
              return null
       }
}

async function getAllVideos(){ 
       try {
              const videos = await axios.get(`/youtube-tweeter/video/get-all-videos`)
              console.log(videos?.data?.data)
              return videos?.data?.data
       } catch (error) {
              console.log("Error in get all videos")
              return null
       }
}

async function getAllVideosOfParticularUser(userId){
       try {
              const videos = await axios.get(`/youtube-tweeter/video/get-all-videos-of-a-particular-user/${userId}`)
              return videos?.data?.data
       } catch (error) {
              console.log("Error in getting all videos of a particular user")
              return null
       }
}

async function uploadTweet(formdata){
       try {
              const tweet = await axios.post("/youtube-tweeter/tweet/create-tweet",formdata,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return tweet?.data?.data
       } catch (error) {
              console.log("Error in upload tweet function")
              return null
       }
}

async function deleteTweet(tweetId){
       try {
              const deletedTweet = await axios.delete(`/youtube-tweeter/tweet/delete-tweet/${tweetId}`)
              return deletedTweet?.data?.data
       } catch (error) {
              console.log("Error in delete tweet function")
              return null
       }
}

async function updateTweet(tweetId,formdata){
       try {
            const updatedTweet = await axios.patch(`/youtube-tweeter/tweet/update-tweet/${tweetId}`,formdata,{
              headers : {
                     'Content-Type' : 'application/json'
              }
            })  
            return updatedTweet?.data?.data
       } catch (error) {
              console.log("Error in update tweet function")
              return null
       }
}

async function getAllTweets() {
       try {
              const tweets = await axios.get(`/youtube-tweeter/tweet/get-all-tweets`)
              return tweets?.data?.data
       } catch (error) {
              console.log("Error in getAllTweets function")
              return null
       }
}

async function getAllTweetsOfParticularUser(userId) {
       try {
              const response = await axios.get(`/youtube-tweeter/tweet/get-all-tweets-of-particular-user/${userId}`)
              return response?.data?.data
       } catch (error) {
              console.log("Error in fetching all tweets of a particular user")
              return null
       }
}

async function subscribeChannel(username){
       try {
              const channelSubscriptionEntity = await axios.post(`/youtube-tweeter/subscription/subscribe-channel/${username}`)
              return channelSubscriptionEntity?.data?.data
       } catch (error) {
              console.log("Error in subscribe channel")
              return null
       }
}

async function unsubscribeChannel(username){
       try {
              const unSubscriptionChannelEntity = await axios.delete(`/youtube-tweeter/subscription/unsubscribe-channel/${username}`)
              return unSubscriptionChannelEntity?.data?.data
       } catch (error) {
              console.log("Error in unsubscribe channel")
              return null
       }
}

async function isCurrentChannelSubscribed(channelId){
       try {
              const flag =  await axios.get(`/youtube-tweeter/subscription/is-current-channel-subscribed/${channelId}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return flag?.data?.data
       } catch (error) {
              console.log("Error in fetching whether current channel is subscribed or not")
              return null
       }
}

async function numberOfSubscribers(userId) {
       try {
              const response = await axios.get(`/youtube-tweeter/subscription/number-of-subscriber/${userId}`)
              return response?.data?.data
       } catch (error) {
              console.log("Error in getting number of subscribers function")
              return null
       }
}


async function numberOfSubscription(userId){
       try {
              const response = await axios.get(`/youtube-tweeter/subscription/number-of-subscription/${userId}`)
              return response?.data?.data
       } catch (error) {
              console.log("Error in getting number of subscriptions function")
              return null
       }
}

async function likeVideo(videoId){
       try {
              const likeVideoInstance = await axios.post(`/youtube-tweeter/like/like-video/${videoId}`)
              return likeVideoInstance?.data?.data
       } catch (error) {
              console.log("Error in like video function")
              return null
       }
}

async function likeTweet(tweetId) {
       try {
              const likeTweetInstance =  await axios.post(`/youtube-tweeter/like/like-tweet/${tweetId}`)
              return likeTweetInstance?.data?.data
       } catch (error) {
              console.log("Error in like tweet function")
              return null
       }
}

async function dislikeVideo(videoId){
       try {
            const unlikeVideoInstance =  await axios.delete(`/youtube-tweeter/like/dislike-video/${videoId}`)  
            return unlikeVideoInstance?.data?.data
       } catch (error) {
              console.log("Error in dislike video function")
              return null
       }
}

async function dislikeTweet(tweetId){
       try {
              const unlikeTweetInstance =  await axios.delete(`/youtube-tweeter/like/dislike-tweet/${tweetId}`)
              return unlikeTweetInstance?.data?.data
       } catch (error) {
              console.log("Error in dislike tweet function")
              return null
       }
}

async function isCurrentTweetLiked(tweetId){
       try {
             const likeInstance = await axios.get(`/youtube-tweeter/like/is-tweet-liked/${tweetId}`,{
              headers : {
                     'Content-Type' : 'application/json'
              }
             }) 
             return likeInstance?.data?.data
       } catch (error) {
              console.log("Error in isCurrent tweet liked function")
              return null      
       }
}

async function isCurrentVideoLiked(videoId) {
       try {
              const likeInstance = await axios.get(`/youtube-tweeter/like/is-video-liked/${videoId}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
                    }) 
              return likeInstance?.data?.data
       } catch (error) {
              console.log("Error in isCurrent video liked function")
              return null 
       } 
}

async function getAuthorDetails(idOfUser){
       try {
              const user = await axios.get(`/youtube-tweeter/user/author-details/${idOfUser}`,{
                     headers: {
                            'Content-Type' : 'application/json'
                     }
              })
              return user?.data?.data
       } catch (error) {
              console.log("Error in getAuthor details function")
              return null
       }
}

async function addComment(videoId,formdata){
       try {
              const addComment = await axios.post(`/youtube-tweeter/comment/add-comment/${videoId}`,formdata,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return addComment?.data?.data
       } catch (error) {
              console.log("Error in addComment function")
              return null
       }
}

async function deleteComment(commentId){
       try {
              const deleteCommentInstance =  await axios.delete(`/youtube-tweeter/comment/delete-comment/${commentId}`)
              return deleteCommentInstance?.data?.data
       } catch (error) {
              console.log("Error in deleteComment function")
              return null
       }
}

async function readComments(videoId){
       try {
              const allComments = await axios.get(`/youtube-tweeter/comment/read-comments/${videoId}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return allComments?.data?.data
       } catch (error) {
              console.log("Error in readComments function")
              return null
       }
}

async function numberOfCommentsOnCurrentVideo(videoId){
       try {
              const numberOfComments = await axios.get(`/youtube-tweeter/comment/count-comments/${videoId}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return numberOfComments?.data?.data
       } catch (error) {
              console.log("Error in numberOfComments on current video")
       }
}

async function numberOfLikesOnCurrentTweet(tweetId){
       try {
              const numberOfLikes = await axios.get(`/youtube-tweeter/like/likes-on-tweet/${tweetId}`,{
                     headers : {
                            'Content-Type' : 'application/json'
                     }
              })
              return numberOfLikes?.data?.data
       } catch (error) {
              console.log("Error in numberOfLikesOnCurrentTweet function")
              return null
       }
}

async function numberOfLikesOnCurrentVideo(videoId){
       try {
              const numberOfLikes = await axios.get(`/youtube-tweeter/like/likes-on-video/${videoId}`,{
                     headers :{
                            'Content-Type' : 'application/json'
                     }
              })
              return numberOfLikes?.data?.data
       } catch (error) {
              console.log("Error in numberOfLikesOnCurrentVideo function")
              return null
       }
}
 


export {
       uploadVideo,
       deleteVideo,
       getVideo,
       getAllVideos,
       getAllVideosOfParticularUser,
       uploadTweet,
       deleteTweet,
       updateTweet,
       getAllTweets, 
       getAllTweetsOfParticularUser,
       subscribeChannel,
       unsubscribeChannel,
       isCurrentChannelSubscribed,
       numberOfSubscribers,
       numberOfSubscription,
       likeVideo,
       likeTweet,
       dislikeVideo,
       dislikeTweet,
       isCurrentTweetLiked,
       isCurrentVideoLiked,
       addComment,
       deleteComment,
       readComments,
       numberOfCommentsOnCurrentVideo,
       numberOfLikesOnCurrentTweet,
       numberOfLikesOnCurrentVideo,
       getAuthorDetails
}