import app from "./app";

// @ts-ignore
const port:number = process.env.PORT | 3000;

app.listen(port,()=>{
    console.log("Hello server is running here!!!");
});
