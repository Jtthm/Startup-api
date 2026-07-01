API de Gestão de Colaboradores e Benefícios - Etec de Cotia

Projeto prático desenvolvido para o componente curricular de Programação Web III, sob a orientação da professora Julia Alencar. A aplicação simula o ecossistema de gerenciamento de pessoas de uma startup.

---

A Startup e a Ideia do Projeto
SafePeople

Nossa startup visa otimizar processos de Recursos Humanos para empresas de tecnologia em crescimento acelerado. Esta API foi desenvolvida para solucionar as dores de onboarding de novos talentos, automatizando o cadastro de dados pessoais, validando informações sensíveis de forma segura e integrando dinamicamente a logística de localização/transporte do colaborador por meio de serviços de mapeamento de CEP (ViaCEP). 

O sistema conta com persistência local de dados, travas inteligentes contra duplicidade e histórico seguro de desligamento através de exclusão lógica (Soft Delete).

---

Divisão de Responsabilidades da Equipe

Para garantir a organização e as boas práticas no uso do GitHub, o projeto foi totalmente modularizado e dividido igualmente entre os desenvolvedores:

Integrante 1 ([João Pedro Gonçalves]/[Jtthl]):
Responsabilidade: Infraestrutura, Estruturação de Arquivos e Rotas de Leitura.
O que desenvolveu: Configuração inicial do servidor Express (`server.js`), criação da estrutura de pastas do projeto, desenvolvimento do arquivo de persistência local (`colaboradores.json`), módulo utilitário de leitura/escrita (`database.js`) e a implementação da rota `GET /colaboradores` (listagem geral e busca por ID/CPF).

Integrante 2 ([Luiz Gustavo Monteiro]/[VexBOLD]):
Responsabilidade: Validações de Segurança e Regras de Negócio.
O que desenvolveu: Criação da camada de middlewares (`validacoes.js`), responsável por travar requisições com campos obrigatórios vazios, validar o formato estrutural de e-mails (presença do `@`) e impedir o cadastro de CPFs duplicados na base de dados.

Integrante 3 ([Arthur Martins Godinho]/[ArthurMartins728]):
Responsabilidade: Integração com ViaCEP, Homologação/Testes e Documentação.
O que desenvolveu: Consumo da API externa (`viaCepService.js`), realização dos testes automatizados/manuais de todas as rotas (via Postman/Insomnia) para garantir as respostas JSON corretas, e escrita deste arquivo `README.md`.

Integrante 4 ([Victor Godinho]/[godin77]):
Responsabilidade: Ciclo de Vida do Registro (Update/Delete) e Documentação.
O que desenvolveu: Implementação das rotas `PUT /colaboradores/:id` para atualização dinâmica de cargo/e-mail (com trava de segurança bloqueando alteração de CPF) e `DELETE /colaboradores/:id` com lógica de Soft Delete (mudança de status para "Inativo" sem exclusão física).

---

Tecnologias Utilizadas
Node.js (Ambiente de execução)
Express.js (Framework para construção da API)
Axios (Cliente HTTP para integração com o ViaCEP)
FS (File System)** (Módulo nativo do Node para persistência em JSON)

---

Como Executar o Projeto

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Clone este repositório para o seu ambiente local:
   ```bash
   git clone [URL-DO-REPOSITORIO-DO-GRUPO]
