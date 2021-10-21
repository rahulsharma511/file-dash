import React from 'react'
import { useHistory } from "react-router-dom"

export default function Home() {
    const history=useHistory();
    const gotosignup=()=>{
        history.push('/signup')
    }
    const gotologin=()=>{
        history.push('/login')
    }
    return (
        <div>
            <button onClick={gotosignup} className='btn btn-primary btn-block mt-4'>sign up</button>
            <button onClick={gotologin} className='btn btn-primary btn-block mt-4'>Log in</button>
        </div>
    )
}
