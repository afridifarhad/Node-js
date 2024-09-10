import { unlink } from "fs";

unlink('example.txt', err => {
    if(err) {
        if(err.code === 'ENOENT'){
            console.error("File not found")
        }else{
            console.error("Error deleting file", err)
        }
        }else{
            console.log("File deletd successfully")
        }
})