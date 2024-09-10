import { writeFile } from 'fs';

const content = 'This is the initial content'
writeFile('example.txt', content, err => {
    if(err) {
        console.error('Error writing to file: ', err)
    }else{
        console.log('File writen successfully')
    }
})