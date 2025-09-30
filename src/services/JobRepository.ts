import { mongoDBService } from "./MongoDBService";
import { jobSchedulerService } from "./JobSchedulerService";

class JobsRepository {
 private lastUpdated: Date | null = null;
 
 public async saveJobs(newJobs: any[]): Promise<number> {
    if(!mongoDBService.vagasCollection) {
        console.error('[Repository] Coleção MongoDB não está disponível');
        return 0;
    }
    if(newJobs.length === 0) {
        console.log('[Repository] Nenhuma vaga nova para salvar.');
        return 0
    }

    try {
        const result = await mongoDBService.vagasCollection.insertMany(newJobs, {ordered: false});

        this.lastUpdated = new Date();
        return result.insertedCount;
    } catch(error: any) {
       if(error.code === 11000) {
        const insertedCount = error.result?.nInserted || 0;
        const ignoredCount = error.writeErrors?.length || 0;

        if(insertedCount > 0) {
            this.lastUpdated = new Date();
        }

        console.log(`[Repository] ${ignoredCount} duplicatas ignoradas. ${insertedCount}`);
        return insertedCount;
       } else {
        console.error(`[Repository]Error Crítico ao salvar`, error);
        throw error;
       }
       
    }
 }
 public async getRecentJobs(): Promise<any[]> {
    if(!mongoDBService.vagasCollection) {
        console.warn('[Repository] Coleção indisponível para busca.');
        return [];
    }
    const twentyFourHourAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    console.log(`[Repository] Buscando vagas postadas desde ${twentyFourHourAgo.toISOString()}`);

    try {
            return await mongoDBService.vagasCollection
                .find({})            
                .sort({ postedDate: -1 }) 
                .toArray();
        } catch(error) {
            console.error('[Repository] Erro ao buscar vagas recentes:', error); 
            return [];
        }
    }
 public getLatestUpdate(): Date | null {
    return this.lastUpdated;
 }
}
export const jobsRepository = new JobsRepository();