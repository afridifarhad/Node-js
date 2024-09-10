import { readFile } from 'fs'

readFile('example.txt', 'utf8', (err, data) => {
    if(err) {
        console.error("error reading file asynchonously", err)

    }
    else{
        console.log("asynchronous read", data)
        
    }
})