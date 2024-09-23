# Sobre

Esse projeto tem como objetivo realizar importação de pedidos em lotes.
Os lotes devem ser feitos em um arquivo no formato .txt, no qual cada linha representa um item do pedido.

O projeto foi contruído seguindo o padrão de micro-serviços, no qual os serviços relacionados ao processo atuam de forma totalmente independentes. Para isso, foram configurados quatro contêiners de serviço com o docker, são eles:

- Front-end (Aplicação front-end)
- Back-end (API da aplicação)
- Consumer (Processa mensagens que são recebidas na fila)
- RabbitMq (Serviço de mensageria)

# Repositório

O projeto foi criado baseado no padrão monorepo, que consiste na idéia de armazenar um ou mais projetos no mesmo repositório. Com isso, tanto o projeto front-end (Aplicação), back-end (API) e a configuração dos outros serviços estão sendo armazenados nesse mesmo repositorio.

# Estrutura de diretórios Back-end:

- src/: Contém todo o código fonte do projeto back-end.
- config/: Contém arquivos de configuração de ambiente, conexões, etc.
- controllers/: Contém as classes controllers gerenciam a comunicação HTTP.
- entities/: Contém as entidades que representam o modelo de dados do domínio.
- queues/: Arquivos correlacionados a comunicação com o serviço de mensageria, filas, etc.
- repositories/: Arquivos de comunicação e persistencia de dados.
- routes/: Arquivos de rotas do projeto.
- services/: Arquivos de serviços, onde são centralizadas as regras de negócios.
- tests/: Arquivos de testes.
- types/: Arquivos de tipagem.

# Estrutura de diretórios Front-end:

- src/: Contém todo o código fonte do projeto front-end.
- css/: Contém os arquivos de estilização CSS.
- modules/: Contém os módulos da aplicação com os seus arquivos de configurações e personalizações.
- router/: Arquivos de rotas da aplicação front-end.
- store/: Configuração do Vuex, ferramenta de gerenciamento de estados.

# Tecnologias

- Ambiente: NodeJs
- Frameworks: Vue(Front-end) e Express(Back-end)
- Linguagem: TypeScript
- Banco de dados: SQLite
- Mensageria: RabbitMq

# Como executar

Para iniciar o projeto, execute o comando abaixo no diretorio principal:

`docker-compose up -d --build`

Endereço Aplicação Front End:

http://localhost:9000

Endereço da API:

http://localhost:3000

Endereço da Documentação da API:

http://localhost:3000/api-docs


# Processo de Importação

O processo de importação de pedidos em lotes é feito de forma assincrona, visando trazer melhor experiencia ao usuário no processamento e também atender um maior volume de dados. 

Segue detalhes:

- Com isso, logo quando é feita a requisição ao endpoint de importação, é despachada uma mensagem para fila  de mensageria com o nome do arquivo que deve ser processado.

- A mensagem é processada por uma rotina em segundo plano, no qual ele localiza o arquivo e interpreta as informações que contém. 

- Após processar os dados do arquivo, é feita a exclusão do mesmo do diretorio uploads.
