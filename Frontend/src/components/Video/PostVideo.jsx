import React from 'react'
import {Input,Button,Select} from '../Helpers/index.js'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {uploadVideo} from '../../backendConnection/service.js'
function PostVideo() {
       const {register,handleSubmit} = useForm()
       const navigate = useNavigate()
       const options = [
              {
                     value : true,
                     tag : "Publish video"
              },
              {
                     value : false,
                     tag : "Don't publish this video"
              }
       ]
       const submit = async(data) => {
              try {
                     const formdata = new FormData()
                     formdata.append('title',data.title)
                     formdata.append('description',data.description)
                     formdata.append('videoFile',data.videoFile[0])
                     formdata.append('thumbNail',data.thumbNail[0])
                     formdata.append('isPublished',data.isPublished)
                     const response = await uploadVideo(formdata)
                     if(response){
                            alert("Video uploaded successfully")
                     }
                     else{
                            alert('Error in Postvideo form')
                     }
              } catch (error) {
                     console.log("Error in PostVideo form")
                     
              }
              navigate("/")
       }
  return (
       <div style={{margin:"50px",padding:"50px",border:"5px solid green",borderRadius:"10px",display:"flex",flexDirection:'column'}}>
       <h3 style={{fontSize:"40px",margin:"30px",color:"greenyellow",fontFamily:"cursive"}}>Post Video</h3>
       <form onSubmit={handleSubmit(submit)}>
              <Input label="Title " placeholder="Enter title of video " {...register("title",{required:true})} />
              <Input label="Description " placeholder="Enter description of video " {...register("description",{required : true})} />
              <Input type="file" label="Choose video file" placeholder="Enter video " accept="video/*" {...register("videoFile",{required:true})} />
              <Input type="file" label="Choose thumbnail " placeholder="Enter thumbnail " {...register("thumbNail",{required:true})} />
              <Select options={options} label="Want to publish your video ?" {...register("isPublished",{required : true})} />
              <Button type="submit" classname='m-3'>Submit</Button>
       </form>
    </div>
  )
}

export default PostVideo