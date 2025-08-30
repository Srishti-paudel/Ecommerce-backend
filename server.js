import app from "./src/app.js";
import { envConfig } from "./src/config/config.js";
// adminSeeder()
app.listen(envConfig.port,()=>{
    console.log(`project started at port[3000]`)
}) 