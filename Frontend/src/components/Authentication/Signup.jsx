import React from 'react'
import {useForm} from 'react-hook-form'
import {Input,Button} from '../Helpers/index.js'
import {registerUser,getCurrentUser} from '../../backendConnection/auth.js'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login as authLogin} from '../../store/authSlice.js'
import './Signup.css'
function Signup() {
       const {register,handleSubmit} = useForm()
       const dispatch = useDispatch()
       const navigate = useNavigate()
       const submit = async(data) => {
              try {
                     const formdata = new FormData()
                     formdata.append('username',data.username)
                     formdata.append('fullName',data.fullName)
                      formdata.append('email',data.email)
                      formdata.append('avatar',data.avatar[0])
                      formdata.append('coverImage',data?.coverImage[0])
                      formdata.append('password',data.password)
                      const response = await registerUser(formdata)
                      if(response){
                        const currentUser = await getCurrentUser()
                        if(currentUser){
                          dispatch(authLogin(currentUser))
                        }
                        else{
                          alert("Error in Signup form")
                        }
                      }
                      navigate("/")
              } catch (error) {
                     console.log("Error in SignupForm",error)
              }
       }
       return (
        <div style={{textAlign:"center",display:"flex",justifyContent:"center"}} >
        <div style={{border:"5px solid green",margin:"20px",padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",borderRadius:"20px"}}>
          <h3  style={{color:"greenyellow",fontSize:"30px",margin:"20px",fontFamily:"algeria"}}>Signup Form</h3>
          <form onSubmit={handleSubmit(submit)} >
            <Input label="Enter your username:" {...register("username", { required: true })} />
            <Input label="Enter your full name:" {...register("fullName", { required: true })} />
            <Input type="email" label="Enter your email:" {...register("email", { required: true })} />
            <Input type="password" label="Enter password:" {...register("password", { required: true })} />
            <Input type="file" label="Choose your avatar:" {...register("avatar", { required: true })} />
            <Input type="file" label="Choose your cover image:" {...register("coverImage", { required: true })} />
            <Button type="submit" className="signup-button">Sign Up</Button>
          </form>
        </div>
        </div>
      );
}

export default Signup