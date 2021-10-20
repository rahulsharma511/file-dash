import React , { useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

const Signup = ()=>{
  const [namereg,setnamereg]=useState("");
  const [usernamereg,setusernamereg]= useState('');
  const [passwordreg,setpasswordreg]= useState('');
  const register = ()=>{
    Axios.post('http://localhost:5000/register',{
      username: usernamereg,
      password:passwordreg,
      name:namereg
    })
  }
  return(
    <div className='signup'>
      <h1>Sign Up</h1>
      <label>Name</label>
      <input type="text" onChange={(e)=>
        setnamereg(e.target.value)
      }/>

      <label>Username</label>
      <input type='text' onChange={(e)=>{
        setusernamereg(e.target.value);
      }}/>

      <label>Password</label>
      <input type='password' onChange={(e)=>{
        setpasswordreg(e.target.value);
      }}/>
      <button onClick={register}>
        Signup
      </button>
      <div style={{display:'flex', flexDirection:'row'}}>
      <p>already user?</p>
      <Link to='/login'><p> Log in</p></Link>
      </div>
    </div>
  )
}
export default Signup;