import { Request, Response } from "express";
import { workanaService } from "../services/WorkanaFetchService";

export class JobsController {
    async getJobs(req: Request, res: Response) {
        try {
            const jobs = await workanaService.getJobsWorkana();
            return res.json(jobs);
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }
}