import React, {useState} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom';
const Login =()=>{
  const history = useHistory();
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  // const []
  const loginf= ()=>{
    Axios.post("http://localhost:5000/login",{
      username:username,
      password:password
    }).then((response)=>{
        console.log(response.data)
        console.log(response.data[0].id)
        localStorage.setItem('userid',response.data[0].id);
        history.push('/fileupload')
    })
  }
  return(
    <div>
      <h1>Login</h1>
      <label>Username</label>
      <input type="text" onChange={e=>{setUsername(e.target.value)}}/>
      <label>Password</label>
      <input type="password" onChange={e=>{setPassword(e.target.value)}}/>
      <button onClick={loginf}>Log in</button>
    </div>
  )
}
export default Login



