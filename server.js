const express = require("express");
const app = express();


const PORT = 3000;


app.use(express.json());


let clientes = [];
let proximoId = 1;



app.get("/clientes", (req, res) => {
  return res.status(200).json(clientes);
});


app.get("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);
  const cliente = clientes.find((c) => c.id === id);

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  return res.status(200).json(cliente);
});


app.post("/clientes", (req, res) => {
  const { nome, email, telefone, cidade } = req.body;

 
  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
  }


  const emailJaExiste = clientes.find((c) => c.email === email);
  if (emailJaExiste) {
    return res.status(409).json({ mensagem: "Esse email já está cadastrado." });
  }

  const novoCliente = {
    id: proximoId++,
    nome,
    email,
    telefone: telefone || null,
    cidade: cidade || null,
  };

  clientes.push(novoCliente);

  return res.status(201).json(novoCliente);
});


app.put("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = clientes.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  const { nome, email, telefone, cidade } = req.body;


  if (nome) clientes[index].nome = nome;
  if (email) clientes[index].email = email;
  if (telefone) clientes[index].telefone = telefone;
  if (cidade) clientes[index].cidade = cidade;

  return res.status(200).json(clientes[index]);
});


app.delete("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = clientes.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  clientes.splice(index, 1);

  return res.status(200).json({ mensagem: "Cliente removido com sucesso." });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
