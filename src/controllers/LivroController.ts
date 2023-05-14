import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LivroController {
  async cadastrarLivro(req: Request, res: Response): Promise<Response> {
    try {
      const livro = await prisma.livro.create({
        data: {
          nome: req.body.nome,
          autor: req.body.autor,
          categoria: req.body.categoria,
          ano: req.body.ano,
          quantidade: req.body.quantidade
        }
      });

      return res
        .status(201)
        .json({ message: "Livro cadastrado!", livro });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar livro" });
    }
  }

  async atualizarLivro(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const livro = await prisma.livro.update({
        where: {
          id: parseInt(id)
        },
        data: {
          nome: req.body.nome,
          autor: req.body.autor,
          categoria: req.body.categoria,
          ano: req.body.ano,
          quantidade: req.body.quantidade
        }
      });

      return res.json({ message: "Livro atualizado!", livro });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar livro" });
    }
  }

  async deletarLivro(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await prisma.livro.delete({
        where: {
          id: parseInt(id)
        }
      });

      return res.json({ message: "Livro deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar livro" });
    }
  }

  async listarLivros(req: Request, res: Response): Promise<Response> {
    try {
      const livros = await prisma.livro.findMany();
      return res.json({ livros });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar livros" });
    }
  }

  async buscarLivro(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const livro = await prisma.livro.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      return res.json({ livro });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar livro" });
    }
  }
}
