🤖 Freelas Master Bot
💼 Visão Geral do Projeto
O Freelas Master Bot é um sistema completo de Web Scraping, API REST e Integração com Discord Bot desenvolvido para monitorar o mercado de trabalho freelancer (Workana, etc.).

O projeto demonstra proficiência na construção de uma arquitetura baseada em microsserviços (Crawler, API e Consumer Bot), utilizando TypeScript em toda a stack para garantir tipagem e escalabilidade. Este sistema coleta, processa, armazena e publica informações em tempo real para uma comunidade de desenvolvedores.

✨ Tecnologias Utilizadas
Este projeto foi desenvolvido com foco em performance, tipagem forte e desacoplamento de responsabilidades.

Categoria	Tecnologia	Uso no Projeto
Linguagem	TypeScript	Linguagem principal para toda a stack (Crawler, API e Bot).
Backend	Node.js	Ambiente de execução.
Framework	Express.js	Construção da API REST para servir os dados.
Banco de Dados	MongoDB (Atlas)	Persistência de dados e indexação para controle de duplicatas.
Web Scraping	Axios (para requisições)	Módulo de coleta de dados (Web Crawler).
Comunicação	Discord.js	Bot para consumo da API e postagem de vagas.

Exportar para as Planilhas
🏗️ Arquitetura do Sistema
O projeto é dividido logicamente em três componentes principais:

Job Scheduler (Crawler):

Responsável pela lógica de Web Scraping (coleta de dados).

Roda em um ciclo agendado (a cada 5 minutos).

Salva novas vagas na coleção do MongoDB e ignora duplicatas através de um índice único (slug/URL).

API REST (Express.js):

Serve como interface de comunicação.

Endpoint principal: /jobs (retorna vagas postadas nas últimas 24 horas).

Job Poster Service (Discord Bot):

Consumidor da API.

Loga no Discord e usa um agendador interno (a cada 6 horas).

Busca novas vagas na API, formata os dados em Embeds bonitos e os posta em um canal dedicado.

⚙️ Configuração e Execução
Para rodar este projeto localmente, siga os passos abaixo:

Pré-requisitos
Node.js (v14+)

MongoDB Atlas (ou instância local)

Conta no Discord Developer Portal (para criar o Bot)

1. Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis:

Snippet de código

# Configuração do Servidor e Banco de Dados
PORT=3000
# Inclua o nome do seu banco de dados no final da URI (ex: /test)
DATABASE_URI="mongodb+srv://user:pass@cluster.mongodb.net/test?..." 
DATABASE_COLLECTION="vagas" # Nome da coleção onde as vagas são salvas
BACKEND_URL="http://0.0.0.0:3000" # Use 0.0.0.0 para garantir a comunicação local

# Configuração do Discord Bot
DISCORD_BOT_TOKEN="SEU_TOKEN_AQUI"
DISCORD_CHANNEL_ID="ID_DO_CANAL_DE_POSTAGEM"
2. Instalação e Inicialização
Instale as dependências e inicie o projeto em modo de desenvolvimento:

Bash

# Instala dependências (npm install ou yarn)
npm install

# Inicia o servidor em modo de desenvolvimento (com ts-node-dev)
npm run dev
Logs de Sucesso Esperados
Ao iniciar, você verá a prova de que todos os serviços foram inicializados e estão se comunicando:

MongoDB conectado cria
[Scheduler] Agendador iniciado. Intervalo: 5 minutos.
[BOT] Logado como Freelas Master#8387
[BOT] Agendador de postagem iniciado. Intervalo : 6 horas
[BOT] API respondeu com 36 vagas. Iniciando postagem...
[BOT] Postagem bem sucedida 
💡 Próximos Passos e Melhorias
Adicionar autenticação JWT/API Key para acesso à API.

Implementar um queue system (Redis/RabbitMQ) para desacoplar a coleta da postagem.

Adicionar suporte para outras plataformas de freela (GetNinjas, 99Freelas).
