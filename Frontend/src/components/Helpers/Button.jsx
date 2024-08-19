import React from 'react'

function Button({
       children,
       type="button",
       bgColor = "black",
       fontSize = "20px",
       ...props
}) {
  return (
    <div>
       <button {...props} style={{backgroundColor:bgColor,margin:"20px",padding:"10px",fontSize:fontSize,border:"3px solid black",borderRadius:"10px",color:"white"}} type={type} >{children}</button>
    </div>
  )
}

export default Button