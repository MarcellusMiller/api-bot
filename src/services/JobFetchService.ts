import { WorkanaJobRaw } from "../interface/workanaJobRaw";

class WorkanaService {
    async getJobsWorkana(): Promise<any> {
        const res = await fetch("https://www.workana.com/pt/jobs?category=it-programming&language=pt&subcategory=web-development%2Cwordpress-1", {
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
            // aqui tem que terminar a tratagem do budget
        }))
    }
}

export const workanaService = new WorkanaService();