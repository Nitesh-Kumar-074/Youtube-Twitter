import React from 'react'
import './VideoCard.css'
import {Link} from 'react-router-dom' 
function VideoCard({thumbNail,title,duration,_id,description}) {
  return (
    <div className="videocard-container">
      <Link to={`/youtube-tweeter/video-page/${_id}`}>
        <div className="videocard-thumbnail-container">
          <img src={thumbNail} alt={title} className="videocard-thumbnail" />
        </div>
        <div className="videocard-content">
          <div className="videocard-title">{title}</div>
          <div className="videocard-duration">{duration}</div>
          <div className="videocard-description">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function previous(){
  return (
    <div style={{border:"1px solid white",margin:"50px",padding:"30px",backgroundColor:"white",display:"flex",flexDirection:"column",borderRadius:"15px",boxShadow:"10px 10px 10px  #63f709"}}> 
    {console.log(_id)}
      <Link to={`/youtube-tweeter/video-page/${_id}`}>
      <img src={thumbNail} width="200px" height="100px"/>
      <div style={{color:"blueviolet",fontSize:"30px",margin:"10px",fontFamily:"cursive"}}>{title}</div>
      <div style={{color:"red",fontSize:"15px",margin:"10px",fontFamily:"cursive"}}>{duration}</div>
      </Link>
    </div>
  )
}

export default VideoCard