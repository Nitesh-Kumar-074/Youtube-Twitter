import React,{useState,useEffect} from 'react'
import {getAllVideos} from '../../backendConnection/service.js'
import VideoCard from './VideoCard.jsx'
function AllPublishedVideos() {
       const [videos,setVideos] = useState([])
       useEffect(() => {
              async function hello(){
                     try {
                            const response = await getAllVideos() // returns a json data
                            console.log("Response in get all videos ")
                            console.log(response)
                            setVideos(response)
                             } catch (error) {
                            console.log("Error while fetching the videos")
                            }
              }
              hello()
       },[]) 
  return (
       <div className='text-2xl text-white' style={{display:"flex",flexWrap:"wrap"}}>
      {
        videos?.map((video) => (
          <div key={video._id}>
            <VideoCard {...video}/>
          </div>
        ))
      }
    </div>
  )
}

export default AllPublishedVideos