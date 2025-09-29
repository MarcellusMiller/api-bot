import { workanaService } from "./WorkanaFetchService";

const INTERVAL_MS = 5 * 60 * 1000;
// adicionar iteração para a chamada dos jobs dentro da schedule
class JobSchedulerService {
    private intervalId: NodeJS.Timeout | null = null;

    private async fetchAndProcessJobs() {
        try {
            const MAX_PAGES = 5;
            
            let allJobs: any[] = [];
            
            for(let page = 1; page <= MAX_PAGES; page++) {
                console.log(`[Scheduler] Buscando vagas na página ${page}...`);

                const jobsFromPage = await workanaService.getJobsWorkana(page);

                allJobs = allJobs.concat(jobsFromPage);

                await new Promise(resolve => setTimeout(resolve, 500));
            }

            console.log(`[Scheduler] Processamento finalizado. Total de ${allJobs.length}`);


            console.log(`[Scheduler] Encontradas ${allJobs.length} vagas.`);

        } catch(error) {
            console.error(`[Scheduler] Erro durante a busca de vagas:`,  error);
        }
    }

    public start() {
        if(this.intervalId) {
            console.log("o agendador ta mec");
            return;
        }
        this.fetchAndProcessJobs();


        this.intervalId = setInterval(() => {
            this.fetchAndProcessJobs();
        }, INTERVAL_MS);

        console.log(`[Scheduler] Agendador iniciado. Intervalo: ${INTERVAL_MS / 1000 / 60} minutos.`)
    }

    public stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("[Scheduler] Agendador parado.");
        }
    }
}

export const jobSchedulerService = new JobSchedulerService();