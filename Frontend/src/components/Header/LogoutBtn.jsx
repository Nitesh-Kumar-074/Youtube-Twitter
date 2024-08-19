import React from 'react'
import {Button} from '../Helpers/index.js'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout as authLogout} from '../../store/authSlice.js'
import {logoutUser} from '../../backendConnection/auth.js'
function LogoutBtn() {
       const dispatch = useDispatch()
       const navigate = useNavigate()
       const submit = async function(){
              await logoutUser().then(() => {
                dispatch(authLogout())
              })
              navigate("/")
            }
  return (
       <Button onClick={submit} bgColor='red' >Log out</Button>
  )
}

export default LogoutBtn