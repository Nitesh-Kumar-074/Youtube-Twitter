import React from 'react'
import {useSelector} from 'react-redux'
function Home() {
  const isLoggedIn = useSelector(state => state.AuthSlice.status)
  // let name = "No-one";
  //  name = useSelector(state => state.authSlice.currentUser.userData.data.name)
  return (
    <div style={{width:"600px",display:"inline-block",justifyContent:"center",margin:"100px",padding:"100px"}}>
      {
        isLoggedIn ? <h2 className='text-3xl' style={{fontSize:"60px",color:"cyan",margin:"50px"}}>Welcome</h2> : null
      }
      {
        isLoggedIn ? <h2 className='text-3xl' style={{fontSize:"60px",color:"greenyellow"}}>to our website</h2>: <h2 className='text-3xl' style={{fontSize:"30px",color:"greenyellow"}}>Login or Signup to use this website</h2>
      }
    </div>)
}

export default Home