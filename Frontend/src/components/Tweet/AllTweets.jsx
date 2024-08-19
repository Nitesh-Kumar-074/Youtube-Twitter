import React,{useState,useEffect} from 'react'
import {getAllTweets} from '../../backendConnection/service.js'
import TweetCard from './TweetCard.jsx'
import {useNavigate} from 'react-router-dom'


function AllTweets() {
       const [tweets, setTweets] = useState([]);
       const navigate = useNavigate()
       useEffect(() => {
              const fetchTweets = async () => {
                     try {
                       const response = await getAllTweets();
                       // const response = await getAllTweets()
                       setTweets(response);
                     } catch (error) {
                       console.error('Error fetching tweets:', error);
                     }
                   };
               
                   fetchTweets();
       },[])
  return (
       <div style={{display:"flex",flexDirection:"column"}}>
      {tweets?.map((tweet) => (
       <div key={tweet._id}>
              <TweetCard {...tweet}/>
       </div>
      ))}
    </div>
  )
}

export default AllTweets