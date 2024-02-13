import express = require("express")
import { AppDataSource } from "./data-source"
import router from "./routes"
import cors = require("cors")
import 'dotenv/config'

// then dan catch identik dengan janji
AppDataSource.initialize()
    .then(async () => {
    const app = express()
    
    
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }))

    app.use(express.json())//unutk membuat data di get berbentuk json
    app.use("/api/v1", router)

    
    app.listen(process.env.PORT , () => 
        console.log(`Server is running on port ${process.env.PORT} `)
    )
   

}).catch(error => console.log(error))



