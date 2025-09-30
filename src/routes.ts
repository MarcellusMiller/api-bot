import { Router } from "express";
import { jobsController } from "./controllers/JobsController"; // Importe a instância

const router = Router();

router.get('/jobs', jobsController.getJobs.bind(jobsController));

export default router;