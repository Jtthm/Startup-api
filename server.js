const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'colaboradores.json');
const PORT = 3000;

const lerDados = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const salvarDados = (dados) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2), 'utf-8');
};

app.get('/colaboradores', (req, res) => {
    const colaboradores = lerDados();
    const { busca } = req.query;

    if (busca) {
        const filtrado = colaboradores.filter(c => c.id === busca || c.cpf === busca);
        return res.json(filtrado);
    }

    return res.json(colaboradores);
});


app.post('/colaboradores', async (req, res) => {
    const { nome, cargo, cpf, email, cep, numero } = req.body;
    const colaboradores = lerDados();

    if (!nome || !cargo || !cpf || !email || !cep || !numero) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ erro: "O e-mail informado é inválido." });
    }
    const cpfExiste = colaboradores.find(c => c.cpf === cpf);
    if (cpfExiste) {
        return res.status(400).json({ erro: "Este CPF já está cadastrado no sistema." });
    }

    try {

        const cepLimpo = cep.replace(/\D/g, '');

        // 3. Consulta a API externa do ViaCEP usando o Axios
        const viaCepUrl = `https://viacep.com.br/ws/${cepLimpo}/json/`;
        const response = await axios.get(viaCepUrl);

        if (response.data.erro) {
            return res.status(400).json({ erro: "CEP não encontrado na base do ViaCEP." });
        }

        const { logradouro, bairro, localidade, uf } = response.data;

        const novoColaborador = {
            id: Date.now().toString(),
            nome,
            cargo,
            cpf,
            email,
            endereco: {
                cep: cepLimpo,
                numero,
                logradouro: logradouro || "Não fornecido",
                bairro: bairro || "Não fornecido",
                cidade: localidade,
                estado: uf
            },
            status: "Ativo"
        };

        colaboradores.push(novoColaborador);
        salvarDados(colaboradores);

        return res.status(201).json({ 
            mensagem: "Colaborador cadastrado com sucesso com dados do ViaCEP!", 
            colaborador: novoColaborador 
        });

    } catch (error) {

        return res.status(500).json({ erro: "Erro ao consultar a API externa do ViaCEP." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});