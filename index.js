const express = require("express");
const uuid = require("uuid");
const cors = require('cors')


const livros = [];


const livrosRouter = express.Router();

livrosRouter.get("/", (req, res) => {
  res.json(livros);
});


livrosRouter.post("/", (req, res) => {
  const livro = {
    id: uuid.v4(),
    titulo: req.body.titulo,
    edicao: req.body.edicao,
    autor: req.body.autor,
  };

  livros.push(livro);

  res.status(201).json(livro);
});

livrosRouter.put("/:id", (req, res) => {
  const livroId = req.params.id;
  const livroIndex = livros.findIndex((livro) => livro.id === livroId);

  if (livroIndex === -1) {
    res.status(404).json({ message: "Livro não encontrado" });
  } else {
    const updatedLivro = {
      id: livroId,
      titulo: req.body.titulo,
      edicao: req.body.edicao,
      autor: req.body.autor,
    };

    livros[livroIndex] = updatedLivro;

    res.json(updatedLivro);
  }
});

livrosRouter.delete("/:id", (req, res) => {
  const livroId = req.params.id;
  const livroIndex = livros.findIndex((livro) => livro.id === livroId);

  if (livroIndex === -1) {
    res.status(404).json({ message: "Livro não encontrado" });
  } else {
    livros.splice(livroIndex, 1);
    res.status(204).json();
  }
});

const app = express();
app.use(express.json())
app.use(cors())
app.use("/livros", livrosRouter);
app.listen(3000);
