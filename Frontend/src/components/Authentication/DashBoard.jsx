import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getAllVideosOfParticularUser,getAllTweetsOfParticularUser,numberOfSubscribers,numberOfSubscription} from '../../backendConnection/service.js'
import {VideoOverView} from '../Video/index.js'
import {TweetOverview} from '../Tweet/index.js'
import {Button} from '../Helpers/index.js'
import './DashBoard.css'
function DashBoard() {
       const currentUser = useSelector(state => state.AuthSlice.userData)


       const [subscribers,setSubscribers] = useState(0)
       const [subscriptions,setSubscriptions] = useState(0)

       useEffect(() => {
        async function fetchSubscribers(userId){
          try {
            const response = await numberOfSubscribers(userId)
            setSubscribers(response)
          } catch (error) {
            console.log("Error in fetching number of subscribers ")
          }
        }
        if(currentUser?._id) fetchSubscribers(currentUser?._id)
       },[currentUser?._id])


       useEffect(() => {
        async function fetchSubscriptions(userId){
          try {
            const response = await numberOfSubscription(userId)
            setSubscriptions(response)
          } catch (error) {
            console.log("Error in fetching number of subscriptions")
          }
         }
         if(currentUser?._id) fetchSubscriptions(currentUser?._id)
       },[currentUser?._id])

       

       const [videos,setVideos] = useState([])
       useEffect(() => {
        async function fetchAllVideosOfUser(userId) {
          try {
            const response = await getAllVideosOfParticularUser(userId)
            setVideos(response)
          } catch (error) {
            console.log("Error in fetching admin's all video in Dashboard component")
          }
        }
        if(currentUser._id) fetchAllVideosOfUser(currentUser._id)
       },[currentUser])

       const [tweets,setTweets] = useState([])
       useEffect(() => {
        async function fetchAllTweetsOfUser(userId) {
          try {
            const response = await getAllTweetsOfParticularUser(userId)
            setTweets(response)
          } catch (error) {
            console.log("Error in fetching admin's all tweet in Dashboard component")
          }
        }
        if(currentUser._id) fetchAllTweetsOfUser(currentUser._id)
       },[currentUser])

       return (
        <div className="dashboard-container">
          <div className="user-header">
            <img src={currentUser.coverImage} alt="Cover" className="cover-image" />
            <div className="user-info">
              <div className="avatar-container">
                <img src={currentUser.avatar} alt="Avatar" className="user-avatar" />
              </div>
              <div className="user-details">
                <div className="user-username">Username: {currentUser.username}</div>
                <div className="user-fullname">Fullname: {currentUser.fullName}</div>
              </div>
            </div>
          </div>
          <div className="stats-container">
            <button className="stats-button green">Subscribers: {subscribers}</button>
            <button className="stats-button blue">Subscriptions: {subscriptions}</button>
          </div>
          <div className="section-header">Posted Videos:</div>
          <div className="content-container">
            {videos?.map((video) => (
              <VideoOverView key={video._id} {...video} />
            ))}
          </div>
          <div className="section-header">Posted Tweets:</div>
          <div className="content-container">
            {tweets?.map((tweet) => (
              <TweetOverview key={tweet._id} {...tweet} />
            ))}
          </div>
        </div>
      );
}


function helper(){
  return (
    <div>
      <div className='text-xl text-white bg-pink-500 m-2 p-2 rounded-lg'> Username :- {currentUser.username }</div>
      <div className='text-xl text-white bg-pink-500 m-2 p-2 rounded-lg'> Fullname :- {currentUser.fullName }</div>
      <div style={{display:"flex",flexDirection:"row"}}>
        <Button bgColor='green'>Subscribers : {subscribers}</Button>
        <Button bgColor='blue' >Subscriptions : {subscriptions}</Button>
      </div>
      <div className='text-2xl text-white bg-purple-500 m-4 p-4 rounded-lg' >Posted videos :- </div>
      {
        videos?.map((video) => (
          <div key={video._id}>
            <VideoOverView {...video}/>
          </div>
        ))
      }
      <div className='text-2xl text-white bg-purple-500 m-4 p-4 rounded-lg' >Posted tweets :- </div>
      {
        tweets?.map((tweet) => (
          <div key={tweet._id}>
            <TweetOverview {...tweet}/>
          </div>
        ))
      }
    </div>
    
  )
}

export default DashBoard