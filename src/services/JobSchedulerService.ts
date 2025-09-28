import { workanaService } from "./WorkanaFetchService";

const INTERVAL_MS = 5 * 60 * 1000;
// adicionar iteração para a chamada dos jobs dentro da schedule
class JobSchedulerService {
    private intervalId: NodeJS.Timeout | null = null;

    private async fetchAndProcessJobs() {
        try {
            console.log(`[Scheduler] Buscando novas vagas... (${new Date().toLocaleTimeString()})`);

            const jobs = await workanaService.getJobsWorkana();

            console.log(`[Scheduler] Encontradas ${jobs.length} vagas.`);

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