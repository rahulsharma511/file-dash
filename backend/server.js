const express=require("express")
const fileupload=require("express-fileupload")

const app=express()
app.use(fileupload())

app.post("/uploads",(req,res)=>{
    console.log("request receieved")
    if(req.files === null){
        return res.status(400).json({msg:'no file uploaded'})
    }
    const file=req.files.file
    const filename=file.name
    console.log(req.files)
    file.mv('./uploads/'+filename,err=>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        else{
            console.log("hii there")
            return res.status(200).send('file uploaded')
        }
        
    })
})

app.listen(5000,()=>console.log("express server started on port 5000"))