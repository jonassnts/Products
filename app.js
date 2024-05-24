import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Ok");
});

const produtos = [
    {
        "id": 1,
        "nome": "Maracujá",
        "descricao": "Fruta",
        "preco": 7.99
    },
    {
        "id": 2,
        "nome": "Banana",
        "descricao": "Fruta",
        "preco": 4.99
    }
]

function buscaProduto(id){
    return produtos.findIndex(produtos =>{
        return produtos.id === Number(id);
    })
}

app.route("/produtos")
.get((req,res) =>{
    res.status(200).json(produtos)
})
.post((req, res) =>{
    produtos.push(req.body);
    res.status(201).send("Cadastrado com sucesso!")
})

app.route("/produtos/:id")
.get((req,res) =>{
    const id = buscaProduto(req.params.id);
    res.status(200).json(produtos[id]).post((req,res) =>{
        produtos.push(req.body);
        res.status(201).send("Cadastrado com sucesso!")
    })
})

.put((req, res) =>{
    const id = buscaProduto(req.params.id);
    produtos[id].nome = req.body.nome;
    produtos[id].descricao = req.body.descricao;
    produtos[id].preco = req.body.preco
    res.status(200).json(produtos[id]);
})
.delete((req, res) =>{
    const id = buscaProduto(req.params.id);
    if(produtos[id]){
        produtos.splice(id, 1);
        res.status(200).send("removido com sucesso!");
    } else {
        res.status(404).send("produto não encontrado!")
    }
})

export default app;