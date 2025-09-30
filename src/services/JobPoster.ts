import { Client, Colors, GatewayIntentBits, TextChannel } from "discord.js";
import axios from "axios";
import { resolve } from "path";

// ambiente

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID!;
const BACKEND_URL = process.env.BACKEND_URL!;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

class JobPosterService {
    private isReady = false;

    public startBot() {
        client.once('ready', () =>{
            console.log(`[BOT] Logado como ${client.user?.tag}`);
            this.isReady = true;
            this.scheduleJobPosting();

        })

        
        client.login(DISCORD_BOT_TOKEN).catch(error => {
        console.error('[BOT] erro ao logar no discord. verifique o Discord_bot_token', error.message);
        });
    }

    public async postRecentJobs() {
        if(!this.isReady) {
            console.warn('[BOT] Cliente do discord não está pronto para postar');
            return
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/jobs`);
            const { data: jobs } = response.data;

            if(jobs.length  === 0) {
                console.log('[BOT] Nenhuma vaga nova encontrada (Ultimas 24 horas)');
                return
            }
            const channel = client.channels.cache.get(DISCORD_CHANNEL_ID);

            if(channel instanceof TextChannel) {
                for(const job of jobs) {
                    const message = this.formatJobMessage(job);
                    await channel.send(message);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
                console.log('[BOT] Postagem bem sucedida');
            } else {
                console.error(`[BOT] Canal com ID ${DISCORD_CHANNEL_ID} não encontrado`);
            }
        } catch(error: any) {
        if (axios.isAxiosError(error)) {
            console.error(`[BOT] ❌ ERRO FATAL DE CONEXÃO: ${error.message}`);
            console.error(`[BOT] 🎯 Código de Status do Axios: ${error.response?.status} (${error.response?.statusText})`);
            console.error(`[BOT] 💡 Verifique se a URL ${BACKEND_URL}/jobs funciona no seu navegador.`);
        } else {
            console.error('[BOT] ❌ Erro Desconhecido:', error);
        }
    }
    }
    private scheduleJobPosting() {
        const INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 horas

        this.postRecentJobs();

        setInterval(() => this.postRecentJobs(), INTERVAL_MS);

        console.log(`[BOT] agendador de postagem iniciado. intervalo : ${INTERVAL_MS / 1000 / 3600} horas`);
    }

    private formatJobMessage(job: any): any {
        return {
            embeds: [{
                color:  0x0099ff, 
                title: `💼 ${job.title}`,
                url: job.url,
                description: `${job.description.substring(0, 400)}`,
                fields: [{
                        name: `💰 Orçamento`,
                        value: job.budget?.string || 'combinar',
                        inline: true,
                },
                {
                    name: `🛠️ Habilidades`,
                    value: job.skills.slice(0, 5).join(', ') || 'nenhuma',
                    inline: true,
                }],
                footer: {
                    text: `Por ${job.authorName} | Postado em ${new Date(job.postedDate).toLocaleDateString('pt-BR')}`,
                }
            }]
        };
    }
    
}

export const jobPostedService = new JobPosterService();