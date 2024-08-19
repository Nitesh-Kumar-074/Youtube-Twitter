import React,{useEffect,useState} from 'react'
import {getUserProfile} from '../../backendConnection/auth.js'
import {Button} from '../Helpers/index.js'
import {useSelector} from 'react-redux'
import {deleteComment} from '../../backendConnection/service.js'
import './CommentCard.css'

function CommentCard({_id,content,owner}) {

       const [user,setUser] = useState({})
       useEffect(() => {
              async function fetchOwner(){
                     try {
                            const author = await getUserProfile(owner)
                            if(author)
                            setUser(author)
                     } catch (error) {
                            console.log("Error in fetching comment")
                     }
              }
              if(owner) fetchOwner()
       },[owner])

       const currentUser = useSelector(state => state.AuthSlice.userData)

       let isAuthor = owner && currentUser ?  owner === currentUser._id : false

       const deleteHandler = async() => {
              try {
                     const deletedInstance = await deleteComment(_id)
                     if(deletedInstance){
                            alert("Comment deleted successfully")
                     }
                     else{
                            alert("Error in deleting comment")
                     }
              } catch (error) {
               console.log("Error in deleting this comment")      
              }
       }

       return (
              <div className="comment-card-container">
                <div className="comment-card">
                  <h3 className="comment-username">{user.username}</h3>
                  <p className="comment-content">{content}</p>
                  {isAuthor && (
                    <Button onClick={deleteHandler} className="delete-button">
                      Delete comment
                    </Button>
                  )}
                </div>
              </div>
            );
}

export default CommentCard