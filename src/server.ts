import app from './app';
import { jobSchedulerService } from './services/JobSchedulerService';

const PORT = process.env.PORT || 3000;

jobSchedulerService.start();

app.listen(PORT, () => {
    console.log("to aqui porraaaaa");
});