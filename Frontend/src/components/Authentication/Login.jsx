import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {Input,Button} from '../Helpers/index.js'
import {loginUser,getCurrentUser} from '../../backendConnection/auth.js'
import {login as authLogin} from '../../store/authSlice.js'
function Login() {
       const navigate = useNavigate()
       const dispatch = useDispatch()
       const {register,handleSubmit} = useForm()
       const submit = async(data) => {
              try {
                     const formdata = new FormData()
                     if(data.email){
                            formdata.append('email',data.email)
                     }
                     if(data.username){
                            formdata.append('username',data.username)
                     }
                     formdata.append('password',data.password)
                     const response = await loginUser(formdata)
                     if(response){
                            const userData = await getCurrentUser()
                            if(userData){
                                   dispatch(authLogin(userData))
                                   
                            }
                            else{
                                   alert("Error in login")
                            }
                     }
              } catch (error) {
                     console.log("Error in Login component")
              }
              navigate("/")
       }
       return (
              <div  style={{textAlign:"center",display:"flex",justifyContent:"center"}} >
                <div style={{border:"5px solid green",margin:"20px",padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",borderRadius:"20px"}}>
                  <h3 style={{color:"greenyellow",fontFamily:"algeria",fontSize:"30px"}}>Login Form</h3>
                  <form onSubmit={handleSubmit(submit)} >
                    <Input type="email" label="Enter your email" {...register("email")} />
                    <Input label="Enter your username:" {...register("username")} />
                    <Input type="password" label="Enter your password:" {...register("password", { required: true })} />
                    <Button type="submit" className="login-button">Login</Button>
                  </form>
                </div>
              </div>
       )
}
 
export default Login