import app from './src/app.js'
import connectCloudinary from './src/config/cloudinary.js';
import connectToDB from './src/config/db.js';
import serverConfig from './src/config/serverConfig.js';



// better approach


const startServer = async () => {
    try {
        
        await connectToDB()
        await connectCloudinary()

        app.listen(serverConfig.PORT || 5000, () =>{
            console.log(`server is listening on localhost ${serverConfig.PORT || 5500} `);
            
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

startServer()





// older way

// app.listen(serverConfig.PORT, async () => {
//     await connectToDB()
//     await connectCloundinary()
//     console.log('server is running');
// })



