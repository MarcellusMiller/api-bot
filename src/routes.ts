import { Router } from "express";
import { JobsController } from "./controllers/JobsController";

const router = Router();
const workanaController = new JobsController;

router.get('/', (req, res) => {
    res.send("funfando krl");
})
router.get('/jobs', (req, res) => workanaController.getJobs(req, res))

export default router;