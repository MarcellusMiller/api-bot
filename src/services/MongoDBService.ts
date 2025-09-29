import {MongoClient, Db, Collection} from 'mongodb';

// ajustar para puxar do .env
const MONGODB_URI = 'mongodb://localhost:27017/workana_jobs';
const COLLECTION_NAME = 'vagas';

class MongoDBService {
    private client: MongoClient | null = null;
    private db: Db | null = null;
    private isConnected: boolean = false
    public vagasCollection: Collection | null = null;

    public async connect(): Promise<void> {
        if (this.isConnected && this.vagasCollection) {
            console.log('MongoDB jpa está conectadoi e pronto')
            return
        }

        try {
            console.log('Tentando Conectar ao MongoDB...');

            this.client = new MongoClient(MONGODB_URI);
            await this.client.connect();

            this.db = this.client.db();
            this.vagasCollection = this.db.collection(COLLECTION_NAME);

            this.isConnected = true;

            console.log('MongoDB conectado cria');
        } catch(error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            process.exit(1);
        }
    }
}

export const mongoDBService = new MongoDBService();