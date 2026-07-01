const express = require('express');
const fs = require('fs');
const path = require('path');

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


app.post('/colaboradores', (req, res) => {
    const { nome, cargo, cpf, email, cep, numero } = req.body;
    const colaboradores = lerDados();

    if (!nome || !cargo || !cpf || !email || !cep || !numero) {
        return res.status(400).json({ 
            erro: "Todos os campos (nome, cargo, cpf, email, cep, numero) são obrigatórios." 
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ 
            erro: "O e-mail informado é inválido. Deve conter o caractere '@'." 
        });
    }

    const cpfExiste = colaboradores.find(c => c.cpf === cpf);
    if (cpfExiste) {
        return res.status(400).json({ 
            erro: "Este CPF já está cadastrado no sistema." 
        });
    }

    // Estrutura provisória (O Integrante 3 vai injetar o ViaCEP aqui depois)
    const novoColaborador = {
        id: Date.now().toString(),
        nome,
        cargo,
        cpf,
        email,
        endereco: {
            cep,
            numero,
            logradouro: "Aguardando ViaCEP...",
            bairro: "Aguardando ViaCEP...",
            cidade: "Aguardando ViaCEP...",
            estado: "Aguardando ViaCEP..."
        },
        status: "Ativo"
    };

    colaboradores.push(novoColaborador);
    salvarDados(colaboradores);

    return res.status(201).json({ 
        mensagem: "Colaborador pré-cadastrado com sucesso!", 
        colaborador: novoColaborador 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});