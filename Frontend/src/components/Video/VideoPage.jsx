import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {getVideo,deleteVideo,likeVideo,dislikeVideo,isCurrentVideoLiked,numberOfLikesOnCurrentVideo,
       getAuthorDetails,readComments} from '../../backendConnection/service.js'
import { useSelector } from 'react-redux'
import {Button} from '../Helpers/index.js'
import PostComment from '../Comments/PostComment.jsx'
import CommentCard from '../Comments/CommentCard.jsx'
import './VideoPage.css';

function VideoPage() {
       const [post,setPost] = useState(null)
       const navigate = useNavigate()
       const {videoId} = useParams()
       const userData = useSelector(state => state.AuthSlice.userData)

       useEffect(() => {
              async function hello(videoId) {
                     const video = await getVideo(videoId)
                     setPost(video)
              }
              if(videoId)
              hello(videoId)
       },[videoId]) 

       const author = userData && post ?  userData._id === post.owner : false

       const deleteHandler = async() =>{
              try {
                     const deletedVideo = await deleteVideo(videoId)
                     if(deletedVideo){
                            alert("Video deleted successfully")
                            navigate("/")
                     }
                     else{
                            alert("Unable to delte tweet")
                            navigate("/")
                     }
              } catch (error) {
                     console.log("Error in delete video function")
              }
       }

       const [likes,setLikes] = useState(0)

       useEffect(() => {
              async function fetchLikes(){
                     try {
                            const response = await numberOfLikesOnCurrentVideo(videoId)
                            setLikes(response)
                            // console.log(response)
                     } catch (error) {
                            alert("Error in getting number of likes of current video")
                     }
              }
              if(videoId) fetchLikes();
       
       },[videoId])

       const [flag,setFlag] = useState(false)

       useEffect(() => {

              async function isLiked(){
                     try {
                           const response = await isCurrentVideoLiked(videoId)
                           if(response){
                            setFlag(response)
                           } 
                     } catch (error) {
                            console.log("Error in isCurrentVideoLikedFunction")
                     }
              }
              if(videoId)  isLiked()
       },[videoId])
       
       const [user,setUser] = useState({})
       
       useEffect(() => {
              async function fetchAuthorDetails(){
                     try {
                            // console.log("In Video page in getAuthor details function ",post.owner)
                           const response = await getAuthorDetails(post.owner)
                           if(response){
                            setUser(response)
                           } 
                     } catch (error) {
                            console.log("Error while getting user details ")
                     }
              }
              fetchAuthorDetails()
       
       
       },[post])

       const [comments,setComments] = useState([])

       useEffect(() => {
              async function fetchComments(){
                     try {
                           const response = await readComments(videoId)
                           setComments(response) 
                     } catch (error) {
                      console.log("Error in fetching comments")      
                     }
              }
              if(videoId)  fetchComments()
       },[])


       const like = async() => {
              try {
                     const response = await likeVideo(videoId)
                     if(response){
                            setLikes(prev  => prev+1)
                            setFlag(true)
                     }
                     else{
                            alert("Unable to create like instance")
                     }
              } catch (error) {
                     console.log("Error in like function in VideoPage component")
              }
       }

       const unlike = async() => {
              try {
                     const response = await dislikeVideo(videoId)
                     if(response){
                            setLikes(prev => prev-1)
                            setFlag(false)
                     }
                     else{
                            alert("Can't delete like instance")
                     }
              } catch (error) {
                     console.log("Error in dislike function in VideoPage component")
              }
       }

       

       return (
              post ? (
                <div className="video-page-container">
                  <div className="video-section">
                    <h2 className="video-title">{post.title}</h2>
                    <video className="video-player" controls>
                      <source src={post.videoFile} />
                      Your video is not supported by this browser.
                    </video>
                    <p className="video-description">{post.description}</p>
                    <div className="video-views">Views: {post.views}</div>
                    {author && (
                      <Button onClick={deleteHandler} className="delete-button">
                        Delete this video
                      </Button>
                    )}
                    {flag ? (
                      <Button onClick={unlike} className="unlike-button">Unlike</Button>
                    ) : (
                      <Button onClick={like} className="like-button">Like</Button>
                    )}
                    <Button className="total-likes-button">Total likes: {likes}</Button>
                  </div>
                  
                  <div className="author-section">
                    <img src={user.avatar} alt="Unable to fetch author's image" className="author-avatar" />
                    <div className="author-name">{user.username}</div>
                  </div>
                  
                  <PostComment videoId={videoId} />
                  
                  <div className="comments-section">
                    {comments?.map((comment) => (
                      <div key={comment._id} className="comment-card-container">
                        <CommentCard {...comment} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="error-message">
                  Can't fetch this video
                </div>
              )
            );
}

function previous(){
       return (
              post ? <div>
              <div>
                     <h2 style={{color:"black",fontSize:"20px"}}>{post.title}</h2>
                     <video width="360" height="240" controls>
                            <source src={post.videoFile} />
                            Your video is not supported by browser
                     </video>
                     <p>{post.description}</p>
                     <div>Views : {post.views}</div>
                     {author && <Button onClick={deleteHandler} bgColor='red'>Delete this video</Button>}
                     {flag ? <Button onClick={unlike}> Unlike </Button> : <Button bgColor='blue' onClick={like}>Like</Button>}
                     <Button bgColor='green'>Total likes : {likes}</Button>
                     <img src={user.avatar} alt='Unable to fetch author`s image ' width="100px"></img>
                     <div style={{color:"cyan",fontSize:"20px",fontFamily:"cursive"}}>{user.username}</div>
                     <PostComment videoId={videoId}/>
                     {
                            comments?.map((comment) => (
                                   <div key={comment._id}>
                                   <CommentCard {...comment}/>
                                   </div>
                            )) 
                     }
              </div>
           </div> : 
           <div className='text-2xl text-white m-4 p-4 bg-green-600 rounded-lg'>Can't fetch this video</div>
         )
}

export default VideoPage 