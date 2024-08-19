import React,{useState,useId} from 'react'
import {addComment} from '../../backendConnection/service.js'
import {Button} from '../Helpers/index.js'
import './PostComment.css'

function PostComment({videoId}) {
       const [inputText,setInputText] = useState("")
       const id = useId()
       const submit = async(e) => {
              e.preventDefault()
              try {
                   const response = await addComment(videoId,{content : inputText})  
                   if(response){
                     alert("Added comment successfully")
                     setInputText("")
                   }
                   else{
                     alert("Unable to add comment")
                   }
              } catch (error) {
                     console.log("Error in PostComment submit function")
              }
       }
       return (
        <div className="post-comment-container">
          <form onSubmit={submit} className="post-comment-form">
            <label htmlFor={id} className="post-comment-label">Enter comment:</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="5"
              cols="20"
              id={id}
              className="post-comment-textarea"
            />
            <Button type="submit" className="post-comment-button">Add Comment</Button>
          </form>
        </div>
      );
}

export default PostComment