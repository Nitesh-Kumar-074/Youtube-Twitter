import React from 'react'

function Help() {
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <div style={{color:"cyan",fontFamily:'initial',fontSize:"20px",width:"600px",textAlign:"left",border:"5px solid green",margin:"20px",padding:"30px",borderRadius:"20px"}}>
              This website is very simple to use.<br/><br/>
              1. If you have an account go to <strong color='pink'>Login page</strong> and login.
                     Else you can create a new account by going to <strong color='pink'>Signup page</strong>.<br/><br/>
              2. Go to <strong color='pink'>Upload tweet</strong> if you want to upload a tweet.<br/><br/>
              3. Go to <strong color='pink'>Upload video</strong> if you want to upload a video.<br/><br/>
              4. You can view all tweets  by visiting <strong color='pink'>All  tweets</strong> page.<br/><br/>
              {/* 4. If you click on any item you will get more information about that product e.g. Price, Content about the product
                 and you can simply contact the owner if you are not the owner.<br/><br/> */}
              5. You can view all videos  by visiting <strong color='pink'>All videos</strong> page.<br/><br/>
              6. When you click on a video thumbnail you can view that video.<br/><br/>
              7. You can like any published video or tweet by clicking on that video.<br/><br/>
              8. Once you have liked  you can unlike .<br/><br/>
              9. Admin can delete their tweets or video any time.<br/><br/>
              10. Hope you will enjoy our website.<br/><br/>
    </div>
    </div>
  )
}
 
export default Help 