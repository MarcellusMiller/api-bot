import { Request, Response } from "express";
import { jobsRepository } from "../services/JobRepository";

export class JobsController {
    async getJobs(req: Request, res: Response): Promise<any> {
        try {
            const jobs = await jobsRepository.getRecentJobs();

            // const lastUpdate = jobsRepository.getRecentJobs();

            return res.status(200).json({
                count: jobs.length,
                // lastUpdate: lastUpdate,
                data: jobs,
            });
        } catch (error) {
            console.error('[JobsController] Erro de busca vagas:', error);
            res.status(500).json({error: 'Falha ao buscar vagas no banco de dados.'});
        }
    }
}

export const jobsController = new JobsController();