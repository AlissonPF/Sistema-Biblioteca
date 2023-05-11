import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router : Router = Router();

export { router };

router.get('/livros', async (req, res) => {
  const livros = await prisma.livro.findMany();
  res.json(livros);
});

router.post('/livros', async (req, res) => {
  const { titulo, autor, ano_publicacao, quantidade_estoque } = req.body;
  const livro = await prisma.livro.create({
    data: {
      titulo,
      autor,
      ano_publicacao,
      quantidade_estoque,
    },
  });
  res.json(livro);
});

router.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

router.post('/clientes', async (req, res) => {
  const { nome, email, cpf } = req.body;
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      email,
      cpf,
    },
  });
  res.json(cliente);
});

router.get('/emprestimos', async (req, res) => {
  const emprestimos = await prisma.emprestimo.findMany({
    include: {
      livro: true,
      cliente: true,
    },
  });
  res.json(emprestimos);
});

router.post('/emprestimos', async (req, res) => {
  const { livroId, clienteId } = req.body;
  const emprestimo = await prisma.emprestimo.create({
    data: {
      livroId,
      clienteId,
    },
    include: {
      livro: true,
      cliente: true,
    },
  });
  res.json(emprestimo);
});

router.put('/emprestimos/:id/devolucao', async (req, res) => {
  const { id } = req.params;
  const { data_devolucao } = req.body;
  const emprestimo = await prisma.emprestimo.update({
    where: { id },
    data: { data_devolucao },
    include: {
      livro: true,
      cliente: true,
    },
  });
  res.json(emprestimo);
});

router.delete('/emprestimos/:id', async (req, res) => {
  const { id } = req.params;
  const emprestimo = await prisma.emprestimo.delete({
    where: { id },
    include: {
      livro: true,
      cliente: true,
    },
  });
  res.json(emprestimo);
});