import React,{useState} from 'react'
import {Input} from '../Helpers/index.js'
import {useNavigate} from 'react-router-dom'
import './SearchingBar.css';

function SearchingBar() {
       const navigate = useNavigate()
       const [channelName,setChannelName] = useState("")

       const search = () => {
              navigate(`/youtube-tweeter/channel-page/${channelName}`)
              setChannelName("")
       }

       return (
              <div className="searching-bar-container">
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter channel's username here you want to search"
                  className="searching-bar-input"
                />
                <button onClick={search} className="searching-bar-button">
                  Search
                </button>
              </div>
       )
}

export default SearchingBar