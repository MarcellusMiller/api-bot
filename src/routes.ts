import { Router } from "express";
import { JobsController } from "./controllers/JobsController";

const router = Router();
const workanaController = new JobsController;

// rotas get
router.get('/jobs', (req, res) => workanaController.getJobs)

export default router;