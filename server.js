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

app.get('/colaboradores', (req, res) => {
    const colaboradores = lerDados();
    const { busca } = req.query; 

    if (busca) {
        const filtrado = colaboradores.filter(c => c.id === busca || c.cpf === busca);
        return res.json(filtrado);
    }

    return res.json(colaboradores);
});

app.listen(PORT, () => {
    console.log("Servidor rodando com sucesso em http://localhost:${PORT}");
});