import React, { useState , useEffect} from 'react'
import {numberOfLikesOnCurrentVideo,deleteVideo,numberOfCommentsOnCurrentVideo} from '../../backendConnection/service.js'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button} from '../Helpers/index.js'
import './VideoOverview.css'

function VideoOverView({_id,title,thumbNail,owner}) {
       const currentUser = useSelector(state => state.AuthSlice.userData)
       let isAuthor = owner && currentUser && currentUser._id ? owner === currentUser._id: false

       const [likes,setLikes] = useState(0)

       const navigate = useNavigate()

       useEffect(() => {
              async function fetchLikes(videoId) {
                     try {
                            const response = await numberOfLikesOnCurrentVideo(videoId)
                            setLikes(response)
                     } catch (error) {
                            console.log("Error in fetchLikes function ")
                     }
              }
              if(_id) fetchLikes(_id)
       },[_id])

       const deleteHandler = async() => {
              try {
                     const deletedVideoInstance = await deleteVideo(_id)
                     if(deletedVideoInstance){
                            alert("Video deleted successfully")
                            navigate("/")
                     }
                     else{
                            alert("Error in deleting video")
                     }
              } catch (error) {
                     console.log("Error in deleting current video in videoOverView.jsx")
              }
       }

       const [comments,setComments] = useState(0)
       useEffect(() => {
              async function numberOfComments(videoId){
                     try {
                            const response = await numberOfCommentsOnCurrentVideo(videoId)
                            setComments(response)
                     } catch (error) {
                            console.log("Error in getting number of comments")
                     }
              }
              if(_id) numberOfComments(_id)
       },[_id])

       return (
              <div className="video-container">
                <div className="video-header">
                  <img src={thumbNail} alt="Error in loading thumbnail" className="video-thumbnail" />
                  <div className="video-title">{title}</div>
                </div>
                <div className="video-actions">
                  <button className="like-button">Total Likes: {likes}</button>
                  <button className="comment-button">Total Comments: {comments}</button>
                  {isAuthor && <button className="delete-button" onClick={deleteHandler}>Delete</button>}
                </div>
              </div>
            );
}


function previous(){
       return (
              <div style={{backgroundColor:"wheat",border:"2px solid black",margin:"30px",padding:"10px",display:"flex",flexDirection:"column"}}>
                 <div style={{display:"flex",flexDirection:"row",margin:"20px"}}>
                 <img src={thumbNail} alt='Error in loading thumbnail' width="50px"/>
                 <div className='text-2xl m-4 p-4'>{title}</div>
                 </div>
                 <div style={{display:"flex",flexDirection:"row",margin:"20px"}}>
                        <Button bgColor='green'>Total Likes : {likes}</Button>
                        <Button bgColor='brown'>Total comments : {comments}</Button>
                        {isAuthor ? <Button onClick={deleteHandler}>Delete</Button>: null}
                 </div>
              </div>
            )
}


export default VideoOverView