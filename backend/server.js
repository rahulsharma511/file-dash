const express=require("express")
const fileupload=require("express-fileupload")
const {uploadfile,deletefile} =require('./s3')
const mysql =require("mysql")
const cors = require("cors");

const db=mysql.createConnection({
    host:process.env.host,
    port:process.env.port,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})
const app=express()
app.use(express.json())
app.use(fileupload())
app.use(cors())

db.connect(err=>{
    if(err){
        console.log(err.message);
        return
    }
    console.log("database connected")
})

app.post('/register',(req,res)=>{
    console.log("registration request received")
    const username=req.body.username;
    const password=req.body.password;
    const nameof=req.body.name;
    // console.log("recieved userid ="+username+"received password="+password);
    db.query("insert into users (username,pswd,uname) values (?,?,?)",[username,password,nameof],(err,result)=>{
        console.log(err)
        console.log(result)
    })
})
app.post('/login',(req,res)=>{
    console.log("request received for login");
    const username=req.body.username;
    const password=req.body.password;
    db.query("select * from users where username=? and pswd=?",[username,password],(err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length>0){
            res.send(result)
        }else{
            res.send({message:'wrong username/password combination'})
        }

    })
})
app.post('/deletefile',(req,res)=>{
    const location=req.body.Location;
    const filename=req.body.filename;
    console.log("inside backend deletefile")
    console.log(filename)
    deletefile(filename);
    db.query('delete from userfiles where fileskey=?',location,(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        res.send({message:"deleted successfully"})
        })
})
app.post('/getfiles',(req,res)=>{
    console.log("in back end")
    console.log(req.body.id)
    const id=req.body.id;
    db.query('select fileskey,filename from userfiles where id=?',id,(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})
app.post("/uploads", (req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg:'no file uploaded'})
    }
    console.log('id', req.body.id);
    const file=req.files.file
    const userid = req.body.id
    const filename=file.name
    file.mv('./uploads/'+filename,async err=>{
        try{   
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            else{
                const result = await uploadfile(file)
                console.log("this is result:",result)
                console.log('location', result.Location)
                db.query('insert into userfiles (id,fileskey,filename) values (?,?,?)',[userid, result.Location,filename],(err, data)=>{
                        if(err){
                            res.status(500).send(err);
                        }
                        else {
                            res.send(data);
                        }
                })
            }
        }
        catch (err){
            console.log(err)
        }
        
    })
})

app.listen(5000,()=>console.log("express server started on port 5000"))