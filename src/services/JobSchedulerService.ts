import { workanaService } from "./WorkanaFetchService";
import { jobsRepository } from "./JobRepository";

const INTERVAL_MS = 5 * 60 * 1000;
// adicionar iteração para a chamada dos jobs dentro da schedule

const SUBCATEGORIES = [
    'web-development',
    'mobile-development',
    'wordpress-1',
    // Adicione mais slugs de subcateg
]

class JobSchedulerService {
    private intervalId: NodeJS.Timeout | null = null;

    private isRunning: boolean = false;

    private async fetchAndProcessJobs() {

        if(this.isRunning) {
            console.log('[Scheduler] Ciclo anterior ainda em execução, Pulando este');
            return
        }
        this.isRunning = true;
        console.log(`[Scheduler] Iniciando novo ciclo de busca...`);

        try {
            
            let allJobs: any[] = [];
            
            for(const subcategory of SUBCATEGORIES) {

                const jobsFromPage = await workanaService.getJobsWorkana(subcategory);

                allJobs = allJobs.concat(jobsFromPage);

                await new Promise(resolve => setTimeout(resolve, 500));
            }

            console.log(`[Scheduler] Processamento finalizado. Total de ${allJobs.length}`);


            console.log(`[Scheduler] Encontradas ${allJobs.length} vagas.`);

            // salvando
            const savedCount = await jobsRepository.saveJobs(allJobs);

        } catch(error) {
            console.error(`[Scheduler] Erro durante a busca de vagas:`,  error);
        } finally {
                this.isRunning = false;
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