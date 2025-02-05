const http=require('http');

const fs=require('fs');

const routes=require('./routes')

//import { buffer } from 'stream/consumers';

const server=http.createServer(routes);

server.listen(3000, ()=>{
    console.log("Server is running");
})