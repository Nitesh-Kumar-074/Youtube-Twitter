import React,{useState,useEffect} from 'react'
import {numberOfLikesOnCurrentTweet,deleteTweet} from '../../backendConnection/service.js'
import {Button} from '../Helpers/index.js'
import {useSelector} from 'react-redux'
import './TweetOverview.css'

function TweetOverview({_id,owner,content}) {
       const [likes,setLikes] = useState(0)
       const currentUser = useSelector(state => state.AuthSlice.userData)
       let isAuthor = currentUser && owner && currentUser._id ? owner === currentUser._id : null
       useEffect(() => {
              async function fetchLikes(tweetId) {
                     try {
                          const response = await numberOfLikesOnCurrentTweet(tweetId)
                          setLikes(response)  
                     } catch (error) {
                            console.log("Error in fetching likes")
                     }
              }
              if(_id) fetchLikes(_id)
       },[_id])

       const deleteHandler = async() => {
              try {
                     const deletedTweetInstance = await deleteTweet(_id)
                     if(deletedTweetInstance){
                            alert("Your tweet has been deleted")
                     }
                     else{
                            alert("Can't delete this tweet")
                     }
              } catch (error) {
                     console.log("Error in deleting tweet")
              }
       }
       return (
              <div className="tweet-container">
                <div className="tweet-content">{content}</div>
                <div className="tweet-actions">
                  <button className="like-button">Total likes: {likes}</button>
                  {isAuthor && <button className="delete-button" onClick={deleteHandler}>Delete</button>}
                </div>
              </div>
            );
}

export default TweetOverview