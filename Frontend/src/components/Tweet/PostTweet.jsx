import React from 'react'
import {Input,Button} from '../Helpers/index.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {uploadTweet} from '../../backendConnection/service.js'
import {useNavigate} from 'react-router-dom'

function PostTweet() {
  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()
  const submit = async(data) => {
    try {
      const createdPost = await uploadTweet(data)
      if(createdPost){
        alert("Your post has been created")
      }
      else{
        alert("Your post was not created")
      }
    } catch (error) {
      console.log("Error in post tweet component")
    }
    navigate("/")
  }
  return (
    <div style={{margin:"50px",padding:"50px",border:"5px solid green",borderRadius:"10px",display:"flex",flexDirection:'column'}}>
       <h3 style={{fontSize:"40px",margin:"30px",color:"greenyellow",fontFamily:"cursive"}}>Post Tweet</h3>
      <form onSubmit={handleSubmit(submit)}>
        <Input label="Enter content  : " {...register("content",{required : true})}/>
        <Button type='submit'>Post Tweet</Button>
      </form>
    </div>
  )
}

export default PostTweet