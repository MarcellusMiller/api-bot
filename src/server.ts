import app from './app';
import { jobSchedulerService } from './services/JobSchedulerService';
import { mongoDBService } from './services/MongoDBService';
import { jobPostedService } from './services/JobPoster';

const PORT = process.env.PORT || 3000;

async function startServer() {

    await mongoDBService.connect();
    jobSchedulerService.start();

    jobPostedService.startBot();
    
    app.listen(PORT, () => {
        console.log("to aqui porraaaaa");
    });
}
startServer();


