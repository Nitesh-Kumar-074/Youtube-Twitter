import React from 'react'

function Select({
       options = [],
       label
},ref) {
  return (
    <div>
       {label && <label className={`text-2xl text-white cursive`}>{label}</label>}
       <select ref={ref} >
              {
                     options?.map((option,index) => (
                            <option value={option.value} key={index}>
                                   {option.tag}
                            </option>
                     ))
              }
       </select>
    </div>
  )
}

export default React.forwardRef(Select)