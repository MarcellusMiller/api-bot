import { WorkanaJobRaw } from "../interface/workanaJobRaw";

class WorkanaService {
    async getJobsWorkana(page: number = 1): Promise<any> {
        const url = `https://www.workana.com/pt/jobs?category=it-programming&language=pt&subcategory=web-development&page=${page}`;
        const res = await fetch(url, {
            headers: {
                "accept": "application/json, text/plain, */*",
                 "x-requested-with": "XMLHttpRequest", 
            }
        });


        if(!res.ok) {
            throw new Error(`Erro ao buscar jobs: ${res.statusText}`);
        }

        const data = await res.json();
        
        
        const jobs: WorkanaJobRaw[] = data.results.results;


        return jobs.map(job=> ({
            slug: job.slug,
            title: job.title.replace(/<\/?[^>]+(>|$)/g, ""),
            description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
            url: `https://www.workana.com/job/${job.slug}`,
            authorName: job.authorName,
            skills: job.skills.map(s=> s.anchorText),
            budget: job.budget,
            isUrgent: job.isUrgent,
            postedDate: job.postedDate
        }))
    }
}

export const workanaService = new WorkanaService();