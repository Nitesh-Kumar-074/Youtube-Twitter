import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getAllTweetsOfParticularUser,getAllVideosOfParticularUser,isCurrentChannelSubscribed,subscribeChannel,unsubscribeChannel,numberOfSubscribers,numberOfSubscription} from '../../backendConnection/service.js'
import {getUserDetailsFromUsername} from '../../backendConnection/auth.js'
import {VideoOverView} from '../Video/index.js'
import {TweetOverview} from '../Tweet/index.js'
import {useSelector} from 'react-redux'
import {Button} from '../Helpers/index.js'
import './ChannelPage.css'

function ChannelPage() {
       const {username} = useParams()
       const [userExists,setUserExists] = useState(false)
       const [user,setUser] = useState({})
       const currentUser = useSelector(state => state.AuthSlice.userData)

       useEffect(() => {
        async function fetchUser(){
          try {
            const response = await getUserDetailsFromUsername(username)
            if(response){
              setUserExists(true)
              setUser(response[0])
              // console.log("user in ChannelPage",response)
            }
            else{
              setUserExists(false)
              setUser(null)
            }
          } catch (error) {
            console.log("Error in getuser from username function")
            setUserExists(false)
          }
        }
        fetchUser()
       },[username])

       const [tweets,setTweets] = useState([])
       useEffect(() => {
        async function fetchTweets(userId){
          try {
            const response = await getAllTweetsOfParticularUser(userId)
            setTweets(response)
           } catch (error) {
            console.log("Error in fetching all tweets of user in ChannelPage component")
          }
        }
        if(user?._id)  fetchTweets(user._id)
       },[user._id])


       const [videos,setVideos] = useState([])
       useEffect(() => {
        async function fetchVideos(userId){
          try {
            const response = await getAllVideosOfParticularUser(userId)
            setVideos(response)
          } catch (error) {
            console.log("Error in fetching all videos of user in ChannelPage component")
          }
        }
        if(user?._id) fetchVideos(user._id)
       },[user._id])

       const [subscribed,setSubscribed] = useState(false)

       useEffect(() => {
        async function isAlreadySubscribed(channelId){
          try {
            const response = await isCurrentChannelSubscribed(channelId)
            if(response){
              setSubscribed(true) 
            }
            else{
              setSubscribed(false)
            }
          } catch (error) {
            console.log("Error in isAlready Subscribed function in ChannelPage")
          }
        }
        if(user._id) isAlreadySubscribed(user._id)
       },[user._id])

       const [subscribers,setSubscribers] = useState(0)
       const [subscriptions, setSubscriptions] = useState(0)

       //fetch sunbscribers

       useEffect(() => {
        async function fetchSubscribers(userId){
          try {
            const response = await numberOfSubscribers(userId)
            setSubscribers(response)
          } catch (error) {
            console.log("Error in fetching number of subscribers")
          }
        }
        if(user?._id) fetchSubscribers(user._id)
       },[username])

       //fetch subscriptions

       useEffect(() => {
        async function fetchSubscriptions(userId){
          try {
            const response = await numberOfSubscription(userId)
            setSubscriptions(response)
          } catch (error) {
            console.log("Error in fetching number of subscriptions")
          }
        }
        if(user?._id) fetchSubscriptions(user?._id)
       },[username])

       const CurrentUserIsWatchingOwnProfile = currentUser._id === user._id

       const subscribe = async() => {
        try {
          const response = await subscribeChannel(username)
          if(response){
            setSubscribed(true)
            setSubscribers(prev => prev+1)
          }
          else{
            alert("Error in subscribing the channel")
          }
        } catch (error) {
          console.log("Error in subscribing channel")
        }
       }

       const unsubscribe = async() => {
        try {
          const response = await unsubscribeChannel(username)
          if(username){
            setSubscribed(false)
            setSubscribers(prev => prev-1)
          }
          else("Error in unsubscribing the channel")
        } catch (error) {
          console.log("Error in unsubscribing channel")
        }
       }

       return (
        userExists ? (
          <div className="channel-page">
            <div className="avatar-cover-container">
              <img 
                src={user.avatar} 
                alt="User's avatar" 
                className="avatar"
              />
              {user.coverImage && (
                <img 
                  src={user.coverImage} 
                  alt="User's cover image" 
                  className="cover-image"
                />
              )}
            </div>
            <div className="subscription-buttons">
              {CurrentUserIsWatchingOwnProfile ? null : (
                subscribed ? (
                  <Button onClick={unsubscribe} className="unsubscribe-button">
                    Unsubscribe
                  </Button>
                ) : (
                  <Button onClick={subscribe} className="subscribe-button">
                    Subscribe
                  </Button>
                )
              )}
            </div>
            <div className="stats">
              <Button className="stat-button">
                Subscribers: {subscribers}
              </Button>
              <Button className="stat-button">
                Subscriptions: {subscriptions}
              </Button>
            </div>
            <div>
              {videos ? (
                <div>
                  <div className="section-header">
                    Videos posted by user:
                  </div>
                  {videos.map((video) => (
                    <div key={video._id} className="video-container">
                      <VideoOverView {...video} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="section-header">
                  User hasn't posted any videos
                </div>
              )}
            </div>
            <div>
              {tweets ? (
                <div>
                  <div className="section-header">
                    Tweets posted by user:
                  </div>
                  {tweets.map((tweet) => (
                    <div key={tweet._id} className="tweet-container">
                      <TweetOverview {...tweet} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="section-header">
                  User hasn't posted any tweets
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="error-message">
            User does not exist
          </div>
        )
      );
    }
  

export default ChannelPage