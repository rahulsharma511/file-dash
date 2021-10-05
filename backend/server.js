const express=require("express")
const fileupload=require("express-fileupload")
const {uploadfile} =require('./s3')

const app=express()
app.use(fileupload())

app.post("/uploads", (req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg:'no file uploaded'})
    }
    const file=req.files.file
    const filename=file.name
    console.log(req.files)
    file.mv('./uploads/'+filename,async err=>{
        try{   
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            else{
                const result = await uploadfile(file)
                console.log("this is result:",result)
                return res.status(200).send('file uploaded')
            }
        }
        catch (err){
            console.log(err)
        }
        
    })
})

app.listen(5000,()=>console.log("express server started on port 5000"))