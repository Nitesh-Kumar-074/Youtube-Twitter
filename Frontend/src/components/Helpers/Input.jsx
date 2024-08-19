import React,{useId} from 'react'

function Input({
  label,
  type = "text",
  ...props
},ref) {
  const id = useId()
  return (
    <div>
      {label && <label htmlFor={id} className='text-xl text-white m-4 p-4'>{label}</label>}
      <input type={type} ref={ref} {...props} style={{margin:"20px",padding:"10px",border:"2px solid black",borderRadius:"15px",fontSize:"20px",fontFamily:"cursive"}}/>
    </div>
  )
}

export default React.forwardRef(Input)