const fs=require('fs');

const requestHandler= (req, res)=>{
    const url = req.url;
    const method = req.method;

    if(url === "/"){

        fs.readFile('formValues.txt', (err, data) => {
            let savedText = err ? "Fill the Form" : data.toString();

        res.setHeader('content-type', 'text/html');
        res.end(`
            <h1>${savedText}</h1>
           <form action="/message" method="POST">
           <lable>Input</lable>
           <input type="text" name="message"></input>
           <button type="submit">Add</button>
           </form> 
            `)
        });    
    }

    else{
        if(url==="/message"){
            res.setHeader('content-type', 'text/html');

            let dataChunks=[];
            req.on('data', (chunks)=>{
                console.log(chunks);
                dataChunks.push(chunks); 
            })

            

            req.on('end', ()=>{
                let combinedBuffer = Buffer.concat(dataChunks);
                let value = combinedBuffer.toString().split("=")[1];
                console.log(value);
                fs.writeFile('message.txt', value, (err)=>{

                    if (err) {
                        console.error("Error writing to file:", err);
                        res.statusCode = 500; // Internal Server Error
                        res.end("Failed to save data");
                        return;
                    }

                    res.statusCode = 302; //it will redirect to the url path given 
                    res.setHeader('Location', '/');
                    res.end();
                }) 
            })
            //req.end();

        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Page Not Found");
        }
    } 
}

module.expot= requestHandler;