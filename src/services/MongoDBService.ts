import {MongoClient, Db, Collection} from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

// ajustar para puxar do .env
const MONGODB_URI = process.env.DATABASE_URI!;
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
            if(!MONGODB_URI) {
                console.error('❌ ERRO CRÍTICO: Variável de ambiente DATABASE_URI não está definida.');
                process.exit(1); 
            }
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