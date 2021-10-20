const aws = require("aws-sdk/clients/s3")
require('dotenv').config()
const fs = require('fs')
const bucketname=process.env.aws_bucket_name
const region=process.env.aws_region
const accessKeyId=process.env.access_key_id
const secretAccessKey=process.env.secret_access_key
const awsconnect = new aws({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadfile(file){
    const filename=file.name
    console.log(filename)
    const filestream=fs.createReadStream('./uploads/'+filename)
    const uploadparams={
        Bucket:bucketname,
        Body: filestream,
        Key:filename
    }
    return awsconnect.upload(uploadparams).promise()
}
function deletefile(filename){
    console.log(filename)
    const deleteparams={
        Bucket:bucketname,
        Key:filename
    }
    awsconnect.deleteObject(deleteparams, function(err, data) {
        if (err) 
          console.log(err, err.stack);  // error
        else    
         console.log("File Successfully Deleted!");
      });
}
exports.uploadfile= uploadfile
exports.deletefile = deletefile