import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from '../Helpers/index.js'
import {useNavigate} from 'react-router-dom'
import LogoutBtn from './LogoutBtn.jsx'
import SearchingBar from './SearchingBar.jsx'
function Header() {
       const status = useSelector(state => state.AuthSlice.status)
       const navigate = useNavigate()
       // I want to update Home button to an image
       const items = [
              {
                name : "Home",
                slug : "/",
                isActive : true
              },
              {
                name : "Login",
                slug : "/youtube-tweeter/login",
                isActive : !status
              },
              {
                name : "Signup",
                slug : "/youtube-tweeter/signup",
                isActive : !status
              },
              {
                name : "All Videos",
                slug : "/youtube-tweeter/all-published-videos",
                isActive : status
              },
              {
                name : "Upload video",
                slug : "youtube-tweeter/post-video",
                isActive : status
              },
              {
                name : "Help",
                slug : "/youtube-tweeter/help", 
                isActive : true
              },
              {
                name : "All tweets",
                slug: '/youtube-tweeter/all-tweets',
                isActive : status
              },
              {
                name : "Upload a tweet",
                slug : '/youtube-tweeter/post-tweet',
                isActive : status
              },
              {
                name : "Dashboard",
                slug : '/youtube-tweeter/dashboard',
                isActive : status
              }
            ]
  return (

    <div>
      {status && <SearchingBar/>}
      <div className='m-4 p-4 rounded-lg' style={{display:"flex",flexDirection:"row",backgroundColor:"green"}}>
        {
          items.map((item) => (
            item.isActive ? <div key={item.name}>
              <Button onClick={() => {navigate(item.slug)}}>{item.name}</Button>
            </div>
             : null
          ))
        }
        {status && <LogoutBtn/>}
      </div>
    </div>
  )
}

export default Header