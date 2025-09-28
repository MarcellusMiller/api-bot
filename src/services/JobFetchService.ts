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
        return data.results.results;
    }
}

export const workanaService = new WorkanaService();