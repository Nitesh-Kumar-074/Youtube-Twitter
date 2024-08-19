import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {deleteTweet,numberOfLikesOnCurrentTweet,isCurrentTweetLiked,likeTweet,dislikeTweet,getAuthorDetails} from '../../backendConnection/service.js'
import {Button} from '../Helpers/index.js'
import {useNavigate} from 'react-router-dom'
import './TweetCard.css'

function TweetCard({_id,content,owner}) {
       const userData = useSelector(state => state.AuthSlice.userData)
       const isAuthor = owner && userData ? owner ===  userData._id : false
       let colorOfText = isAuthor ? "blue" : "purple"
       const navigate = useNavigate()
       const submit = async() => {
              try {
                     const deletedTweet = await deleteTweet(_id)
                     if(deletedTweet){
                            alert("Tweet deleted successfully")
                            navigate("/")
                     }
                     else{
                            alert("Unable to delte tweet")
                            navigate("/")
                     }
              } catch (error) {
                     console.log("Error in deleteTweet function")
              }
       }

              const [likes,setLikes] = useState(0)
              useEffect(() => {
                     async function fetchLikes() {
                            try {
                                   // console.log(_id)
                                   const response = await numberOfLikesOnCurrentTweet(_id)
                                   setLikes(response)
                                   // console.log(response)
                            } catch (error) {
                                   alert("Bhai tu function tak nahi pahuch raha")
                            }
                     }
                     if(_id) fetchLikes();
              },[_id])

              const [flag,setFlag] = useState(false)
                     useEffect(() => {
                            async function isLiked(){
                                   try {
                                          const response = await isCurrentTweetLiked(_id)
                                          // alert(response)
                                          if(response){
                                                 setFlag(response)
                                          }
                                   } catch (error) {
                                        alert("Ab isCurrent tweet liked mein bhi error aagaya ")  
                                   }
                            }
                            if(_id) isLiked()
                     },[_id])

              const like = async() => {
                     // // alert("Liked this tweet")
                     // setFlag(true)
                     try {
                            const response = await likeTweet(_id)
                            if(response){
                                   setLikes(prev => (prev+1))
                                   setFlag(true)
                            }
                            else{
                                   alert("Unable to create like instance ")
                            }
                     } catch (error) {
                            console.log("Error in like function in LikeTweet component")
                     }
              }

              const unlike = async() => {
                     // alert("Disliked this tweet")
                     // setFlag(false)
                     try {
                            const response = await dislikeTweet(_id)
                            if(response){
                                   setLikes(prev => prev-1)
                                   setFlag(false)
                            }
                            else{
                                   alert("Can't delete like instance ")
                            }
                     } catch (error) {
                            console.log("Error in dislike function in LikeTweet component")
                     }
              }
              const [user,setUser] = useState({})
              useEffect(() => {
                     async function authorDetails(){
                            try {
                                   console.log("In Video page in getAuthor details function ",owner)
                                  const response = await getAuthorDetails(owner)
                                  if(response){
                                   setUser(response)
                                  } 
                            } catch (error) {
                                   console.log("Error while getting user details ")
                            }
                     }
                    if(owner) authorDetails()
              },[owner])


              return (
                     <div className="tweetcard-container">
                       <div className="tweetcard-header">
                         <img src={user.avatar} className="avatar" alt="Can't fetch author's avatar" />
                         <div className="username">{user.username}</div>
                       </div>
                       <div className="tweetcard-content" style={{ color: colorOfText }}>
                         {content}
                       </div>
                       <div className="tweetcard-actions">
                         {flag ? <Button onClick={unlike}>Unlike</Button> : <Button className="like-button">Like</Button>}
                         <Button className="likes-count">Total likes: {likes}</Button>
                         {isAuthor && <Button className="delete-button" onClick={submit}>Delete</Button>}
                       </div>
                     </div>
                   );
}


export default TweetCard

function helper(){
       return (
              <div style={{display:"flex",flexDirection:"column",width:"1100px",border:"2px solid white",borderRadius:"10px",backgroundColor:"white",margin:"20px",padding:"10px",boxShadow:"10px 10px 10px #F983E2"}}>
              <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                <table>
                       <tbody>
                       <tr>
                              <td>
                     <div >
                            <img src={user.avatar} width="100px" alt="Can't fetch author's avatar"/>
                            <div className='m-3 text-2xl text-black'>{user.username}</div>
                     </div>
                     </td>
                     <td>
                     <div style={{fontSize:"20px",fontFamily:"cursive",color:colorOfText,display:"flex",flexDirection:"row",alignItems:"center"}}>
                            {content} 
                     </div>
                     </td>
                     </tr>
                     </tbody>
                </table>
              </div>
              <div style={{display:"flex",justifyContent:"space-around"}}>
                     {flag ? <Button onClick={unlike}>Unlike  </Button> : <Button onClick={like} bgColor='blue'>Like</Button>}
                     <Button bgColor='green'>Total likes : {likes}</Button>
                     {isAuthor && <Button bgColor='red' onClick={submit}>Delete</Button>}
              </div>
         </div>
           )
}