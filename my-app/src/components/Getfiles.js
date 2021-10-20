import axios from 'axios'
import React,{useState,useEffect} from 'react'
import  '../App.css'

export default function Getfiles() {
    const [files,setFiles] = useState([])
    useEffect(() => {
        getfiles()
    
    }, [])
    function getfiles(){
        const user = {
            id:localStorage.getItem('userid')
        }
        axios.post('http://localhost:5000/getfiles',user).then(responseData => {
            setFiles(responseData.data);
            console.log(responseData.data);
        })
    }
    const deletefile = async (filename,filekey) =>{
        const data={
            Location:filekey,
            filename:filename
        }
      const res=await  axios.post("http://localhost:5000/deletefile",data)
      getfiles();
      console.log(res)
    }
    return (
        <div>
          {
               files.map(item => (
                    <div className='files'>
                     <a  href={item.fileskey}>{item.filename}</a>
                     <button onClick={()=>{deletefile(item.filename,item.fileskey)}}>delete</button>
                    </div>  
                    
               ))
          }
           
        </div>
    )
}
